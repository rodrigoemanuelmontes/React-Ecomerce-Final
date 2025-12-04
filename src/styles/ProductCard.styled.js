// src/components/ProductCard.styled.js
import styled from "styled-components";

export const Card = styled.div`
  background: radial-gradient(circle at top left, #18181b, #050509);
  border-radius: 1.1rem;
  padding: 1.2rem 1.2rem 1rem;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
  color: #f9fafb;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid rgba(148, 163, 184, 0.18);
  transition: transform 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
    border-color: rgba(59, 130, 246, 0.6);
  }
`;

export const ImageBox = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 0.9rem;
  margin-bottom: 0.9rem;
  overflow: hidden;
  background: radial-gradient(circle at 10% 20%, #1f2937, #020617);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PlaceholderText = styled.span`
  color: #9ca3af;
  font-size: 0.8rem;
`;

export const Title = styled.h5`
  font-size: 1.05rem;
  margin-bottom: 0.35rem;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  color: #d1d5db;
  min-height: 3.2rem;
`;

export const Price = styled.div`
  font-weight: 700;
  font-size: 1.05rem;
  margin-top: auto;
  margin-bottom: 0.6rem;
`;

export const AddButton = styled.button`
  width: 100%;
  border-radius: 999px;
  border: none;
  padding: 0.6rem 0.9rem;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  color: #ffffff;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease, filter 0.1s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
    filter: brightness(1.06);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: none;
  }
`;
