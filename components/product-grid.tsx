"use client"

import { useEffect, useState } from "react"
import { OptimizedProductCard } from "@/components/optimized-product-card"
import { ProductCardSkeleton } from "@/components/product-card-skeleton"
import { Pagination } from "@/components/pagination"
import { useProductFilters } from "@/hooks/use-product-filters"
import { getProducts, type Product } from "@/lib/api"

const PRODUCTS_PER_PAGE = 12

export function ProductGrid() {
  const { searchQuery, selectedCategories, priceRange } = useProductFilters()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    // Filter by price range
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    setFilteredProducts(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [products, searchQuery, selectedCategories, priceRange])

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(12)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No products found</h3>
        <p className="text-sm sm:text-base text-muted-foreground">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 sm:px-0">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
        {currentProducts.map((product) => (
          <OptimizedProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="px-4 sm:px-0">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  )
}
