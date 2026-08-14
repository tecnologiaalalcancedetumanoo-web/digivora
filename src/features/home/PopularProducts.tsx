import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/services/supabaseClient";
import type { Tables } from "@/types/database.types";
import { ProductCard } from "@/features/products/ProductCard";

export function PopularProducts() {
  const [products, setProducts] = useState<Tables<"products">[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("status", "activo")
      .order("popularity", { ascending: false })
      .limit(10)
      .then(({ data }) => {
        setProducts(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Servicios más populares</h2>
          <p className="text-sm text-slate-500">Lo más comprado por nuestros clientes</p>
        </div>
        <Link
          to="/productos"
          className="hidden items-center gap-1 rounded-full border border-slate-200 px-4 py-1.5 text-sm font-medium text-slate-600 hover:border-brand-300 hover:text-brand-600 sm:flex"
        >
          Ver todos <span aria-hidden>›</span>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-slate-400">Aún no hay productos publicados.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
