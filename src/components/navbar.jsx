import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const NavWrapper = styled.nav`
  background: #0b0b0d;
  color: #f5f5f5;
  padding: 0.8rem 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  position: sticky;
  top: 0;
  z-index: 50;
`;

const NavInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`;

const Brand = styled(Link)`
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: none;
    color: #e5e5e5;
  }
`;

const BrandIcon = styled(FaShoppingCart)`
  font-size: 1.1rem;
`;

const CenterLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none; /* si después querés menú hamburguesa, lo trabajamos acá */
  }
`;

const NavItem = styled(NavLink)`
  color: #c5c5c5;
  text-decoration: none;
  font-size: 0.95rem;
  padding-bottom: 2px;

  &.active {
    color: #ffffff;
    border-bottom: 2px solid #ffffff;
  }

  &:hover {
    color: #ffffff;
    text-decoration: none;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const CartLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: #f5f5f5;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: #18181b;

  &:hover {
    background: #27272f;
    text-decoration: none;
    color: #ffffff;
  }
`;

const AuthButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 0.4rem 0.95rem;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: ${(p) => (p.logout ? "#ef4444" : "#2563eb")};
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.35);
    background: ${(p) => (p.logout ? "#dc2626" : "#1d4ed8")};
  }
`;

const AdminLink = styled(NavLink)`
  color: #c5c5c5;
  text-decoration: none;
  font-size: 0.9rem;

  &.active {
    color: #ffffff;
  }

  &:hover {
    color: #ffffff;
    text-decoration: none;
  }
`;

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <NavWrapper>
      <NavInner>
        {/* Izquierda: logo */}
        <Brand to="/">
          <BrandIcon />
          <span>eCommerce</span>
        </Brand>

        {/* Centro: links generales */}
        <CenterLinks>
          <NavItem to="/" end>
            Home
          </NavItem>
          <NavItem to="/cart">Carrito</NavItem>
        </CenterLinks>

        {/* Derecha: carrito + admin/login/logout */}
        <RightSide>
          <CartLink to="/cart">
            <FaShoppingCart />
            <span>Ver carrito</span>
          </CartLink>

          {isAuthenticated ? (
            <>
              <AdminLink to="/admin">Admin</AdminLink>

              <AuthButton logout onClick={logout}>
                <FaSignOutAlt />
                <span>Salir</span>
              </AuthButton>
            </>
          ) : (
            <Link to="/login">
              <AuthButton>
                <FaSignInAlt />
                <span>Login</span>
              </AuthButton>
            </Link>
          )}
        </RightSide>
      </NavInner>
    </NavWrapper>
  );
};

export default Navbar;
