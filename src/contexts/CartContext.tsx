import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/services/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import type { Tables } from "@/types/database.types";

type CartItem = Tables<"cart_items"> & {
  products: Tables<"products">;
};

interface CartContextValue {
  items: CartItem[];
  loading: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (productId: string, planId: string | null, quantity?: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState<string | null>(null);

  async function ensureCart(): Promise<string | null> {
    if (!user) return null;
    const { data: existing } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (existing) return existing.id;

    const { data: created, error } = await supabase
      .from("carts")
      .insert({ user_id: user.id })
      .select("id")
      .single();
    if (error) return null;
    return created.id;
  }

  async function refresh() {
    if (!user) {
      setItems([]);
      return;
    }
    setLoading(true);
    const id = await ensureCart();
    setCartId(id);
    if (id) {
      const { data } = await supabase
        .from("cart_items")
        .select("*, products(*)")
        .eq("cart_id", id);
      setItems((data as CartItem[]) ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  async function addItem(productId: string, planId: string | null, quantity = 1) {
    const id = cartId ?? (await ensureCart());
    if (!id) return;
    await supabase.from("cart_items").insert({
      cart_id: id,
      product_id: productId,
      plan_id: planId,
      quantity,
    });
    await refresh();
  }

  async function removeItem(itemId: string) {
    await supabase.from("cart_items").delete().eq("id", itemId);
    await refresh();
  }

  async function updateQuantity(itemId: string, quantity: number) {
    if (quantity < 1) return removeItem(itemId);
    await supabase.from("cart_items").update({ quantity }).eq("id", itemId);
    await refresh();
  }

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.quantity * (i.products?.price ?? 0), 0);

  return (
    <CartContext.Provider
      value={{ items, loading, itemCount, subtotal, addItem, removeItem, updateQuantity, refresh }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
