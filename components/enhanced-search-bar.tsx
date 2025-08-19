"use client"

import type React from "react"

import { useState, useCallback, useMemo } from "react"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useProductFilters } from "@/hooks/use-product-filters"
import { motion, AnimatePresence } from "framer-motion"

export function EnhancedSearchBar() {
  const { searchQuery, setSearchQuery } = useProductFilters()
  const [localQuery, setLocalQuery] = useState(searchQuery)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>(["wireless headphones", "laptop", "smartphone"])

  const trendingSearches = useMemo(() => ["electronics", "clothing", "jewelry", "books"], [])

  const handleSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        setSearchQuery(query)
        setRecentSearches((prev) => {
          const updated = [query, ...prev.filter((item) => item !== query)].slice(0, 5)
          return updated
        })
      }
      setShowSuggestions(false)
    },
    [setSearchQuery],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(localQuery)
  }

  const clearSearch = () => {
    setLocalQuery("")
    setSearchQuery("")
    setShowSuggestions(false)
  }

  return (
    <div className="relative max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for products..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
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

      {/* Search Suggestions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card className="bg-card border-border shadow-lg">
              <CardContent className="p-4">
                {recentSearches.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Recent Searches
                    </h4>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setLocalQuery(search)
                            handleSearch(search)
                          }}
                          className="block w-full text-left px-2 py-1 text-sm text-foreground hover:bg-muted rounded transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </h4>
                  <div className="space-y-1">
                    {trendingSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setLocalQuery(search)
                          handleSearch(search)
                        }}
                        className="block w-full text-left px-2 py-1 text-sm text-foreground hover:bg-muted rounded transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close suggestions */}
      {showSuggestions && <div className="fixed inset-0 z-40" onClick={() => setShowSuggestions(false)} />}
    </div>
  )
}
