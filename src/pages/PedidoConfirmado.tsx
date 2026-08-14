import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/services/supabaseClient";
import type { Tables } from "@/types/database.types";
import { formatCurrency, formatDate } from "@/lib/format";

type OrderItem = Tables<"order_items">;

export function PedidoConfirmado() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState<Tables<"orders"> | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderNumber) return;
    supabase
      .from("orders")
      .select("*")
      .eq("order_number", orderNumber)
      .single()
      .then(async ({ data }) => {
        setOrder(data);
        if (data) {
          const { data: itemsData } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", data.id);
          setItems(itemsData ?? []);
        }
        setLoading(false);
      });
  }, [orderNumber]);

  if (loading) {
    return <div className="mx-auto max-w-2xl px-4 py-20 text-center text-slate-400">Cargando...</div>;
  }
  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center text-slate-400">
        No encontramos ese pedido.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-digivora-gradient text-2xl text-white">
        ✓
      </div>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">¡Pedido creado!</h1>
      <p className="mt-1 text-slate-500">
        Número de pedido <span className="font-semibold text-slate-900">{order.order_number}</span>
      </p>

      <div className="mt-8 rounded-xl border border-slate-200 p-6 text-left">
        <div className="space-y-2 text-sm">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-slate-600">
              <span>{item.product_name} × {item.quantity}</span>
              <span>{formatCurrency(item.unit_price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 font-bold text-slate-900">
          <span>Total</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
        <p className="mt-4 text-xs text-slate-400">Creado el {formatDate(order.created_at)}</p>
      </div>

      {order.payment_method === "manual" ? (
        <p className="mt-6 text-sm text-slate-500">
          Tu pedido quedó <strong>pendiente de pago</strong>. Muy pronto vas a poder subir tu comprobante
          directamente desde aquí — mientras tanto, contáctanos con tu número de pedido para coordinar el pago.
        </p>
      ) : (
        <p className="mt-6 text-sm text-slate-500">
          El pago automático con pasarela estará disponible próximamente.
        </p>
      )}

      <Link
        to="/mi-cuenta"
        className="mt-8 inline-block rounded-xl bg-digivora-gradient px-6 py-3 text-sm font-semibold text-white btn-glow"
      >
        Ir a mi cuenta
      </Link>
    </div>
  );
}
