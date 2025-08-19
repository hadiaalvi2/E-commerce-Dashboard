import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem, Product } from "./api"

interface NotificationStore {
  message: string
  type: "success" | "info" | "warning"
  show: boolean
  showNotification: (message: string, type?: "success" | "info" | "warning") => void
  hideNotification: () => void
}

export const useNotificationStore = create<NotificationStore>()((set) => ({
  message: "",
  type: "success",
  show: false,
  showNotification: (message, type = "success") => {
    set({ message, type, show: true })
  },
  hideNotification: () => {
    set({ show: false })
  },
}))

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  isInWishlist: (productId: number) => boolean
}

interface CompareStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  clearCompare: () => void
  isInCompare: (productId: number) => boolean
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)
          if (existingItem) {
            useNotificationStore.getState().showNotification("ADDED TO CART", "success")
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          }
          useNotificationStore.getState().showNotification("ADDED TO CART", "success")
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          }
        })
      },
      removeItem: (productId) => {
        const product = get().items.find((item) => item.id === productId)
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
        if (product) {
          useNotificationStore.getState().showNotification("REMOVED FROM CART", "info")
        }
      },
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        })),
      clearCart: () => {
        set({ items: [] })
        useNotificationStore.getState().showNotification("CART CLEARED", "info")
      },
      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },
      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          if (state.items.find((item) => item.id === product.id)) {
            useNotificationStore.getState().showNotification("ALREADY IN WISHLIST", "info")
            return state
          }
          useNotificationStore.getState().showNotification("ADDED TO WISHLIST", "success")
          return { items: [...state.items, product] }
        })
      },
      removeItem: (productId) => {
        const product = get().items.find((item) => item.id === productId)
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
        if (product) {
          useNotificationStore.getState().showNotification("REMOVED FROM WISHLIST", "info")
        }
      },
      isInWishlist: (productId) => {
        const { items } = get()
        return items.some((item) => item.id === productId)
      },
    }),
    {
      name: "wishlist-storage",
    },
  ),
)

export const useCompareStore = create<CompareStore>()((set, get) => ({
  items: [],
  addItem: (product) => {
    set((state) => {
      if (state.items.length >= 4) {
        useNotificationStore.getState().showNotification("COMPARE LIMIT REACHED", "warning")
        return state
      }
      if (state.items.find((item) => item.id === product.id)) {
        useNotificationStore.getState().showNotification("ALREADY IN COMPARE", "info")
        return state
      }
      useNotificationStore.getState().showNotification("ADDED TO COMPARE", "success")
      return { items: [...state.items, product] }
    })
  },
  removeItem: (productId) => {
    const product = get().items.find((item) => item.id === productId)
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }))
    if (product) {
      useNotificationStore.getState().showNotification("REMOVED FROM COMPARE", "info")
    }
  },
  clearCompare: () => {
    set({ items: [] })
    useNotificationStore.getState().showNotification("COMPARE CLEARED", "info")
  },
  isInCompare: (productId) => {
    const { items } = get()
    return items.some((item) => item.id === productId)
  },
}))
