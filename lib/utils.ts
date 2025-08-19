import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  amount: number,
  options: {
    currency?: string
    notation?: Intl.NumberFormatOptions["notation"]
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  } = {}
): string {
  const { 
    currency = "USD",
    notation = "standard",
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  } = options

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(amount)
}