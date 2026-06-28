import { contextBridge, ipcRenderer } from "electron";
import { isProxy } from "util/types";

contextBridge.exposeInMainWorld("oracle", {
  fetchData: (query: string) => ipcRenderer.invoke("oracle:fetch", query),
  insertData: (table: string, data: object) =>
    ipcRenderer.invoke("oracle:insert", table, data),
});
