import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { Route, Routes } from "react-router";
import HomePage from "./pages/home";
import InvoiceManager from "./pages/invoiceManager";

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen bg-background">
        <header className="flex items-center h-15 px-2">
          <SidebarTrigger className="h-10 w-10 [&>svg]:size-8" />
          <p className="font-sans">Lepus</p>
        </header>
        <main className="flex min-h-0 flex-1 flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/invoiceManager" element={<InvoiceManager />} />
          </Routes>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
