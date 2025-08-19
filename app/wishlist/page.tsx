"use client"

import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { useWishlistStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Heart, X } from "lucide-react"

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-6">Add some products to your wishlist to see them here</p>
            <Button asChild>
              <a href="/">Continue Shopping</a>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
          <p className="text-muted-foreground">{items.length} items</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <div key={product.id} className="relative group">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={() => removeItem(product.id)}
                aria-label="Remove from wishlist"
              >
                <X className="h-4 w-4" />
              </Button>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}