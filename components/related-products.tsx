"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductCardSkeleton } from "@/components/product-card-skeleton"
import { getProductsByCategory, type Product } from "@/lib/api"
import { motion } from "framer-motion"

interface RelatedProductsProps {
  currentProductId: number
  category: string
}

export function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true)
        const data = await getProductsByCategory(category)
        // Filter out current product and limit to 4 related products
        const filtered = data.filter((product) => product.id !== currentProductId).slice(0, 4)
        setProducts(filtered)
      } catch (error) {
        console.error("Failed to fetch related products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [currentProductId, category])

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <h2 className="text-2xl font-bold text-foreground mb-6">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
