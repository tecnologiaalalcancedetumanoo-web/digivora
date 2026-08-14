import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function ProtectedRoute({ adminOnly = false }: { adminOnly?: boolean }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="flex h-64 items-center justify-center text-slate-400">Cargando...</div>;
  }
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}
