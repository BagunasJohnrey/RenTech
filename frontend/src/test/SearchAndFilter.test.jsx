import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import SearchAndFilter from '../components/SearchAndFilter';

describe('SearchAndFilter Component', () => {
  it('renders the search input component frame with placeholder text', () => {
    render(
      <SearchAndFilter
        searchTerm=""
        onSearchChange={vi.fn()}
        selectedCategory="All"
        onCategoryChange={vi.fn()}
      />
    );
    
    // Verifies the text input is visible with the exact placeholder text
    const inputElement = screen.getByPlaceholderText('Search (e.g. Gatsby, Suit)...');
    expect(inputElement).toBeInTheDocument();
  });

  it('displays the filter icon button and opens status menu interactions on click', () => {
    render(
      <SearchAndFilter
        searchTerm=""
        onSearchChange={vi.fn()}
        selectedCategory="All"
        onCategoryChange={vi.fn()}
      />
    );

    // 1. Locate the button container wrapping your filter SVG icon
    const filterButton = screen.getByRole('button');
    expect(filterButton).toBeInTheDocument();

    // 2. Click the filter button to open the dropdown menu 
    fireEvent.click(filterButton);

    // 3. Confirm the status dropdown items render clearly upon opening
    const dropdownHeader = screen.getByText('STATUS');
    expect(dropdownHeader).toBeInTheDocument();

    const statusOption = screen.getByRole('button', { name: 'Available' });
    expect(statusOption).toBeInTheDocument();
  });
});