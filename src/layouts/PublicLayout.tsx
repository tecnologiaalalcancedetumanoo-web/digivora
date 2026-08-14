import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} DigiVora. Todos los derechos reservados.
      </footer>
    </div>
  );
}
