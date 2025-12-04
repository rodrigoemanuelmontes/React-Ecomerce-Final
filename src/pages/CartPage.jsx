// src/pages/CartPage.jsx
import React from "react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, total, cartCount, showToast } =
    useCart();

  const handlePayment = () => {
    if (cart.length === 0) return;

    showToast("¡Venta simulada completada con éxito!");
    clearCart();
  };

  const handleClearCart = () => {
    clearCart();
    showToast("Carrito vaciado");
  };

  if (cart.length === 0)
    return (
      <p className="text-center mt-4 text-white">El carrito está vacío 🛒</p>
    );

  return (
    <div className="container my-4">
      <h2 className="mb-3 text-white">Carrito de compras ({cartCount} items)</h2>

      <div className="row g-3">
        {cart.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4">
            <div
              className="card h-100 text-white"
              style={{ backgroundColor: "#1b1b1d" }}
            >
              <img
                src={item.image || "https://via.placeholder.com/300"}
                className="card-img-top"
                alt={item.name}
                style={{ objectFit: "cover", height: "200px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text mb-1">
                  Cantidad: <strong>{item.quantity}</strong>
                </p>
                <p className="card-text mb-2">
                  Precio total: <strong>${item.price * item.quantity}</strong>
                </p>

                <button
                  className="btn btn-danger btn-sm mt-auto"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <h4 className="text-white mb-2 mb-md-0">Total: ${total}</h4>
        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-outline-light" onClick={handleClearCart}>
            Vaciar carrito
          </button>
          <button className="btn btn-success" onClick={handlePayment}>
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}
