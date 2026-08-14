import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const NAV_LINKS = [
  { label: "Inicio", to: "/" },
  { label: "Productos", to: "/productos" },
  { label: "Categorías", to: "/productos" },
  { label: "Promociones", to: "/promociones" },
  { label: "Ayuda", to: "/ayuda" },
];

export function Header() {
  const { user, profile, signOut, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [search, setSearch] = useState("");

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    navigate(search.trim() ? `/productos?buscar=${encodeURIComponent(search.trim())}` : "/productos");
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 digivora-dark-surface border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex flex-shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-digivora-gradient bg-200% animate-gradient-x text-sm font-extrabold text-white">
            DV
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-lg font-extrabold text-white">
              Digi<span className="text-gradient-brand">Vora</span>
            </span>
            <span className="text-[10px] text-slate-400">Servicios digitales en un solo lugar</span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 rounded-full bg-white/5 p-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Buscador desktop */}
        <form onSubmit={handleSearch} className="hidden flex-1 max-w-xs lg:block">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="text-slate-400">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar servicios..."
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
          </div>
        </form>

        {/* Zona derecha */}
        <div className="flex items-center gap-3">
          <Link
            to="/carrito"
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white transition hover:bg-white/10"
          >
            🛒
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-digivora-gradient text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full bg-white/5 px-2 py-1.5 text-sm font-medium text-white hover:bg-white/10"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-digivora-gradient text-[11px] font-bold">
                  {(profile?.nombre || user.email || "U")[0].toUpperCase()}
                </span>
                <span className="max-w-[100px] truncate">{profile?.nombre || "Mi cuenta"}</span>
                <span className="text-xs text-slate-400">▾</span>
              </button>
              {accountOpen && (
                <div
                  onMouseLeave={() => setAccountOpen(false)}
                  className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-navy-900 py-1 shadow-xl"
                >
                  <Link
                    to="/mi-cuenta"
                    onClick={() => setAccountOpen(false)}
                    className="block px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                  >
                    Mi cuenta
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                    >
                      Panel admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setAccountOpen(false);
                      signOut();
                    }}
                    className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/10"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-full bg-digivora-gradient px-4 py-2 text-sm font-semibold text-white btn-glow sm:block"
            >
              Mi cuenta
            </Link>
          )}

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white lg:hidden"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-navy-900 px-4 py-4 lg:hidden">
          <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
            <span className="text-slate-400">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar servicios..."
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
          </form>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/mi-cuenta" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10">
                  Mi cuenta
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/10">
                    Panel admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    signOut();
                  }}
                  className="rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-white/10"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-full bg-digivora-gradient px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Ingresar
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
