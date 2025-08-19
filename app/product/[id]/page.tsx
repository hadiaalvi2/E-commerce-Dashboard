import { LazyProductDetails } from "@/components/lazy-components"
import { RelatedProducts } from "@/components/related-products"
import { Header } from "@/components/header"
import { PageTransition } from "@/components/page-transition"
import { LoadingBar } from "@/components/loading-bar"

interface ProductPageProps {
  params: { id: string }
}

// Pre-generate first 20 product pages
export async function generateStaticParams() {
  try {
    const response = await fetch("https://fakestoreapi.com/products")
    const products = await response.json()
    return products.slice(0, 20).map((product: any) => ({
      id: product.id.toString(),
    }))
  } catch (error) {
    console.warn("Failed to fetch products for static generation, using fallback IDs")
    return Array.from({ length: 20 }, (_, i) => ({
      id: (i + 1).toString(),
    }))
  }
}

// Fetch a single product directly from Fake Store API
async function getProductDirect(id: number) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductDirect(Number.parseInt(params.id))

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl font-semibold text-red-500">Product not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <LoadingBar />
      <Header />
      <PageTransition>
        <main className="container mx-auto px-4 py-8">
          <LazyProductDetails product={product} />
          <div className="mt-16">
            <RelatedProducts currentProductId={product.id} category={product.category} />
          </div>
        </main>
      </PageTransition>
    </div>
  )
}
