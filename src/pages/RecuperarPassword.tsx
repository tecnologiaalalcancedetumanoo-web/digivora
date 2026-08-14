import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function RecuperarPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-sm px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-slate-900">Revisa tu correo</h1>
        <p className="mt-2 text-slate-500">
          Si el correo <strong>{email}</strong> tiene una cuenta, te enviamos un enlace para restablecer tu
          contraseña.
        </p>
        <Link to="/login" className="mt-4 inline-block text-brand-600 hover:underline">
          Volver a ingresar
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="text-2xl font-bold text-slate-900">Recuperar contraseña</h1>
      <p className="mt-1 text-sm text-slate-500">
        Te enviaremos un enlace a tu correo para crear una nueva contraseña.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="email"
          required
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-digivora-gradient px-6 py-3 font-medium text-white btn-glow disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar enlace"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        <Link to="/login" className="text-brand-600 hover:underline">
          Volver a ingresar
        </Link>
      </p>
    </div>
  );
}
