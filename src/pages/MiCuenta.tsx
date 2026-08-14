import { useState, type FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/services/supabaseClient";

export function MiCuenta() {
  const { user, profile, refreshProfile, updatePassword } = useAuth();

  const [nombre, setNombre] = useState(profile?.nombre ?? "");
  const [apellido, setApellido] = useState(profile?.apellido ?? "");
  const [telefono, setTelefono] = useState(profile?.telefono ?? "");
  const [documento, setDocumento] = useState(profile?.documento ?? "");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);

  async function handleProfileSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSavingProfile(true);
    setProfileMsg(null);
    const { error } = await supabase
      .from("profiles")
      .update({ nombre, apellido, telefono, documento })
      .eq("id", user.id);
    setSavingProfile(false);
    if (error) {
      setProfileMsg("No se pudo guardar. Intenta de nuevo.");
      return;
    }
    await refreshProfile();
    setProfileMsg("Perfil actualizado.");
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    if (newPassword.length < 6) {
      setPasswordMsg("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setSavingPassword(true);
    setPasswordMsg(null);
    const { error } = await updatePassword(newPassword);
    setSavingPassword(false);
    if (error) {
      setPasswordMsg(error);
      return;
    }
    setNewPassword("");
    setPasswordMsg("Contraseña actualizada.");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Mi cuenta</h1>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <form onSubmit={handleProfileSubmit} className="rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900">Datos personales</h2>
          <p className="mt-1 text-xs text-slate-400">{user?.email}</p>

          <div className="mt-4 space-y-3">
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Apellido"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Teléfono"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              placeholder="Documento"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          {profileMsg && <p className="mt-3 text-sm text-slate-500">{profileMsg}</p>}

          <button
            type="submit"
            disabled={savingProfile}
            className="mt-4 rounded-xl bg-digivora-gradient px-5 py-2 text-sm font-semibold text-white btn-glow disabled:opacity-50"
          >
            {savingProfile ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>

        <form onSubmit={handlePasswordSubmit} className="rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900">Cambiar contraseña</h2>
          <div className="mt-4">
            <input
              type="password"
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nueva contraseña"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          {passwordMsg && <p className="mt-3 text-sm text-slate-500">{passwordMsg}</p>}
          <button
            type="submit"
            disabled={savingPassword}
            className="mt-4 rounded-xl border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {savingPassword ? "Guardando..." : "Actualizar contraseña"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-sm text-slate-400">
        Pedidos, servicios activos y comprobantes se habilitan en las próximas fases.
      </p>
    </div>
  );
}
