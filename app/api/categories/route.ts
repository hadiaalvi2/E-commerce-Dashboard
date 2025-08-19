import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://fakestoreapi.com/products/categories")

    if (!response.ok) {
      throw new Error("Failed to fetch categories from external API")
    }

    const categories = await response.json()
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Categories API error:", error)
    // Return fallback categories if external API fails
    return NextResponse.json(["electronics", "jewelery", "men's clothing", "women's clothing"])
  }
}
