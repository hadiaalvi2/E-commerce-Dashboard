"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Toast {
  id: string
  title: string
  description?: string
  type: "success" | "error" | "info" | "warning"
  duration?: number
}

interface ToastStore {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

const toastStore: ToastStore = {
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
}

const listeners: Array<() => void> = []

const emitChange = () => {
  listeners.forEach((listener) => listener())
}

toastStore.addToast = (toast) => {
  const id = Math.random().toString(36).substr(2, 9)
  toastStore.toasts.push({ ...toast, id })
  emitChange()

  // Auto remove after duration
  setTimeout(() => {
    toastStore.removeToast(id)
  }, toast.duration || 3000)
}

toastStore.removeToast = (id) => {
  toastStore.toasts = toastStore.toasts.filter((toast) => toast.id !== id)
  emitChange()
}

export const useToast = () => {
  const [toasts, setToasts] = React.useState(toastStore.toasts)

  React.useEffect(() => {
    const listener = () => setToasts([...toastStore.toasts])
    listeners.push(listener)
    return () => {
      const index = listeners.indexOf(listener)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [])

  return {
    toasts,
    toast: toastStore.addToast,
    dismiss: toastStore.removeToast,
  }
}

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out",
            "bg-gray-900 border-gray-700 text-white",
            {
              "border-green-500": toast.type === "success",
              "border-red-500": toast.type === "error",
              "border-blue-500": toast.type === "info",
              "border-yellow-500": toast.type === "warning",
            },
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="font-semibold text-sm">{toast.title}</div>
              {toast.description && <div className="text-sm text-gray-300 mt-1">{toast.description}</div>}
            </div>
            <button onClick={() => dismiss(toast.id)} className="text-gray-400 hover:text-white transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
