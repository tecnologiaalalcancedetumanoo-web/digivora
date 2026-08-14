import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import type { Tables } from "@/types/database.types";
import { ProductCard } from "@/features/products/ProductCard";

export function Promociones() {
  const [products, setProducts] = useState<Tables<"products">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("status", "activo")
      .not("old_price", "is", null)
      .then(({ data }) => {
        setProducts(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Promociones</h1>
      <p className="mt-1 text-slate-500">Servicios con precio especial en este momento.</p>

      {loading ? (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="mt-10 text-center text-slate-400">No hay promociones activas por ahora.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
