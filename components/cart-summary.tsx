"use client"

import { useState } from "react"
import { CreditCard, Truck, Shield, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCartStore } from "@/lib/store"
import { motion } from "framer-motion"
import { formatPrice } from "@/lib/utils" 

const PROMO_CODE = "SAVE10"
const FREE_SHIPPING_THRESHOLD = 100
const SHIPPING_COST = 9.99
const TAX_RATE = 0.08
const PROMO_DISCOUNT_RATE = 0.1

export function CartSummary() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const subtotal = getTotalPrice()
  const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const tax = subtotal * TAX_RATE
  const promoDiscount = promoApplied ? subtotal * PROMO_DISCOUNT_RATE : 0
  const total = subtotal + shipping + tax - promoDiscount
  const amountNeededForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === PROMO_CODE) {
      setPromoApplied(true)
    }
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      clearCart()
      alert("Order placed successfully! Thank you for your purchase.")
    } catch (error) {
      console.error("Checkout failed:", error)
      alert("There was an error processing your order. Please try again.")
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-4"
    >
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl">Order Summary</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Promo Code Section */}
          <div className="space-y-2">
            <Label htmlFor="promo">Promo Code</Label>
            <div className="flex gap-2">
              <Input
                id="promo"
                placeholder={`Enter code (try: ${PROMO_CODE})`}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={promoApplied}
                className="bg-background"
                onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
              />
              <Button 
                variant="outline" 
                onClick={handleApplyPromo} 
                disabled={promoApplied || !promoCode.trim()} 
                size="sm"
                aria-label="Apply promo code"
              >
                {promoApplied ? "Applied" : "Apply"}
              </Button>
            </div>
            {promoApplied && (
              <p className="text-sm text-green-500 flex items-center gap-1">
                <span>✓</span> Promo code applied! 10% off
              </p>
            )}
          </div>

          <Separator />

          {/* Price Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal ({items.length} {items.length === 1 ? "item" : "items"})</span>
              <span className="text-foreground">{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground">
                {shipping === 0 ? (
                  <span className="text-green-500 flex items-center gap-1">
                    <Truck className="h-3 w-3" /> Free
                  </span>
                ) : (
                  formatPrice(shipping)
                )}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax ({TAX_RATE * 100}%)</span>
              <span className="text-foreground">{formatPrice(tax)}</span>
            </div>

            {promoApplied && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount ({PROMO_CODE})</span>
                <span className="text-green-500">-{formatPrice(promoDiscount)}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Total */}
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          {/* Free Shipping Notice */}
          {shipping > 0 && (
            <div className="bg-muted/50 p-3 rounded-md">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Truck className="h-4 w-4" />
                Add {formatPrice(amountNeededForFreeShipping)} more for free shipping
              </p>
            </div>
          )}

          {/* Checkout Button */}
          <Button 
            onClick={handleCheckout} 
            disabled={isCheckingOut} 
            className="w-full h-12 text-base"
            aria-label="Proceed to checkout"
          >
            {isCheckingOut ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to Checkout
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>

          {/* Security & Shipping Info */}
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 flex-shrink-0" />
              <span>Secure checkout with SSL encryption</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4 flex-shrink-0" />
              <span>Free returns within 30 days</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}