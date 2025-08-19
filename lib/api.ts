export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface CartItem extends Product {
  quantity: number
}

function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Client-side
    return ""
  }
  // Server-side
  return process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${getBaseUrl()}/api/products`)
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  return response.json()
}

export async function getProduct(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/products/${id}`)
    if (!response.ok) {
      return null
    }
    return response.json()
  } catch {
    return null
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const products = await getProducts()
    return products.filter((product) => product.category === category)
  } catch {
    return []
  }
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${getBaseUrl()}/api/categories`)
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  return response.json()
}
