"use client"

import Link from "next/link"
import { ShoppingCart, Heart, BarChart3, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore, useWishlistStore, useCompareStore } from "@/lib/store"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Header() {
  const { getTotalItems } = useCartStore()
  const wishlistItems = useWishlistStore((state) => state.items)
  const compareItems = useCompareStore((state) => state.items)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cartItemsCount = mounted ? getTotalItems() : 0
  const wishlistCount = mounted ? wishlistItems.length : 0
  const compareCount = mounted ? compareItems.length : 0

  const toggleTheme=()=>{
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl md:text-2xl font-bold text-foreground">
            Shopie
          </Link>

          <nav className="hidden sm:flex items-center space-x-4 md:space-x-6">
            <Link href="/" className="text-sm md:text-base text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link
              href="/wishlist"
              className="text-sm md:text-base text-foreground hover:text-primary transition-colors"
            >
              Wishlist
            </Link>
            <Link href="/compare" className="text-sm md:text-base text-foreground hover:text-primary transition-colors">
              Compare
            </Link>
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8 md:h-10 md:w-10"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {mounted && theme === "dark" ? (
                <Sun className="h-4 w-4 md:h-5 md:w-5" />
              ) : (
                <Moon className="h-4 w-4 md:h-5 md:w-5" />
              )}
            </Button>


            <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-8 w-8 md:h-10 md:w-10"
                >
                  <Heart className="h-4 w-4 md:h-5 md:w-5" />
                  {mounted && wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 md:h-5 md:w-5 rounded-full bg-primary text-primary-foreground text-[10px] md:text-xs">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>

            <Link href="/compare">
              <Button variant="ghost" size="icon" className="relative h-8 w-8 md:h-10 md:w-10">
                <BarChart3 className="h-4 w-4 md:h-5 md:w-5" />
                {mounted && compareCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center text-[10px] md:text-xs">
                    {compareCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative h-8 w-8 md:h-10 md:w-10">
                <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                {mounted && cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center text-[10px] md:text-xs">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        <nav className="sm:hidden mt-4 flex items-center justify-center space-x-6">
          <Link href="/" className="text-sm text-foreground hover:text-primary transition-colors">
            Products
          </Link>
          <Link href="/wishlist" className="text-sm text-foreground hover:text-primary transition-colors">
            Wishlist
          </Link>
          <Link href="/compare" className="text-sm text-foreground hover:text-primary transition-colors">
            Compare
          </Link>
        </nav>
      </div>
    </header>
  )
}
