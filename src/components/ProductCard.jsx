// src/components/ProductCard.jsx
import React from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";

const CardWrapper = styled.div`
  background-color: #1b1b1d;
  border-radius: 0.6rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.75);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Body = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Title = styled.h5`
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Button = styled.button`
  margin-top: auto;
  background-color: #2563eb;
  border: none;
  color: #fff;
  padding: 0.45rem 0.9rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <CardWrapper>
      <Img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.name}
      />
      <Body>
        <Title>{product.name}</Title>
        <Price>${product.price}</Price>

        {/* 👉 SOLO agrega, el toast lo hace addToCart */}
        <Button onClick={() => addToCart(product)}>
          Añadir al carrito
        </Button>
      </Body>
    </CardWrapper>
  );
}
