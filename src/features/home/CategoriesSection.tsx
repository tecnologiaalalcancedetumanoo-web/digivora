import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/services/supabaseClient";
import type { Tables } from "@/types/database.types";

// Ícono visual por slug de categoría. Si aparece una categoría nueva sin
// ícono mapeado, usa el ícono genérico — no bloquea el listado real de Supabase.
const CATEGORY_ICONS: Record<string, string> = {
  streaming: "🎬",
  musica: "🎵",
  ia: "🤖",
  "inteligencia-artificial": "🤖",
  productividad: "💼",
  educacion: "🎓",
  gaming: "🎮",
  software: "🧩",
  seguridad: "🛡️",
  otros: "▦",
};

export function CategoriesSection() {
  const [categories, setCategories] = useState<Tables<"categories">[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .eq("active", true)
      .order("sort_order")
      .then(({ data }) => setCategories(data ?? []));
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex gap-3 overflow-x-auto no-scrollbar lg:grid lg:grid-cols-9 lg:gap-3 lg:overflow-visible">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/productos?categoria=${cat.id}`)}
            className="group flex min-w-[130px] flex-shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg lg:min-w-0"
          >
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-digivora-gradient text-lg text-white transition group-hover:scale-110">
              {CATEGORY_ICONS[cat.slug] ?? "✨"}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-slate-900">{cat.name}</span>
              {cat.description && (
                <span className="block truncate text-xs text-slate-400">{cat.description}</span>
              )}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
