import { Link } from "react-router-dom";
import type { Tables } from "@/types/database.types";
import { formatCurrency } from "@/lib/format";

// Badge derivado de datos reales del producto — nunca texto inventado.
function getBadge(product: Tables<"products">): { label: string; className: string } | null {
  if (product.old_price && product.old_price > product.price) {
    return { label: "Oferta", className: "bg-magenta-500" };
  }
  const daysSinceCreated = (Date.now() - new Date(product.created_at).getTime()) / 86_400_000;
  if (daysSinceCreated <= 14) {
    return { label: "Nuevo", className: "bg-cyan-500" };
  }
  if (product.popularity >= 50) {
    return { label: "Más vendido", className: "bg-accent-500" };
  }
  return null;
}

export function ProductCard({ product }: { product: Tables<"products"> }) {
  const badge = getBadge(product);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-2xl">
      {badge && (
        <span
          className={`absolute left-3 top-3 z-10 rounded-full ${badge.className} px-2.5 py-1 text-[11px] font-semibold text-white shadow`}
        >
          {badge.label}
        </span>
      )}

      <Link to={`/producto/${product.slug}`} className="relative aspect-video w-full overflow-hidden bg-slate-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-digivora-radial text-2xl">✨</div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/producto/${product.slug}`} className="font-semibold text-slate-900 transition group-hover:text-brand-600">
          {product.name}
        </Link>
        {product.duration_unit !== "sin_vencimiento" && product.duration_value && (
          <span className="mt-0.5 text-xs text-slate-400">
            {product.duration_value} {product.duration_unit}
          </span>
        )}
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-slate-500">{product.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <div>
            {product.old_price && product.old_price > product.price && (
              <span className="mr-2 text-xs text-slate-400 line-through">
                {formatCurrency(product.old_price)}
              </span>
            )}
            <span className="font-bold text-slate-900">{formatCurrency(product.price)}</span>
          </div>
          <Link
            to={`/producto/${product.slug}`}
            className="rounded-lg bg-digivora-gradient px-3 py-1.5 text-sm font-medium text-white btn-glow"
          >
            Comprar
          </Link>
        </div>
      </div>
    </div>
  );
}
