"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, BarChart3, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore, useWishlistStore, useCompareStore } from "@/lib/store"
import type { Product } from "@/lib/api"
import { motion } from "framer-motion"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const addToCart = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const { addItem: addToCompare, removeItem: removeFromCompare, isInCompare } = useCompareStore()

  const inWishlist = isInWishlist(product.id)
  const inCompare = isInCompare(product.id)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inCompare) {
      removeFromCompare(product.id)
    } else {
      addToCompare(product)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link href={`/product/${product.id}`}>
        <Card className="group cursor-pointer bg-card border-border hover:border-primary/50 transition-all duration-200 overflow-hidden">
          <div className="relative aspect-square overflow-hidden">
            {imageLoading && <div className="absolute inset-0 bg-muted animate-pulse" />}
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onLoad={() => setImageLoading(false)}
            />

            {/* Action buttons */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-card/80 backdrop-blur-sm"
                onClick={handleWishlistToggle}
              >
                <Heart className={`h-4 w-4 ${inWishlist ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 bg-card/80 backdrop-blur-sm"
                onClick={handleCompareToggle}
              >
                <BarChart3 className={`h-4 w-4 ${inCompare ? "fill-primary text-primary" : ""}`} />
              </Button>
            </div>

            {/* Category badge */}
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="text-xs capitalize bg-card/80 backdrop-blur-sm">
                {product.category}
              </Badge>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {product.title}
              </h3>

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground">
                  {product.rating.rate} ({product.rating.count})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</span>
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
