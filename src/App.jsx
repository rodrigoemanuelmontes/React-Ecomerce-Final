import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CartPage from "./pages/CartPage";
import AdminProducts from "./pages/AdminProducts";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider, useCart } from "./context/CartContext";
import PrivateRoute from "./routes/PrivateRoute";
import { Helmet } from "react-helmet-async";
import Footer from "./components/Footer";
import "./main.css";

/* ========================= */
/* NAVBAR ✅ DEFINITIVA */
/* ========================= */

function Nav() {
  const { isAuthenticated, logout, user, isAdmin } = useAuth();
  const { cartCount } = useCart();

  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [expanded, setExpanded] = useState(false); // ✅ controla menú

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.innerWidth < 768) {
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setHideOnScroll(true);
          setExpanded(false); // ✅ CIERRA EL MENÚ AL OCULTARSE
        } else {
          setHideOnScroll(false);
        }
        lastScrollY = window.scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-dark sticky-top ${
        hideOnScroll ? "hide-navbar" : ""
      }`}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-uppercase" to="/">
          eCommerce
        </Link>

        {/* ✅ BOTÓN HAMBURGUESA */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ✅ MENÚ CONTROLADO REAL */}
        <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                onClick={() => setExpanded(false)}
              >
                Home
              </NavLink>
            </li>

            {isAuthenticated && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/cart"
                  onClick={() => setExpanded(false)}
                >
                  Carrito ({cartCount})
                </NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex gap-2 align-items-center">
            {isAdmin && (
              <NavLink
                to="/admin"
                className="btn btn-outline-light btn-sm"
                onClick={() => setExpanded(false)}
              >
                Admin
              </NavLink>
            )}

            {isAuthenticated ? (
              <>
                <span className="text-light small">
                  {isAdmin ? "Bienvenido Admin" : user.email}
                </span>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    logout();
                    setExpanded(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary btn-sm"
                onClick={() => setExpanded(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ========================= */
/* APP */
/* ========================= */

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
