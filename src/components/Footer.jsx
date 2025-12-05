import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} eCommerce - Todos los derechos reservados</p>
        <p>
          Desarrollado por <strong>Rodrigo Montes</strong>
        </p>
      </div>
    </footer>
  );
}
