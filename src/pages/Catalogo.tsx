import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/services/supabaseClient";
import type { Tables } from "@/types/database.types";
import { ProductCard } from "@/features/products/ProductCard";

export function Catalogo() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Tables<"products">[]>([]);
  const [categories, setCategories] = useState<Tables<"categories">[]>([]);
  const [categoryId, setCategoryId] = useState<string | "all">(searchParams.get("categoria") ?? "all");
  const [search, setSearch] = useState(searchParams.get("buscar") ?? "");
  const [sort, setSort] = useState<"novedades" | "precio_asc" | "precio_desc" | "popularidad">("novedades");
  const [loading, setLoading] = useState(true);

  // Si el usuario navega desde el Hero/Categorías (nuevos query params), sincroniza los filtros.
  useEffect(() => {
    const cat = searchParams.get("categoria");
    const q = searchParams.get("buscar");
    if (cat) setCategoryId(cat);
    if (q) setSearch(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    supabase.from("categories").select("*").eq("active", true).order("sort_order").then(({ data }) => {
      setCategories(data ?? []);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    let query = supabase.from("products").select("*").eq("status", "activo");

    if (categoryId !== "all") query = query.eq("category_id", categoryId);
    if (search.trim()) query = query.ilike("name", `%${search.trim()}%`);

    if (sort === "precio_asc") query = query.order("price", { ascending: true });
    else if (sort === "precio_desc") query = query.order("price", { ascending: false });
    else if (sort === "popularidad") query = query.order("popularity", { ascending: false });
    else query = query.order("created_at", { ascending: false });

    query.then(({ data }) => {
      setProducts(data ?? []);
      setLoading(false);
    });
  }, [categoryId, search, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">
        Catálogo{" "}
        {categoryId !== "all" && categories.find((c) => c.id === categoryId) && (
          <span className="text-gradient-brand">· {categories.find((c) => c.id === categoryId)?.name}</span>
        )}
      </h1>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="all">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="novedades">Novedades</option>
          <option value="precio_asc">Precio: menor a mayor</option>
          <option value="precio_desc">Precio: mayor a menor</option>
          <option value="popularidad">Popularidad</option>
        </select>
      </div>

      {loading ? (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="mt-10 text-center text-slate-400">No se encontraron productos.</p>
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
