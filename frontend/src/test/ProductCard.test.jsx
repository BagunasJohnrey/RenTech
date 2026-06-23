import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import ProductCard from '../components/ProductCard';

describe('ProductCard Component', () => {
  const sampleProduct = {
    id: 1,
    name: 'Test Suit',
    category: 'Suit',
    price: 1000,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=500'
  };

  it('renders product details correctly', () => {
    render(<ProductCard product={sampleProduct} />);
    expect(screen.getByText('Test Suit')).toBeInTheDocument();
    expect(screen.getByText('Rent Now')).toBeInTheDocument();
  });
});