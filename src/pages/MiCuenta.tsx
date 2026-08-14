import { useAuth } from "@/contexts/AuthContext";

export function MiCuenta() {
  const { user, profile } = useAuth();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Mi cuenta</h1>
      <div className="mt-6 rounded-xl border border-slate-200 p-6">
        <p className="text-sm text-slate-500">Correo</p>
        <p className="font-medium text-slate-900">{user?.email}</p>
        <p className="mt-4 text-sm text-slate-500">Nombre</p>
        <p className="font-medium text-slate-900">{profile?.nombre || "—"}</p>
      </div>
      <p className="mt-6 text-sm text-slate-400">
        Pedidos, servicios activos y comprobantes se habilitan en las próximas fases.
      </p>
    </div>
  );
}
