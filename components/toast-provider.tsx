"use client"

import { useEffect } from "react"
import { Toaster, useToast } from "@/components/ui/toast"

export function ToastProvider() {
  const { toast } = useToast()

  useEffect(() => {
    const handleToast = (event: CustomEvent) => {
      const { title, description, type } = event.detail
      toast({ title, description, type })
    }

    window.addEventListener("show-toast", handleToast as EventListener)
    return () => window.removeEventListener("show-toast", handleToast as EventListener)
  }, [toast])

  return <Toaster />
}
