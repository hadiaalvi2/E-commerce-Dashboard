"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useProductFilters } from "@/hooks/use-product-filters"
import { getCategories } from "@/lib/api"
import { Filter, X } from "lucide-react"

export function FilterSidebar() {
  const { selectedCategories, priceRange, setSelectedCategories, setPriceRange, clearFilters } = useProductFilters()

  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  const formatCategoryName = (category: string) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const FilterContent = () => (
    <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3 text-foreground text-sm sm:text-base">Categories</h3>
        {loading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-5 sm:h-6 bg-muted animate-pulse rounded" />
            ))}
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  className="h-4 w-4 sm:h-5 sm:w-5"
                />
                <label
                  htmlFor={category}
                  className="text-xs sm:text-sm text-foreground cursor-pointer capitalize flex-1"
                >
                  {formatCategoryName(category)}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3 text-foreground text-sm sm:text-base">Price Range</h3>
        <div className="space-y-3 sm:space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={1000} min={0} step={10} className="w-full" />
          <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </CardContent>
  )

  return (
    <>
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000) && (
            <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0)}
            </span>
          )}
        </Button>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-card border-r border-border overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Filters</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <FilterContent />
          </div>
        </div>
      )}

      <Card className="bg-card border-border hidden lg:block">
        <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg">Filters</CardTitle>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs sm:text-sm">
              Clear All
            </Button>
          </div>
        </CardHeader>
        <FilterContent />
      </Card>
    </>
  )
}
