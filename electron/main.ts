import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import dotenv from "dotenv";
import oracledb from "oracledb";

dotenv.config();

oracledb.initOracleClient({
  libDir: "/usr/local/lib/oracle",
  configDir: process.env.TNS_ADMIN,
});

const isDev = process.env.NODE_ENV === "development";

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}

ipcMain.handle("oracle:fetch", async (_event, query: string) => {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });
    const result = await connection.execute(query, [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    return { success: true, rows: result.rows };
  } catch (err) {
    return { sucess: false, error: String(err) };
  } finally {
    if (connection) await connection.close();
  }
});

ipcMain.handle("oracle:insert", async (_event, table: string, data: object) => {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
    });
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `:${i + 1}`).join(", ");
    await connection.execute(
      `INSERT INFO ${table} (${keys.join(", ")}) VALUES (${placeholders})`,
      values,
      { autoCommit: true },
    );
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  } finally {
    if (connection) await connection.close();
  }
});

app.whenReady().then(createWindow);
