const FAQS = [
  {
    q: "¿Cómo recibo mi servicio después de comprar?",
    a: "Depende del tipo de entrega del producto (código, licencia, instrucciones o activación automática). Verás el detalle en 'Mi cuenta → Servicios' una vez el pago sea confirmado.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Pago automático con pasarela y pago manual (transferencia, Nequi, Bancolombia u otros métodos que verás en el checkout).",
  },
  {
    q: "¿Cuánto tarda en aprobarse un pago manual?",
    a: "Nuestro equipo revisa el comprobante y aprueba o rechaza el pedido; recibirás una notificación con el resultado.",
  },
  {
    q: "¿Qué pasa si mi servicio está por vencer?",
    a: "Te notificamos antes del vencimiento para que puedas renovarlo sin perder el acceso.",
  },
];

export function Ayuda() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Ayuda</h1>
      <p className="mt-1 text-slate-500">Resolvemos tus dudas más frecuentes.</p>

      <div className="mt-8 space-y-4">
        {FAQS.map((item) => (
          <details key={item.q} className="group rounded-xl border border-slate-200 p-4 open:border-brand-200">
            <summary className="cursor-pointer list-none font-medium text-slate-900 marker:hidden">
              {item.q}
            </summary>
            <p className="mt-2 text-sm text-slate-500">{item.a}</p>
          </details>
        ))}
      </div>

      <p className="mt-8 text-sm text-slate-500">
        ¿No encontraste lo que buscabas? Escríbenos desde{" "}
        <a href="mailto:soporte@digivora.com" className="text-brand-600 hover:underline">
          soporte@digivora.com
        </a>
      </p>
    </div>
  );
}
