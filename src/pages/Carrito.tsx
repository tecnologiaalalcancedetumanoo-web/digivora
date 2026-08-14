import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/format";

export function Carrito() {
  const { items, subtotal, updateQuantity, removeItem, loading } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return <div className="mx-auto max-w-3xl px-4 py-20 text-center text-slate-400">Cargando...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-slate-500">Tu carrito está vacío.</p>
        <Link to="/productos" className="mt-4 inline-block text-brand-600 hover:underline">
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Carrito</h1>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
              {item.products?.image_url && (
                <img src={item.products.image_url} alt="" className="h-full w-full object-cover" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-900">{item.products?.name}</p>
              <p className="text-sm text-slate-500">{formatCurrency(item.products?.price ?? 0)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="h-7 w-7 rounded-full border border-slate-300 text-slate-500"
              >
                −
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="h-7 w-7 rounded-full border border-slate-300 text-slate-500"
              >
                +
              </button>
            </div>
            <button onClick={() => removeItem(item.id)} className="text-sm text-red-500 hover:underline">
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
        <span className="text-lg font-semibold text-slate-900">Subtotal</span>
        <span className="text-lg font-bold text-slate-900">{formatCurrency(subtotal)}</span>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-6 w-full rounded-xl bg-brand-500 px-6 py-3 font-medium text-white hover:bg-brand-600"
      >
        Ir al checkout
      </button>
    </div>
  );
}
