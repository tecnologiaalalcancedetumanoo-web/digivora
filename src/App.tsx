import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { PublicLayout } from "@/layouts/PublicLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Home } from "@/pages/Home";
import { Catalogo } from "@/pages/Catalogo";
import { Producto } from "@/pages/Producto";
import { Carrito } from "@/pages/Carrito";
import { Login } from "@/pages/Login";
import { Registro } from "@/pages/Registro";
import { MiCuenta } from "@/pages/MiCuenta";
import { AdminDashboard } from "@/pages/AdminDashboard";
import { Promociones } from "@/pages/Promociones";
import { Ayuda } from "@/pages/Ayuda";
import { RecuperarPassword } from "@/pages/RecuperarPassword";
import { RestablecerPassword } from "@/pages/RestablecerPassword";
import { Checkout } from "@/pages/Checkout";
import { PedidoConfirmado } from "@/pages/PedidoConfirmado";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="productos" element={<Catalogo />} />
              <Route path="producto/:slug" element={<Producto />} />
              <Route path="carrito" element={<Carrito />} />
              <Route path="promociones" element={<Promociones />} />
              <Route path="ayuda" element={<Ayuda />} />
              <Route path="login" element={<Login />} />
              <Route path="registro" element={<Registro />} />
              <Route path="recuperar-password" element={<RecuperarPassword />} />
              <Route path="restablecer-password" element={<RestablecerPassword />} />

              <Route element={<ProtectedRoute />}>
                <Route path="mi-cuenta" element={<MiCuenta />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="pedido/:orderNumber" element={<PedidoConfirmado />} />
              </Route>

              <Route element={<ProtectedRoute adminOnly />}>
                <Route path="admin" element={<AdminDashboard />} />
              </Route>
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
