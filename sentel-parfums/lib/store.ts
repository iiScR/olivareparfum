import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product, BundleSelection } from '@/types'

interface CartState {
  items: CartItem[]
  bundleSelections: BundleSelection[]
  isCartOpen: boolean
  isLoading: boolean
  
  // Cart actions
  setItems: (items: CartItem[]) => void
  addToCart: (product: Product, size: string, quantity?: number) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
  
  // Bundle actions
  toggleBundleSelection: (productId: string, size: string) => void
  clearBundleSelections: () => void
  getBundleCount: () => number
  
  // Computed
  getCartTotal: () => number
  getCartCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      bundleSelections: [],
      isCartOpen: false,
      isLoading: false,

      setItems: (items) => set({ items }),

      addToCart: (product, size, quantity = 1) => {
        const { items } = get()
        const existingItem = items.find(
          (item) => item.product_id === product.id && item.size === size
        )

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          })
        } else {
          const newItem: CartItem = {
            id: `temp_${Date.now()}`,
            cart_id: '',
            product_id: product.id,
            product,
            quantity,
            size,
            created_at: new Date().toISOString(),
          }
          set({ items: [...items, newItem] })
        }
        set({ isCartOpen: true })
      },

      removeFromCart: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) })
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId)
          return
        }
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      setCartOpen: (open) => set({ isCartOpen: open }),

      toggleBundleSelection: (productId, size) => {
        const { bundleSelections } = get()
        const exists = bundleSelections.find(
          (s) => s.productId === productId && s.size === size
        )

        if (exists) {
          set({
            bundleSelections: bundleSelections.filter(
              (s) => !(s.productId === productId && s.size === size)
            ),
          })
        } else if (bundleSelections.length < 3) {
          set({
            bundleSelections: [...bundleSelections, { productId, size }],
          })
        }
      },

      clearBundleSelections: () => set({ bundleSelections: [] }),

      getBundleCount: () => get().bundleSelections.length,

      getCartTotal: () => {
        return get().items.reduce((total, item) => {
          const sizePrice =
            item.product.sizes.find((s) => s.size === item.size)?.price ||
            item.product.price
          return total + sizePrice * item.quantity
        }, 0)
      },

      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'izilparfums-cart',
      partialize: (state) => ({
        items: state.items,
        bundleSelections: state.bundleSelections,
      }),
    }
  )
)
