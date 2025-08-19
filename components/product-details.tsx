"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Heart, BarChart3, ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore, useWishlistStore, useCompareStore } from "@/lib/store"
import type { Product } from "@/lib/api"
import { motion } from "framer-motion"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [imageLoading, setImageLoading] = useState(true)

  const addToCart = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const { addItem: addToCompare, removeItem: removeFromCompare, isInCompare } = useCompareStore()

  const inWishlist = isInWishlist(product.id)
  const inCompare = isInCompare(product.id)

  // Generate multiple images for gallery (using the same image with different params for demo)
  const galleryImages = [
    product.image,
    `${product.image}?variant=1`,
    `${product.image}?variant=2`,
    `${product.image}?variant=3`,
  ]

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleCompareToggle = () => {
    if (inCompare) {
      removeFromCompare(product.id)
    } else {
      addToCompare(product)
    }
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Image Gallery */}
      <div className="space-y-4">
        <motion.div
          className="relative aspect-square overflow-hidden rounded-lg bg-card border border-border"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {imageLoading && <div className="absolute inset-0 bg-muted animate-pulse" />}
          <Image
            src={galleryImages[selectedImageIndex] || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover"
            onLoad={() => setImageLoading(false)}
            priority
          />
        </motion.div>

        {/* Thumbnail Gallery */}
        <div className="grid grid-cols-4 gap-2">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${
                selectedImageIndex === index ? "border-primary" : "border-border hover:border-primary/50"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.title} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Information */}
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Badge variant="secondary" className="mb-2 capitalize">
            {product.category}
          </Badge>
          <h1 className="text-3xl font-bold text-foreground mb-4">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating.rate) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-foreground">${product.price.toFixed(2)}</span>
          </div>
        </motion.div>

        <Separator />

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-3">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </motion.div>

        <Separator />

        {/* Quantity and Actions */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border border-border rounded-md">
              <Button variant="ghost" size="sm" onClick={decrementQuantity} className="h-10 w-10 p-0">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
              <Button variant="ghost" size="sm" onClick={incrementQuantity} className="h-10 w-10 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleAddToCart} className="flex-1 h-12">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" onClick={handleWishlistToggle} className="h-12 w-12 bg-transparent">
              <Heart className={`h-5 w-5 ${inWishlist ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="outline" size="icon" onClick={handleCompareToggle} className="h-12 w-12 bg-transparent">
              <BarChart3 className={`h-5 w-5 ${inCompare ? "fill-primary text-primary" : ""}`} />
            </Button>
          </div>
        </motion.div>

        {/* Product Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="bg-muted/50 border-border">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating:</span>
                  <span className="font-medium">{product.rating.rate}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reviews:</span>
                  <span className="font-medium">{product.rating.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability:</span>
                  <span className="font-medium text-green-500">In Stock</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
