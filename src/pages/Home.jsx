import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../context/CartContext";
import { FaSearch } from "react-icons/fa";

const PageWrapper = styled.div`
  min-height: 100vh;
  background: radial-gradient(circle at top, #020617, #000000 60%);
  padding: 2rem 1.5rem 3rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.6rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: rgba(15, 23, 42, 0.95);
  color: #e5e7eb;
  outline: none;
`;

const Home = () => {
  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);          // ← paginación
  const ITEMS_PER_PAGE = 10;

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        (p.category || "").toLowerCase().includes(term)
    );
  }, [products, search]);

  // ← productos por página
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  return (
    <PageWrapper>
      <div className="container">

        {/* BUSCADOR */}
        <div className="mb-4 position-relative">
          <FaSearch
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              color: "#6b7280",
            }}
          />
          <SearchInput
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // ← si cambia la búsqueda vuelve a pag 1
            }}
          />
        </div>

        {loading && <p className="text-white">Cargando productos...</p>}
        {error && <p className="text-danger">Error: {error}</p>}

        <Grid>
          {paginated.map((product) => (
            <div
              key={product.id}
              className="card text-white"
              style={{ backgroundColor: "#1b1b1d" }}
            >
              <img
                loading="lazy"
                src={product.image || "https://via.placeholder.com/300"}
                alt={product.name}
                className="card-img-top"
                style={{
                  height: "200px",
                  objectFit: "cover",
                  backgroundColor: "#0f0f0f"
                }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text mb-2">${product.price}</p>

                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => addToCart(product)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </Grid>

        {/* PAGINACIÓN */}
        <div className="mt-4 d-flex justify-content-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className="btn btn-secondary"
              style={{
                background: page === i + 1 ? "#0d6efd" : "#1f2937",
                border: "none",
              }}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </PageWrapper>
  );
};

export default Home;
