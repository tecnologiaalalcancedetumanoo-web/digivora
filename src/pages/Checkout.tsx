import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/services/supabaseClient";
import { formatCurrency } from "@/lib/format";
import type { Tables } from "@/types/database.types";

type PaymentMethod = "wompi" | "manual";

export function Checkout() {
  const { user, profile } = useAuth();
  const { items, subtotal, refresh } = useCart();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<Tables<"coupons"> | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [checkingCoupon, setCheckingCoupon] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("manual");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const discount = coupon
    ? coupon.discount_type === "porcentaje"
      ? Math.round((subtotal * Number(coupon.value)) / 100)
      : Math.min(Number(coupon.value), subtotal)
    : 0;
  const total = Math.max(subtotal - discount, 0);

  async function handleApplyCoupon() {
    if (!couponCode.trim()) return;
    setCheckingCoupon(true);
    setCouponError(null);
    const { data, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", couponCode.trim().toUpperCase())
      .eq("active", true)
      .maybeSingle();
    setCheckingCoupon(false);

    if (error || !data) {
      setCouponError("Cupón no válido.");
      setCoupon(null);
      return;
    }
    const now = new Date();
    if (data.start_date && new Date(data.start_date) > now) {
      setCouponError("Este cupón aún no está activo.");
      setCoupon(null);
      return;
    }
    if (data.end_date && new Date(data.end_date) < now) {
      setCouponError("Este cupón ya venció.");
      setCoupon(null);
      return;
    }
    setCoupon(data);
  }

  async function handlePlaceOrder(e: FormEvent) {
    e.preventDefault();
    if (!user || items.length === 0) return;
    if (!acceptedTerms) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    setPlacing(true);
    setError(null);

    // 1. Crear el pedido
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        subtotal,
        discount,
        total,
        coupon_id: coupon?.id ?? null,
        payment_method: paymentMethod,
        payment_status: "pendiente",
        status: "pendiente_pago",
      })
      .select("*")
      .single();

    if (orderError || !order) {
      setPlacing(false);
      setError("No se pudo crear el pedido. Intenta de nuevo.");
      return;
    }

    // 2. Crear los ítems del pedido
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      plan_id: item.plan_id,
      product_name: item.products?.name ?? "Producto",
      quantity: item.quantity,
      unit_price: item.products?.price ?? 0,
    }));
    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

    if (itemsError) {
      setPlacing(false);
      setError("El pedido se creó pero hubo un problema con los productos. Contáctanos.");
      return;
    }

    // 3. Registrar uso del cupón (si aplica)
    if (coupon) {
      await supabase.from("coupon_usages").insert({
        coupon_id: coupon.id,
        user_id: user.id,
        order_id: order.id,
      });
    }

    // 4. Vaciar el carrito
    await supabase.from("cart_items").delete().in(
      "id",
      items.map((i) => i.id)
    );
    await refresh();

    setPlacing(false);
    navigate(`/pedido/${order.order_number}`);
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-slate-500">Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Columna izquierda: datos + pago */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900">Datos del cliente</h2>
            <p className="mt-2 text-sm text-slate-500">{profile?.nombre || "—"} {profile?.apellido || ""}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
            {profile?.telefono && <p className="text-sm text-slate-500">{profile.telefono}</p>}
          </div>

          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="font-semibold text-slate-900">Método de pago</h2>
            <div className="mt-3 space-y-2">
              <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "manual"}
                  onChange={() => setPaymentMethod("manual")}
                />
                Pago manual (transferencia, Nequi, Bancolombia)
              </label>
              <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 text-sm text-slate-400">
                <input
                  type="radio"
                  name="payment"
                  disabled
                  checked={paymentMethod === "wompi"}
                  onChange={() => setPaymentMethod("wompi")}
                />
                Pago automático con Wompi (próximamente)
              </label>
            </div>
          </div>

          <label className="flex items-start gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-1"
            />
            Acepto los términos y condiciones de la compra.
          </label>
        </div>

        {/* Columna derecha: resumen */}
        <div className="rounded-xl border border-slate-200 p-5">
          <h2 className="font-semibold text-slate-900">Resumen del pedido</h2>

          <div className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-slate-600">
                <span className="truncate pr-2">
                  {item.products?.name} × {item.quantity}
                </span>
                <span>{formatCurrency((item.products?.price ?? 0) * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Código de cupón"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              disabled={checkingCoupon}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Aplicar
            </button>
          </div>
          {couponError && <p className="mt-1 text-xs text-red-500">{couponError}</p>}
          {coupon && <p className="mt-1 text-xs text-green-600">Cupón "{coupon.code}" aplicado.</p>}

          <div className="mt-4 space-y-1 border-t border-slate-200 pt-4 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Descuento</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-slate-900">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={placing}
            className="mt-5 w-full rounded-xl bg-digivora-gradient px-6 py-3 font-medium text-white btn-glow disabled:opacity-50"
          >
            {placing ? "Creando pedido..." : "Confirmar pedido"}
          </button>
        </div>
      </form>
    </div>
  );
}
