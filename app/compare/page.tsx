"use client"

import { Header } from "@/components/header"
import { useCompareStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, X, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ComparePage() {
  const { items, removeItem, clearCompare } = useCompareStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">No products to compare</h1>
            <p className="text-muted-foreground mb-6">Add some products to compare their features</p>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
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
          <h1 className="text-3xl font-bold text-foreground">Compare Products</h1>
          <Button variant="outline" onClick={clearCompare}>
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <Card key={product.id} className="bg-card border-border">
              <CardHeader className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => removeItem(product.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="relative aspect-square mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Price:</span>
                    <span className="font-semibold">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Category:</span>
                    <Badge variant="secondary" className="text-xs capitalize">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating.rate}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Reviews:</span>
                    <span className="text-sm">{product.rating.count}</span>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link href={`/product/${product.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
