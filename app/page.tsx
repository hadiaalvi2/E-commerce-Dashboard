"use client"

import { Suspense } from "react"
import { LazyProductGrid, LazyFilterSidebar } from "@/components/lazy-components"
import { EnhancedSearchBar } from "@/components/enhanced-search-bar"
import { Header } from "@/components/header"
import { PageTransition } from "@/components/page-transition"
import { LoadingBar } from "@/components/loading-bar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <LoadingBar />
      <Header />
      <PageTransition>
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <EnhancedSearchBar />
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            <aside className="lg:w-64 flex-shrink-0">
              <Suspense fallback={<div className="h-64 animate-pulse bg-muted" />}>
                <LazyFilterSidebar />
              </Suspense>
            </aside>

            <div className="flex-1">
              <Suspense fallback={<div className="h-96 animate-pulse bg-muted" />}>
                <LazyProductGrid />
              </Suspense>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  )
}