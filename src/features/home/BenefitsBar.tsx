const BENEFITS = [
  { icon: "⚡", title: "Activación rápida", subtitle: "En minutos" },
  { icon: "🛡️", title: "Pagos seguros", subtitle: "Pasarelas confiables" },
  { icon: "🏆", title: "Precios bajos", subtitle: "Las mejores ofertas" },
  { icon: "🎧", title: "Soporte 24/7", subtitle: "Siempre disponible" },
  { icon: "🌐", title: "100% digital", subtitle: "Sin salir de casa" },
];

export function BenefitsBar() {
  return (
    <section className="digivora-dark-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-3 lg:grid-cols-5">
        {BENEFITS.map((b) => (
          <div key={b.title} className="flex items-center gap-3">
            <span className="text-2xl">{b.icon}</span>
            <div>
              <p className="text-sm font-semibold text-white">{b.title}</p>
              <p className="text-xs text-slate-400">{b.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
