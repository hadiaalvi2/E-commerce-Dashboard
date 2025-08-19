export async function GET() {
  try {
    const response = await fetch("https://fakestoreapi.com/products")

    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }

    const products = await response.json()

    return Response.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)

    // Return fallback products if the external API fails
    const fallbackProducts = [
      {
        id: 1,
        title: "Sample Product 1",
        price: 29.99,
        description: "A great sample product",
        category: "electronics",
        image: "/electronics-components.png",
        rating: { rate: 4.5, count: 120 },
      },
      {
        id: 2,
        title: "Sample Product 2",
        price: 49.99,
        description: "Another amazing product",
        category: "clothing",
        image: "/diverse-clothing-rack.png",
        rating: { rate: 4.2, count: 85 },
      },
    ]

    return Response.json(fallbackProducts)
  }
}
