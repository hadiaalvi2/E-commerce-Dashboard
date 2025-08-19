"use client"

import { create } from "zustand"

interface ProductFiltersState {
  searchQuery: string
  selectedCategories: string[]
  priceRange: [number, number]
  setSearchQuery: (query: string) => void
  setSelectedCategories: (categories: string[]) => void
  setPriceRange: (range: [number, number]) => void
  clearFilters: () => void
}

export const useProductFilters = create<ProductFiltersState>()((set) => ({
  searchQuery: "",
  selectedCategories: [],
  priceRange: [0, 1000],
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategories: (categories) => set({ selectedCategories: categories }),
  setPriceRange: (range) => set({ priceRange: range }),
  clearFilters: () =>
    set({
      searchQuery: "",
      selectedCategories: [],
      priceRange: [0, 1000],
    }),
}))
