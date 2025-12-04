import React, { useEffect, useState } from "react";

const EMPTY_PRODUCT = {
  id: null,
  name: "",
  price: "",
  description: "",
  category: "",
  image: ""
};

export default function ProductForm({ onSubmit, initialValues, loading }) {
  const [values, setValues] = useState(EMPTY_PRODUCT);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setValues({
        id: initialValues.id ?? null,
        name: initialValues.name ?? "",
        price:
          initialValues.price === 0 || initialValues.price
            ? String(initialValues.price)
            : "",
        description: initialValues.description ?? "",
        category: initialValues.category ?? "",
        image: initialValues.image ?? ""
      });
    } else {
      setValues(EMPTY_PRODUCT);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!values.name.trim()) err.name = "Nombre obligatorio";
    if (!values.price || Number(values.price) <= 0)
      err.price = "El precio debe ser mayor a 0";
    if (!values.description || values.description.trim().length < 10)
      err.description = "Mínimo 10 caracteres";
    if (values.image && !values.image.trim().startsWith("http"))
      err.image = "Debe ser una URL válida (comenzar con http)";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);

    if (Object.keys(v).length === 0) {
      const payload = {
        ...values,
        price: Number(values.price),
        category: values.category.trim(),
        image: values.image.trim()
      };

      if (!payload.id) delete payload.id;
      onSubmit(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form-dark">
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Precio</label>
        <input
          name="price"
          type="number"
          value={values.price}
          onChange={handleChange}
          className={`form-control ${errors.price ? "is-invalid" : ""}`}
        />
        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
          className={`form-control ${errors.description ? "is-invalid" : ""}`}
        />
        {errors.description && (
          <div className="invalid-feedback">{errors.description}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Categoría</label>
        <input
          name="category"
          value={values.category}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Imagen (URL)</label>
        <input
          name="image"
          value={values.image}
          onChange={handleChange}
          className={`form-control ${errors.image ? "is-invalid" : ""}`}
          placeholder="https://..."
        />
        {errors.image && <div className="invalid-feedback">{errors.image}</div>}
      </div>

      <button className="btn btn-primary" disabled={loading} type="submit">
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
