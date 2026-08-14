# Plataforma de Servicios Digitales

## Estado: FASE 1 completada ✅

- Supabase creado: proyecto `plataforma-servicios-digitales` (ref `ahpmqujubehifyteisir`, sa-east-1).
- Esquema completo aplicado: profiles, categories, products, product_plans, carts, cart_items,
  orders, order_items, payments, payment_proofs, customer_services, service_deliveries, coupons,
  coupon_usages, notifications, audit_logs, site_settings — todas con RLS.
- Storage: buckets `product-images` (público), `payment-proofs` y `receipts` (privados).
- Roles: cliente / admin / superadmin vía `profiles.role` + funciones `is_admin()`.
- Frontend base: React + Vite + TS + Tailwind, conectado a Supabase, con:
  - Auth (login, registro, sesión persistente)
  - Carrito funcional (Supabase-backed)
  - Catálogo con búsqueda, filtro por categoría y orden
  - Página de producto con planes
  - Rutas protegidas para `/mi-cuenta` y `/admin`

## Cómo correr el proyecto

```bash
npm install
cp .env.example .env   # completa VITE_SUPABASE_ANON_KEY
npm run dev
```

## Variables de entorno

Ver `.env.example`. La URL y el anon key ya están documentados; el anon key es seguro de exponer
en el frontend (protegido por RLS). Las claves de Wompi y el service role **nunca** van en `.env`
del frontend — se configuran como secrets de Supabase Edge Functions en la Fase 5.

## Próximas fases

2. Autenticación + roles avanzados (recuperación de contraseña, gestión de perfil completo)
3. Categorías/productos: CRUD admin
4. Checkout completo con cupones
5. Pedidos + integración de pagos Wompi (Edge Functions + webhook)
6. Pagos manuales + revisión de comprobantes
7. Panel administrativo (dashboard, gráficos, gestión de pedidos/clientes)
8. Entrega digital + servicios del cliente
9. Recibos PDF
10. Seguridad + pruebas end-to-end
11. Despliegue en Netlify (producción)

No avanzar de fase sin dejar la anterior funcional y probada.
