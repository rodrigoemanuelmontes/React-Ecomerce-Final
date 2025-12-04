import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CartPage from "./pages/CartPage";
import AdminProducts from "./pages/AdminProducts";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider, useCart } from "./context/CartContext";
import PrivateRoute from "./routes/PrivateRoute";
import { Helmet } from "react-helmet-async";
import "./main.css"; // asegurate de tener los estilos de la animación

function Nav() {
  const { isAuthenticated, logout, user } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-uppercase" to="/">
          eCommerce
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-semibold" : "")
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-semibold" : "")
                }
              >
                Carrito ({cartCount})
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            {isAuthenticated && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  "btn btn-sm " +
                  (isActive ? "btn-outline-light" : "btn-outline-secondary")
                }
              >
                Admin
              </NavLink>
            )}

            {isAuthenticated ? (
              <>
                <span className="text-light small d-none d-md-inline">
                  {user?.email}
                </span>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link className="btn btn-sm btn-primary" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Toast animado estilo Login
function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="toast-notification">
      <div className="toast-body">{toastMessage}</div>
      <div className="toast-progress"></div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Helmet>
            <title>eCommerce Final</title>
            <meta
              name="description"
              content="Entrega final - eCommerce Talento Lab"
            />
          </Helmet>

          <Nav />
          <Toast />

          <div className="container my-4">
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
                  <PrivateRoute>
                    <AdminProducts />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
