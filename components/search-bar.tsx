"use client"

import type React from "react"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useProductFilters } from "@/hooks/use-product-filters"

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useProductFilters()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery(localQuery)
  }

  const clearSearch = () => {
    setLocalQuery("")
    setSearchQuery("")
  }

  return (
    <form onSubmit={handleSearch} className="relative max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search for products..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="pl-10 pr-20 h-12 text-base bg-card border-border focus:ring-primary"
        />
        {localQuery && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button type="submit" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10">
          Search
        </Button>
      </div>
    </form>
  )
}
