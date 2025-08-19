import { Card, CardContent } from "@/components/ui/card"

export function ProductCardSkeleton() {
  return (
    <Card className="bg-card border-border">
      <div className="aspect-square bg-muted animate-pulse" />
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="h-4 bg-muted animate-pulse rounded" />
          <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
          <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          <div className="flex items-center justify-between">
            <div className="h-6 bg-muted animate-pulse rounded w-16" />
            <div className="h-8 bg-muted animate-pulse rounded w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

}
