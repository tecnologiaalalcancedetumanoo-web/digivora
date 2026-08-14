import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// Íconos representados con emoji/formas propias (no logos de terceros) para
// evitar reproducir marcas con derechos de autor. Si más adelante tienes una
// ilustración propia (ej. la mascota DigiVora), reemplaza este bloque por:
// <img src={heroImageUrl} className="..." />
const FLOATING_CHIPS = [
  { icon: "🎬", label: "Streaming", pos: "left-2 top-6", delay: "0s" },
  { icon: "🎵", label: "Música", pos: "right-4 top-2", delay: "0.4s" },
  { icon: "🤖", label: "IA", pos: "left-6 bottom-16", delay: "0.8s" },
  { icon: "💼", label: "Productividad", pos: "right-2 bottom-24", delay: "1.2s" },
  { icon: "🎮", label: "Gaming", pos: "left-1/2 bottom-4", delay: "1.6s" },
];

export function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    navigate(query.trim() ? `/productos?buscar=${encodeURIComponent(query.trim())}` : "/productos");
  }

  return (
    <section className="relative overflow-hidden digivora-dark-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        {/* Columna izquierda */}
        <div className="relative z-10 animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-200">
            🚀 Tu mundo digital, más cerca
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Servicios digitales
            <br />
            <span className="text-gradient-brand bg-200% animate-gradient-x">en un solo lugar</span>
          </h1>

          <p className="mt-5 max-w-lg text-slate-300">
            Accede a las mejores plataformas de entretenimiento, productividad, IA, software y más.
            Compra, activa y disfruta al instante.
          </p>

          <form onSubmit={handleSearch} className="mt-8 flex max-w-md overflow-hidden rounded-full border border-white/10 bg-white/5 pr-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué servicio estás buscando?"
              className="w-full bg-transparent px-5 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-digivora-gradient px-5 py-2 text-sm font-semibold text-white btn-glow"
            >
              Buscar
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/productos"
              onClick={(e) => {
                e.preventDefault();
                navigate("/productos");
              }}
              className="flex items-center gap-2 rounded-xl bg-digivora-gradient px-6 py-3 text-sm font-semibold text-white btn-glow"
            >
              🛒 Ver productos <span aria-hidden>→</span>
            </a>
            <a
              href="#como-funciona"
              className="flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              ▶ Cómo funciona
            </a>
          </div>
        </div>

        {/* Columna derecha: universo visual DigiVora */}
        <div className="relative mx-auto h-80 w-full max-w-md lg:h-[420px]">
          <div className="absolute inset-0 rounded-full bg-digivora-gradient opacity-20 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur animate-float-slow">
            <span className="bg-digivora-gradient bg-clip-text text-4xl font-extrabold text-transparent">DV</span>
          </div>

          {FLOATING_CHIPS.map((chip) => (
            <div
              key={chip.label}
              style={{ animationDelay: chip.delay }}
              className={`absolute ${chip.pos} flex animate-float items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-medium text-white shadow-lg backdrop-blur`}
            >
              <span className="text-lg">{chip.icon}</span>
              {chip.label}
            </div>
          ))}

          <div className="absolute -bottom-2 left-1/2 h-6 w-40 -translate-x-1/2 rounded-full bg-brand-500/40 blur-xl animate-glow" />
        </div>
      </div>
    </section>
  );
}
