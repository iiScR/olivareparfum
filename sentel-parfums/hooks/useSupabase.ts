'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { Product, Category, CartItem, Review } from '@/types'

const supabase = typeof window !== 'undefined' ? createClient() : null

export function useProducts(options?: {
  featured?: boolean
  category?: string
  scentFamily?: string
  search?: string
  limit?: number
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Temporarily using mock data only — re-enable Supabase after updating DB records
    setLoading(false)
    return

    /*
    if (!supabase) {
      setLoading(false)
      return
    }
    async function fetchProducts() {
      try {
        let query = supabase.from('products').select('*')

        if (options?.featured) {
          query = query.eq('featured', true)
        }
        if (options?.category) {
          query = query.eq('category_id', options.category)
        }
        if (options?.scentFamily) {
          query = query.eq('scent_family', options.scentFamily)
        }
        if (options?.search) {
          query = query.ilike('name', `%${options.search}%`)
        }
        if (options?.limit) {
          query = query.limit(options.limit)
        }

        const { data, error } = await query.order('created_at', { ascending: false })

        if (error) throw error
        const normalized = (data || []).map((p: any) => ({
          ...p,
          sizes: Array.isArray(p.sizes) ? p.sizes : [],
          images: Array.isArray(p.images) ? p.images : [],
          top_notes: Array.isArray(p.top_notes) ? p.top_notes : [],
          heart_notes: Array.isArray(p.heart_notes) ? p.heart_notes : [],
          base_notes: Array.isArray(p.base_notes) ? p.base_notes : [],
          price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
        }))
        setProducts(normalized)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
    */
  }, [options?.featured, options?.category, options?.scentFamily, options?.search, options?.limit])

  return { products, loading, error }
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Temporarily using mock data only — re-enable Supabase after updating DB records
    setLoading(false)
    return

    /*
    if (!supabase) {
      setLoading(false)
      return
    }
    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        if (data) {
          setProduct({
            ...data,
            sizes: Array.isArray(data.sizes) ? data.sizes : [],
            images: Array.isArray(data.images) ? data.images : [],
            top_notes: Array.isArray(data.top_notes) ? data.top_notes : [],
            heart_notes: Array.isArray(data.heart_notes) ? data.heart_notes : [],
            base_notes: Array.isArray(data.base_notes) ? data.base_notes : [],
            price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
          })
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProduct()
    */
  }, [id])

  return { product, loading, error }
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    async function fetchCategories() {
      const { data, error } = await supabase.from('categories').select('*').order('name')
      if (error) {
        setCategories([])
      } else {
        setCategories(data || [])
      }
      setLoading(false)
    }

    fetchCategories()
  }, [])

  return { categories, loading }
}

export function useReviews(productId?: string) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    async function fetchReviews() {
      let query = supabase.from('reviews').select('*')
      if (productId) {
        query = query.eq('product_id', productId)
      }
      const { data, error } = await query.order('created_at', { ascending: false })
      if (error) {
        setReviews([])
      } else {
        setReviews(data || [])
      }
      setLoading(false)
    }

    fetchReviews()
  }, [productId])

  return { reviews, loading }
}

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    supabase.auth.getUser().then(({ data: { user } }: { data: { user: any } }) => {
      setUser(user)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return { user, loading, supabase }
}

export function useOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    async function fetchOrders() {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('[useOrders] Error:', error)
        setOrders([])
      } else {
        setOrders(data || [])
      }
      setLoading(false)
    }

    fetchOrders()
  }, [])

  return { orders, loading }
}

export async function createOrder(orderData: {
  total: number
  payment_method: string
  shipping_address: object
  items: Array<{
    product_id: string
    quantity: number
    size: string
    price_at_time: number
  }>
}) {
  if (!supabase) {
    throw new Error('Supabase not configured')
  }

  // Insert order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      total: orderData.total,
      payment_method: orderData.payment_method,
      shipping_address: orderData.shipping_address,
    })
    .select()
    .single()

  if (orderError || !order) {
    throw new Error(orderError?.message || 'Failed to create order')
  }

  // Insert order items
  const orderItems = orderData.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    size: item.size,
    price_at_time: item.price_at_time,
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems)

  if (itemsError) {
    throw new Error(itemsError.message)
  }

  return order
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    async function fetchCart() {
      const { data: carts, error: cartError } = await supabase.from('carts').select('*').limit(1)
      
      if (cartError || !carts || carts.length === 0) {
        setCartItems([])
        setLoading(false)
        return
      }

      const { data: items, error: itemsError } = await supabase
        .from('cart_items')
        .select('*, product:products(*)')
        .eq('cart_id', carts[0].id)
      
      if (itemsError) {
        setCartItems([])
      } else {
        setCartItems(items || [])
      }
      setLoading(false)
    }

    fetchCart()
  }, [])

  return { cartItems, loading }
}
