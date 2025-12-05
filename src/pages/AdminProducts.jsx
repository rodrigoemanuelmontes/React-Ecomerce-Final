import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductForm from "../components/ProductForm";
import { useCart } from "../context/CartContext";

export default function AdminProducts() {
  const { products, setProducts, loading, error } = useProducts();
  const { showToast } = useCart();

  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleEdit = (product) => setEditingProduct(product);
  const handleNew = () => setEditingProduct(null);

  // ✅ BASE DINÁMICA: LOCAL vs VERCEL
 const BASE_URL = "https://69319dc911a8738467cfc466.mockapi.io/products";


  // ✅ CREAR / EDITAR
  const handleSubmit = async (data) => {
    const isEditing = !!(editingProduct && editingProduct.id);

    const url = isEditing
      ? `${BASE_URL}/${editingProduct.id}`
      : BASE_URL;

    const method = isEditing ? "PUT" : "POST";

    try {
      setSaving(true);

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al guardar");

      const savedProduct = await res.json();

      setProducts((prev) => {
        if (isEditing) {
          return prev.map((p) =>
            p.id === savedProduct.id ? savedProduct : p
          );
        }
        return [...prev, savedProduct];
      });

      setEditingProduct(null);

      showToast(
        isEditing
          ? "Producto actualizado correctamente"
          : "Producto creado correctamente"
      );
    } catch (err) {
      console.error("Error guardando producto", err);
      showToast("Error al guardar el producto");
    } finally {
      setSaving(false);
    }
  };

  // ✅ ELIMINAR
  const handleDelete = async (id) => {
    if (!id) return showToast("Producto sin ID válido");

    if (!window.confirm("¿Seguro que querés eliminar este producto?")) return;

    try {
      setSaving(true);

      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar");

      setProducts((prev) => prev.filter((p) => p.id !== id));

      if (editingProduct && editingProduct.id === id) {
        setEditingProduct(null);
      }

      showToast("Producto eliminado correctamente");
    } catch (err) {
      console.error("Error eliminando", err);
      showToast("Error al eliminar el producto");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dark-page">
      <div className="container py-4">
        <div className="row">

          {/* FORMULARIO */}
          <div className="col-12 col-lg-5 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h5 mb-0">
                {editingProduct ? "Editar producto" : "Nuevo producto"}
              </h2>

              {editingProduct && (
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleNew}
                >
                  Nuevo
                </button>
              )}
            </div>

            <ProductForm
              onSubmit={handleSubmit}
              initialValues={editingProduct}
              loading={saving}
            />
          </div>

          {/* LISTADO */}
          <div className="col-12 col-lg-7">
            <h2 className="h5 mb-3">Listado</h2>

            {loading && <p>Cargando productos...</p>}
            {error && <p className="text-danger">Error: {error}</p>}

            <ul className="list-group">
              {products.map((p) => (
                <li
                  key={p.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{p.name}</strong>
                    <div className="text-muted small">
                      ${p.price} {p.category ? `- ${p.category}` : ""}
                    </div>
                  </div>

                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(p)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(p.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}

              {products.length === 0 && !loading && (
                <li className="list-group-item text-muted text-center">
                  No hay productos cargados.
                </li>
              )}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
