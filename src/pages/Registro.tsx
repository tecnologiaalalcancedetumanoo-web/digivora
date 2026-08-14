import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function Registro() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signUp(email, password, nombre);
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-sm px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-slate-900">Revisa tu correo</h1>
        <p className="mt-2 text-slate-500">
          Te enviamos un enlace de confirmación. Una vez confirmado, podrás iniciar sesión.
        </p>
        <button onClick={() => navigate("/login")} className="mt-4 text-brand-600 hover:underline">
          Ir a login
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="text-2xl font-bold text-slate-900">Crear cuenta</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          required
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          type="email"
          required
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600 disabled:opacity-50"
        >
          {loading ? "Creando..." : "Crear cuenta"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-slate-500">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-brand-600 hover:underline">
          Ingresa
        </Link>
      </p>
    </div>
  );
}
