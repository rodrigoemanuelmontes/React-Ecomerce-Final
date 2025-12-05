import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Nav() {
  const { isAuthenticated, logout, user, isAdmin } = useAuth();
  const { cartCount } = useCart();

  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.innerWidth >= 768) return;
      if (isOpen) return; // ✅ SI EL MENÚ ESTÁ ABIERTO NO SE OCULTA

      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setHideOnScroll(true);
      } else {
        setHideOnScroll(false);
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setHideOnScroll(false);
  };

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

        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={() => setIsOpen(false)}>
                Home
              </NavLink>
            </li>

            {isAuthenticated && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/cart"
                  onClick={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
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
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary btn-sm"
                onClick={() => setIsOpen(false)}
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
