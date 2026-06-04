'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { ProductCard } from '@/components/ui/ProductCard'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { useProducts } from '@/hooks/useSupabase'
import { scentFamilies, formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

// Mock data for demo
const allProducts: Product[] = [
  {
    id: 'a1111111-1111-1111-1111-111111111111', name: 'Santal Noir', brand_inspiration: 'Tom Ford', description: '',
    price: 89, sizes: [{ size: '10ml', price: 45 }, { size: '50ml', price: 89 }, { size: '100ml', price: 149 }],
    stock: 50, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 10, scent_family: 'Woody',
    images: ['/images/perfumes/perfume-1.png'], featured: true, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: 'a2222222-2222-2222-2222-222222222222', name: 'Rose Velours', brand_inspiration: 'Chanel', description: '',
    price: 79, sizes: [{ size: '10ml', price: 40 }, { size: '50ml', price: 79 }, { size: '100ml', price: 135 }],
    stock: 35, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 8, scent_family: 'Floral',
    images: ['/images/perfumes/perfume-3.png'], featured: true, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: 'a3333333-3333-3333-3333-333333333333', name: 'Oud Impérial', brand_inspiration: 'YSL', description: '',
    price: 99, sizes: [{ size: '10ml', price: 50 }, { size: '50ml', price: 99 }, { size: '100ml', price: 169 }],
    stock: 25, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 12, scent_family: 'Oriental',
    images: ['/images/perfumes/perfume-4.png'], featured: true, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: 'a4444444-4444-4444-4444-444444444444', name: 'Citrus Doré', brand_inspiration: 'Louis Vuitton', description: '',
    price: 69, sizes: [{ size: '10ml', price: 35 }, { size: '50ml', price: 69 }, { size: '100ml', price: 119 }],
    stock: 60, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 6, scent_family: 'Fresh',
    images: ['/images/perfumes/perfume-8.png'], featured: false, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: 'a5555555-5555-5555-5555-555555555555', name: 'Vanille Nuit', brand_inspiration: 'Kayali', description: '',
    price: 75, sizes: [{ size: '10ml', price: 38 }, { size: '50ml', price: 75 }, { size: '100ml', price: 129 }],
    stock: 40, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 9, scent_family: 'Gourmand',
    images: ['/images/perfumes/perfume-5.png'], featured: true, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: 'a6666666-6666-6666-6666-666666666666', name: 'Iris Argent', brand_inspiration: 'Prada', description: '',
    price: 85, sizes: [{ size: '10ml', price: 42 }, { size: '50ml', price: 85 }, { size: '100ml', price: 145 }],
    stock: 30, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 8, scent_family: 'Floral',
    images: ['/images/perfumes/perfume-2.png'], featured: false, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: 'a7777777-7777-7777-7777-777777777777', name: 'Bois Mystique', brand_inspiration: 'Tom Ford', description: '',
    price: 95, sizes: [{ size: '10ml', price: 48 }, { size: '50ml', price: 95 }, { size: '100ml', price: 159 }],
    stock: 20, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 11, scent_family: 'Woody',
    images: [], featured: false, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: 'a8888888-8888-8888-8888-888888888888', name: 'Jardin Secret', brand_inspiration: 'Chanel', description: '',
    price: 72, sizes: [{ size: '10ml', price: 36 }, { size: '50ml', price: 72 }, { size: '100ml', price: 125 }],
    stock: 45, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 7, scent_family: 'Floral',
    images: ['/images/perfumes/perfume-7.png'], featured: false, category_id: null, created_at: '', updated_at: '',
  },
]

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popularity'

export default function ProductsPage() {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [scentFamily, setScentFamily] = useState<string>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [sortBy, setSortBy] = useState<SortOption>('popularity')
  const [searchQuery, setSearchQuery] = useState('')

  const { products: dbProducts, loading } = useProducts()
  const sourceProducts = dbProducts.length > 0 ? dbProducts : allProducts

  const filteredProducts = useMemo(() => {
    let result = [...sourceProducts]

    if (scentFamily) {
      result = result.filter((p) => p.scent_family === scentFamily)
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand_inspiration.toLowerCase().includes(q)
      )
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.reverse()
        break
      default:
        // popularity - featured first
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [scentFamily, priceRange, sortBy, searchQuery])

  const clearFilters = () => {
    setScentFamily('')
    setPriceRange([0, 200])
    setSearchQuery('')
  }

  const hasActiveFilters = scentFamily || priceRange[0] > 0 || priceRange[1] < 200 || searchQuery

  return (
    <div className="pt-20 lg:pt-24">
      <div className="section-padding py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <AnimatedSection className="mb-8">
            <h1 className="heading-lg mb-2">Nos Parfums</h1>
            <p className="body-base">
              {filteredProducts.length} parfum{filteredProducts.length !== 1 ? 's' : ''} disponible
              {filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </AnimatedSection>

          {/* Filter bar */}
          <AnimatedSection delay={0.1} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-3 flex-wrap">
                {/* Search */}
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-surface border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors w-48"
                />

                {/* Mobile filter toggle */}
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface text-sm hover:border-primary transition-colors sm:hidden"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filtres
                </button>

                {/* Desktop filters */}
                <div className="hidden sm:flex items-center gap-3">
                  <select
                    value={scentFamily}
                    onChange={(e) => setScentFamily(e.target.value)}
                    className="bg-surface border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="">Toutes les familles</option>
                    {scentFamilies.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>

                  <select
                    value={`${priceRange[0]}-${priceRange[1]}`}
                    onChange={(e) => {
                      const [min, max] = e.target.value.split('-').map(Number)
                      setPriceRange([min, max])
                    }}
                    className="bg-surface border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="0-200">Tous les prix</option>
                    <option value="0-50">Moins de 50 MAD</option>
                    <option value="50-100">50 - 100 MAD</option>
                    <option value="100-200">Plus de 100 MAD</option>
                  </select>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-xs text-primary hover:text-primary-hover transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Réinitialiser
                  </button>
                )}
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-surface border border-border rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="popularity">Popularité</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="newest">Nouveautés</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
              </div>
            </div>

            {/* Mobile filters */}
            {filtersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="sm:hidden mt-4 space-y-3 overflow-hidden"
              >
                <select
                  value={scentFamily}
                  onChange={(e) => setScentFamily(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-sm"
                >
                  <option value="">Toutes les familles</option>
                  {scentFamilies.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <select
                  value={`${priceRange[0]}-${priceRange[1]}`}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-').map(Number)
                    setPriceRange([min, max])
                  }}
                  className="w-full bg-surface border border-border rounded-lg px-4 py-2 text-sm"
                >
                  <option value="0-200">Tous les prix</option>
                  <option value="0-50">Moins de 50 MAD</option>
                  <option value="50-100">50 - 100 MAD</option>
                  <option value="100-200">Plus de 100 MAD</option>
                </select>
              </motion.div>
            )}
          </AnimatedSection>

          {/* Product grid */}
          {loading && sourceProducts === allProducts ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] rounded-xl bg-surface border border-border animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-text-muted mb-4">Aucun parfum ne correspond à vos critères</p>
              <button onClick={clearFilters} className="btn-outline text-sm">
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
