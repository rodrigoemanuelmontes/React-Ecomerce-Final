import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CartPage from "./pages/CartPage";
import AdminProducts from "./pages/AdminProducts";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import PrivateRoute from "./routes/PrivateRoute";
import { Helmet } from "react-helmet-async";
import Footer from "./components/Footer";
import Nav from "./components/Navbarfix";
import "./main.css";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Helmet>
            <title>eCommerce Final</title>
          </Helmet>

          <div className="app-shell">
            <Nav />

            <div className="app-main container my-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route
                  path="/cart"
                  element={
                    <PrivateRoute>
                      <CartPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <PrivateRoute adminOnly>
                      <AdminProducts />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>

            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
