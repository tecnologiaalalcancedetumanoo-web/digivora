export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: { action: string; actor_id: string | null; created_at: string; details: Json | null; entity_id: string | null; entity_type: string; id: string }
        Insert: { action: string; actor_id?: string | null; created_at?: string; details?: Json | null; entity_id?: string | null; entity_type: string; id?: string }
        Update: { action?: string; actor_id?: string | null; created_at?: string; details?: Json | null; entity_id?: string | null; entity_type?: string; id?: string }
        Relationships: []
      }
      cart_items: {
        Row: { cart_id: string; created_at: string; id: string; plan_id: string | null; product_id: string; quantity: number }
        Insert: { cart_id: string; created_at?: string; id?: string; plan_id?: string | null; product_id: string; quantity?: number }
        Update: { cart_id?: string; created_at?: string; id?: string; plan_id?: string | null; product_id?: string; quantity?: number }
        Relationships: [
          { foreignKeyName: "cart_items_cart_id_fkey"; columns: ["cart_id"]; isOneToOne: false; referencedRelation: "carts"; referencedColumns: ["id"] },
          { foreignKeyName: "cart_items_plan_id_fkey"; columns: ["plan_id"]; isOneToOne: false; referencedRelation: "product_plans"; referencedColumns: ["id"] },
          { foreignKeyName: "cart_items_product_id_fkey"; columns: ["product_id"]; isOneToOne: false; referencedRelation: "products"; referencedColumns: ["id"] },
        ]
      }
      carts: {
        Row: { created_at: string; id: string; updated_at: string; user_id: string }
        Insert: { created_at?: string; id?: string; updated_at?: string; user_id: string }
        Update: { created_at?: string; id?: string; updated_at?: string; user_id?: string }
        Relationships: []
      }
      categories: {
        Row: { active: boolean; created_at: string; description: string | null; id: string; name: string; slug: string; sort_order: number; updated_at: string }
        Insert: { active?: boolean; created_at?: string; description?: string | null; id?: string; name: string; slug: string; sort_order?: number; updated_at?: string }
        Update: { active?: boolean; created_at?: string; description?: string | null; id?: string; name?: string; slug?: string; sort_order?: number; updated_at?: string }
        Relationships: []
      }
      coupon_usages: {
        Row: { coupon_id: string; id: string; order_id: string; used_at: string; user_id: string }
        Insert: { coupon_id: string; id?: string; order_id: string; used_at?: string; user_id: string }
        Update: { coupon_id?: string; id?: string; order_id?: string; used_at?: string; user_id?: string }
        Relationships: [
          { foreignKeyName: "coupon_usages_coupon_id_fkey"; columns: ["coupon_id"]; isOneToOne: false; referencedRelation: "coupons"; referencedColumns: ["id"] },
          { foreignKeyName: "coupon_usages_order_id_fkey"; columns: ["order_id"]; isOneToOne: false; referencedRelation: "orders"; referencedColumns: ["id"] },
        ]
      }
      coupons: {
        Row: { active: boolean; applicable_category_ids: string[] | null; applicable_product_ids: string[] | null; code: string; created_at: string; discount_type: Database["public"]["Enums"]["discount_type"]; end_date: string | null; id: string; max_uses: number | null; max_uses_per_customer: number | null; start_date: string | null; value: number }
        Insert: { active?: boolean; applicable_category_ids?: string[] | null; applicable_product_ids?: string[] | null; code: string; created_at?: string; discount_type: Database["public"]["Enums"]["discount_type"]; end_date?: string | null; id?: string; max_uses?: number | null; max_uses_per_customer?: number | null; start_date?: string | null; value: number }
        Update: { active?: boolean; applicable_category_ids?: string[] | null; applicable_product_ids?: string[] | null; code?: string; created_at?: string; discount_type?: Database["public"]["Enums"]["discount_type"]; end_date?: string | null; id?: string; max_uses?: number | null; max_uses_per_customer?: number | null; start_date?: string | null; value?: number }
        Relationships: []
      }
      customer_services: {
        Row: { created_at: string; end_date: string | null; id: string; order_id: string; plan_id: string | null; product_id: string; purchase_date: string; start_date: string | null; status: Database["public"]["Enums"]["service_status"]; updated_at: string; user_id: string }
        Insert: { created_at?: string; end_date?: string | null; id?: string; order_id: string; plan_id?: string | null; product_id: string; purchase_date?: string; start_date?: string | null; status?: Database["public"]["Enums"]["service_status"]; updated_at?: string; user_id: string }
        Update: { created_at?: string; end_date?: string | null; id?: string; order_id?: string; plan_id?: string | null; product_id?: string; purchase_date?: string; start_date?: string | null; status?: Database["public"]["Enums"]["service_status"]; updated_at?: string; user_id?: string }
        Relationships: [
          { foreignKeyName: "customer_services_order_id_fkey"; columns: ["order_id"]; isOneToOne: false; referencedRelation: "orders"; referencedColumns: ["id"] },
          { foreignKeyName: "customer_services_plan_id_fkey"; columns: ["plan_id"]; isOneToOne: false; referencedRelation: "product_plans"; referencedColumns: ["id"] },
          { foreignKeyName: "customer_services_product_id_fkey"; columns: ["product_id"]; isOneToOne: false; referencedRelation: "products"; referencedColumns: ["id"] },
        ]
      }
      notifications: {
        Row: { created_at: string; id: string; message: string | null; metadata: Json | null; read: boolean; title: string; type: string; user_id: string | null }
        Insert: { created_at?: string; id?: string; message?: string | null; metadata?: Json | null; read?: boolean; title: string; type: string; user_id?: string | null }
        Update: { created_at?: string; id?: string; message?: string | null; metadata?: Json | null; read?: boolean; title?: string; type?: string; user_id?: string | null }
        Relationships: []
      }
      order_items: {
        Row: { created_at: string; id: string; order_id: string; plan_id: string | null; product_id: string; product_name: string; quantity: number; unit_price: number }
        Insert: { created_at?: string; id?: string; order_id: string; plan_id?: string | null; product_id: string; product_name: string; quantity: number; unit_price: number }
        Update: { created_at?: string; id?: string; order_id?: string; plan_id?: string | null; product_id?: string; product_name?: string; quantity?: number; unit_price?: number }
        Relationships: [
          { foreignKeyName: "order_items_order_id_fkey"; columns: ["order_id"]; isOneToOne: false; referencedRelation: "orders"; referencedColumns: ["id"] },
          { foreignKeyName: "order_items_plan_id_fkey"; columns: ["plan_id"]; isOneToOne: false; referencedRelation: "product_plans"; referencedColumns: ["id"] },
          { foreignKeyName: "order_items_product_id_fkey"; columns: ["product_id"]; isOneToOne: false; referencedRelation: "products"; referencedColumns: ["id"] },
        ]
      }
      orders: {
        Row: { coupon_id: string | null; created_at: string; customer_notes: string | null; discount: number; id: string; order_number: string; payment_method: string | null; payment_status: Database["public"]["Enums"]["payment_status"]; status: Database["public"]["Enums"]["order_status"]; subtotal: number; total: number; updated_at: string; user_id: string }
        Insert: { coupon_id?: string | null; created_at?: string; customer_notes?: string | null; discount?: number; id?: string; order_number?: string; payment_method?: string | null; payment_status?: Database["public"]["Enums"]["payment_status"]; status?: Database["public"]["Enums"]["order_status"]; subtotal?: number; total?: number; updated_at?: string; user_id: string }
        Update: { coupon_id?: string | null; created_at?: string; customer_notes?: string | null; discount?: number; id?: string; order_number?: string; payment_method?: string | null; payment_status?: Database["public"]["Enums"]["payment_status"]; status?: Database["public"]["Enums"]["order_status"]; subtotal?: number; total?: number; updated_at?: string; user_id?: string }
        Relationships: [
          { foreignKeyName: "orders_coupon_fk"; columns: ["coupon_id"]; isOneToOne: false; referencedRelation: "coupons"; referencedColumns: ["id"] },
        ]
      }
      payment_proofs: {
        Row: { created_at: string; id: string; method: string; order_id: string; reason: string | null; reference: string | null; reviewed_at: string | null; reviewed_by: string | null; status: Database["public"]["Enums"]["proof_status"]; storage_path: string; user_id: string }
        Insert: { created_at?: string; id?: string; method: string; order_id: string; reason?: string | null; reference?: string | null; reviewed_at?: string | null; reviewed_by?: string | null; status?: Database["public"]["Enums"]["proof_status"]; storage_path: string; user_id: string }
        Update: { created_at?: string; id?: string; method?: string; order_id?: string; reason?: string | null; reference?: string | null; reviewed_at?: string | null; reviewed_by?: string | null; status?: Database["public"]["Enums"]["proof_status"]; storage_path?: string; user_id?: string }
        Relationships: [
          { foreignKeyName: "payment_proofs_order_id_fkey"; columns: ["order_id"]; isOneToOne: false; referencedRelation: "orders"; referencedColumns: ["id"] },
        ]
      }
      payments: {
        Row: { amount: number; created_at: string; currency: string; id: string; order_id: string; provider: string; raw_response: Json | null; reference: string | null; status: Database["public"]["Enums"]["payment_status"]; transaction_id: string | null; updated_at: string }
        Insert: { amount: number; created_at?: string; currency?: string; id?: string; order_id: string; provider: string; raw_response?: Json | null; reference?: string | null; status?: Database["public"]["Enums"]["payment_status"]; transaction_id?: string | null; updated_at?: string }
        Update: { amount?: number; created_at?: string; currency?: string; id?: string; order_id?: string; provider?: string; raw_response?: Json | null; reference?: string | null; status?: Database["public"]["Enums"]["payment_status"]; transaction_id?: string | null; updated_at?: string }
        Relationships: [
          { foreignKeyName: "payments_order_id_fkey"; columns: ["order_id"]; isOneToOne: false; referencedRelation: "orders"; referencedColumns: ["id"] },
        ]
      }
      product_plans: {
        Row: { active: boolean; duration_unit: Database["public"]["Enums"]["duration_unit"]; duration_value: number | null; id: string; name: string; price: number; product_id: string; sort_order: number }
        Insert: { active?: boolean; duration_unit?: Database["public"]["Enums"]["duration_unit"]; duration_value?: number | null; id?: string; name: string; price: number; product_id: string; sort_order?: number }
        Update: { active?: boolean; duration_unit?: Database["public"]["Enums"]["duration_unit"]; duration_value?: number | null; id?: string; name?: string; price?: number; product_id?: string; sort_order?: number }
        Relationships: [
          { foreignKeyName: "product_plans_product_id_fkey"; columns: ["product_id"]; isOneToOne: false; referencedRelation: "products"; referencedColumns: ["id"] },
        ]
      }
      products: {
        Row: { category_id: string | null; created_at: string; delivery_type: Database["public"]["Enums"]["delivery_type"]; description: string | null; duration_unit: Database["public"]["Enums"]["duration_unit"]; duration_value: number | null; features: Json; id: string; image_url: string | null; instructions: string | null; name: string; old_price: number | null; popularity: number; price: number; slug: string; status: Database["public"]["Enums"]["product_status"]; stock: number | null; terms: string | null; updated_at: string }
        Insert: { category_id?: string | null; created_at?: string; delivery_type?: Database["public"]["Enums"]["delivery_type"]; description?: string | null; duration_unit?: Database["public"]["Enums"]["duration_unit"]; duration_value?: number | null; features?: Json; id?: string; image_url?: string | null; instructions?: string | null; name: string; old_price?: number | null; popularity?: number; price: number; slug: string; status?: Database["public"]["Enums"]["product_status"]; stock?: number | null; terms?: string | null; updated_at?: string }
        Update: { category_id?: string | null; created_at?: string; delivery_type?: Database["public"]["Enums"]["delivery_type"]; description?: string | null; duration_unit?: Database["public"]["Enums"]["duration_unit"]; duration_value?: number | null; features?: Json; id?: string; image_url?: string | null; instructions?: string | null; name?: string; old_price?: number | null; popularity?: number; price?: number; slug?: string; status?: Database["public"]["Enums"]["product_status"]; stock?: number | null; terms?: string | null; updated_at?: string }
        Relationships: [
          { foreignKeyName: "products_category_id_fkey"; columns: ["category_id"]; isOneToOne: false; referencedRelation: "categories"; referencedColumns: ["id"] },
        ]
      }
      profiles: {
        Row: { apellido: string | null; created_at: string; documento: string | null; id: string; nombre: string | null; role: Database["public"]["Enums"]["user_role"]; suspended: boolean; telefono: string | null; updated_at: string }
        Insert: { apellido?: string | null; created_at?: string; documento?: string | null; id: string; nombre?: string | null; role?: Database["public"]["Enums"]["user_role"]; suspended?: boolean; telefono?: string | null; updated_at?: string }
        Update: { apellido?: string | null; created_at?: string; documento?: string | null; id?: string; nombre?: string | null; role?: Database["public"]["Enums"]["user_role"]; suspended?: boolean; telefono?: string | null; updated_at?: string }
        Relationships: []
      }
      service_deliveries: {
        Row: { delivered_at: string; delivered_by: string | null; id: string; payload: Json; service_id: string; type: Database["public"]["Enums"]["delivery_type"] }
        Insert: { delivered_at?: string; delivered_by?: string | null; id?: string; payload?: Json; service_id: string; type: Database["public"]["Enums"]["delivery_type"] }
        Update: { delivered_at?: string; delivered_by?: string | null; id?: string; payload?: Json; service_id?: string; type?: Database["public"]["Enums"]["delivery_type"] }
        Relationships: [
          { foreignKeyName: "service_deliveries_service_id_fkey"; columns: ["service_id"]; isOneToOne: false; referencedRelation: "customer_services"; referencedColumns: ["id"] },
        ]
      }
      site_settings: {
        Row: { key: string; updated_at: string; value: Json }
        Insert: { key: string; updated_at?: string; value: Json }
        Update: { key?: string; updated_at?: string; value?: Json }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: {
      current_user_role: { Args: never; Returns: Database["public"]["Enums"]["user_role"] }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      delivery_type: "manual" | "codigo" | "licencia" | "instrucciones" | "activacion" | "automatica"
      discount_type: "porcentaje" | "monto_fijo"
      duration_unit: "dias" | "semanas" | "meses" | "anios" | "sin_vencimiento"
      order_status: "pendiente_pago" | "pago_recibido" | "verificando_pago" | "pagado" | "en_preparacion" | "entregado" | "cancelado" | "reembolsado"
      payment_status: "pendiente" | "procesando" | "aprobado" | "rechazado" | "cancelado" | "reembolsado"
      product_status: "activo" | "inactivo" | "agotado"
      proof_status: "pendiente" | "aprobado" | "rechazado"
      service_status: "activo" | "proximo_a_vencer" | "vencido" | "suspendido" | "cancelado"
      user_role: "cliente" | "admin" | "superadmin"
    }
    CompositeTypes: { [_ in never]: never }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"]
export type TablesInsert<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"]
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"]
export type Enums<T extends keyof Database["public"]["Enums"]> = Database["public"]["Enums"][T]
