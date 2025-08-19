"use client"

import { memo, useMemo } from "react"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/api"

interface OptimizedProductCardProps {
  product: Product
}

export const OptimizedProductCard = memo(function OptimizedProductCard({ product }: OptimizedProductCardProps) {
  const memoizedProduct = useMemo(() => product, [product])

  return <ProductCard product={memoizedProduct} />
})
