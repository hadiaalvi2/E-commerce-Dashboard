"use client"

import dynamic from "next/dynamic"
import { ProductCardSkeleton } from "@/components/product-card-skeleton"

export const LazyProductGrid = dynamic(
  () => import("@/components/product-grid").then((mod) => ({ default: mod.ProductGrid })),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    ),
  },
)

export const LazyFilterSidebar = dynamic(
  () => import("@/components/filter-sidebar").then((mod) => ({ default: mod.FilterSidebar })),
  {
    loading: () => <div className="w-64 h-96 bg-muted animate-pulse rounded-lg" />,
  },
)

export const LazyProductDetails = dynamic(
  () => import("@/components/product-details").then((mod) => ({ default: mod.ProductDetails })),
  {
    loading: () => (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square bg-muted animate-pulse rounded-lg" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-muted animate-pulse rounded-md" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 bg-muted animate-pulse rounded" />
          <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
          <div className="h-12 bg-muted animate-pulse rounded w-1/2" />
          <div className="h-32 bg-muted animate-pulse rounded" />
        </div>
      </div>
    ),
  },
)
