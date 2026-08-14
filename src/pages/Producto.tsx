import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/services/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import type { Tables } from "@/types/database.types";
import { formatCurrency } from "@/lib/format";

export function Producto() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Tables<"products"> | null>(null);
  const [plans, setPlans] = useState<Tables<"product_plans">[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("status", "activo")
      .single()
      .then(async ({ data }) => {
        setProduct(data);
        if (data) {
          const { data: planData } = await supabase
            .from("product_plans")
            .select("*")
            .eq("product_id", data.id)
            .eq("active", true)
            .order("sort_order");
          setPlans(planData ?? []);
          if (planData && planData.length > 0) setSelectedPlan(planData[0].id);
        }
        setLoading(false);
      });
  }, [slug]);

  async function handleAddToCart() {
    if (!product) return;
    if (!user) {
      navigate("/login");
      return;
    }
    setAdding(true);
    await addItem(product.id, selectedPlan);
    setAdding(false);
    navigate("/carrito");
  }

  if (loading) {
    return <div className="mx-auto max-w-4xl px-4 py-20 text-center text-slate-400">Cargando...</div>;
  }
  if (!product) {
    return <div className="mx-auto max-w-4xl px-4 py-20 text-center text-slate-400">Producto no encontrado.</div>;
  }

  const activePrice = selectedPlan
    ? plans.find((p) => p.id === selectedPlan)?.price ?? product.price
    : product.price;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-video overflow-hidden rounded-2xl bg-slate-100">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-300">Sin imagen</div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">{product.name}</h1>
          <p className="mt-2 text-slate-500">{product.description}</p>

          {plans.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`rounded-lg border px-3 py-1.5 text-sm ${
                    selectedPlan === plan.id
                      ? "border-brand-500 bg-brand-50 text-brand-700"
                      : "border-slate-200 text-slate-600"
                  }`}
                >
                  {plan.name} — {formatCurrency(plan.price)}
                </button>
              ))}
            </div>
          )}

          <div className="mt-6 text-3xl font-bold text-slate-900">{formatCurrency(activePrice)}</div>

          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="mt-6 w-full rounded-xl bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600 disabled:opacity-50"
          >
            {adding ? "Agregando..." : "Agregar al carrito"}
          </button>

          {Array.isArray(product.features) && product.features.length > 0 && (
            <ul className="mt-6 space-y-1 text-sm text-slate-600">
              {(product.features as string[]).map((f, i) => (
                <li key={i}>✓ {f}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
