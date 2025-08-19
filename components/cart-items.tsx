"use client"

import { useState, memo } from "react"
import Image from "next/image"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/store"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  image?: string
  category?: string
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

export const CartItems = memo(function CartItems() {
  const { items, removeItem, updateQuantity } = useCartStore()
  const [imageLoadingStates, setImageLoadingStates] = useState<Record<number, boolean>>({})
  const [imageErrorStates, setImageErrorStates] = useState<Record<number, boolean>>({})

  const handleImageLoad = (productId: number) => {
    setImageLoadingStates((prev) => ({ ...prev, [productId]: false }))
  }

  const handleImageError = (productId: number) => {
    setImageErrorStates((prev) => ({ ...prev, [productId]: true }))
  }

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  if (items.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-8">
          <div className="text-center py-8">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Add some products to get started</p>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h2>

        <div className="space-y-4">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ 
                  opacity: 0, 
                  x: -100,
                  transition: { duration: 0.15 }
                }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="group"
                layout
              >
                <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  {/* Product Image */}
                  <div className="relative w-full sm:w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    {(imageLoadingStates[item.id] !== false || imageErrorStates[item.id]) && (
                      <div className="absolute inset-0 bg-muted animate-pulse" />
                    )}
                    {!imageErrorStates[item.id] && (
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="object-cover"
                        priority={index < 3}
                        onLoadingComplete={() => handleImageLoad(item.id)}
                        onError={() => handleImageError(item.id)}
                      />
                    )}
                  </div>

                  {/* Product Details and Controls */}
                  <div className="flex-1 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 min-w-0">
                      <Link 
                        href={`/product/${item.id}`} 
                        className="text-foreground hover:text-primary transition-colors"
                        aria-label={`View ${item.title} details`}
                      >
                        <h3 className="font-medium line-clamp-2 mb-1">{item.title}</h3>
                      </Link>
                      {item.category && (
                        <p className="text-sm text-muted-foreground capitalize mb-2">
                          {item.category}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-foreground">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatPrice(item.price)} each
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center border border-border rounded-md">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                          aria-label={`Decrease quantity of ${item.title}`}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-3 py-1 min-w-[2.5rem] text-center text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {index < items.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
})