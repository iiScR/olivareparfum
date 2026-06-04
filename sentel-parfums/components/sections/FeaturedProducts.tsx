'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/ui/ProductCard'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { useProducts } from '@/hooks/useSupabase'
import type { Product } from '@/types'

const mockProducts: Product[] = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    name: 'Fruits Rouges',
    brand_inspiration: 'Tom Ford',
    description: 'Un santal crémeux et fumé, enveloppant comme une étole de cachemire.',
    price: 89,
    sizes: [{ size: '10ml', price: 45 }, { size: '50ml', price: 89 }, { size: '100ml', price: 149 }],
    stock: 50,
    top_notes: ['Cardamome', 'Gingembre', 'Bergamote'],
    heart_notes: ['Santal', 'Iris', 'Cèdre'],
    base_notes: ['Ambre', 'Vanille', 'Musc'],
    longevity_hours: 10,
    scent_family: 'Woody',
    images: ['/images/perfumes/perfume-1.png'],
    featured: true,
    category_id: null,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'a2222222-2222-2222-2222-222222222222',
    name: 'Agrumes Luxe',
    brand_inspiration: 'Chanel',
    description: 'Une rose damascène veloutée, moderne et intemporelle.',
    price: 79,
    sizes: [{ size: '10ml', price: 40 }, { size: '50ml', price: 79 }, { size: '100ml', price: 135 }],
    stock: 35,
    top_notes: ['Rose', 'Pivoine', 'Fruit de la passion'],
    heart_notes: ['Rose Turque', 'Patchouli', 'Litchi'],
    base_notes: ['Musc blanc', 'Cèdre', 'Ambre'],
    longevity_hours: 8,
    scent_family: 'Floral',
    images: ['/images/perfumes/perfume-2.png'],
    featured: true,
    category_id: null,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'a3333333-3333-3333-3333-333333333333',
    name: 'Coco Vanille',
    brand_inspiration: 'YSL',
    description: 'L\'oud dans toute sa splendeur : profond, boisé, légèrement fumé.',
    price: 99,
    sizes: [{ size: '10ml', price: 50 }, { size: '50ml', price: 99 }, { size: '100ml', price: 169 }],
    stock: 25,
    top_notes: ['Oud', 'Safran', 'Poivre rose'],
    heart_notes: ['Oud Laotien', 'Roses', 'Encens'],
    base_notes: ['Cuir', 'Ambre gris', 'Musc'],
    longevity_hours: 12,
    scent_family: 'Oriental',
    images: ['/images/perfumes/perfume-3.png'],
    featured: true,
    category_id: null,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'a4444444-4444-4444-4444-444444444444',
    name: 'Sucré',
    brand_inspiration: 'Louis Vuitton',
    description: 'Un éclat citrus frais et sophistiqué, comme une matinée méditerranéenne.',
    price: 69,
    sizes: [{ size: '10ml', price: 35 }, { size: '50ml', price: 69 }, { size: '100ml', price: 119 }],
    stock: 60,
    top_notes: ['Bergamote', 'Citron', 'Mandarine'],
    heart_notes: ['Néroli', 'Fleur d\'oranger', 'Gingembre'],
    base_notes: ['Bois de cèdre', 'Musc', 'Ambre'],
    longevity_hours: 6,
    scent_family: 'Fresh',
    images: ['/images/perfumes/perfume-4.png'],
    featured: false,
    category_id: null,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'a5555555-5555-5555-5555-555555555555',
    name: 'Vanille Royale',
    brand_inspiration: 'Kayali',
    description: 'Une vanille gourmande et enveloppante, parfaite pour les soirées.',
    price: 75,
    sizes: [{ size: '10ml', price: 38 }, { size: '50ml', price: 75 }, { size: '100ml', price: 129 }],
    stock: 40,
    top_notes: ['Vanille', 'Fleur d\'oranger', 'Musc'],
    heart_notes: ['Vanille de Madagascar', 'Patchouli', 'Jasmin'],
    base_notes: ['Benzoin', 'Tonka', 'Santal'],
    longevity_hours: 9,
    scent_family: 'Gourmand',
    images: ['/images/perfumes/perfume-5.png'],
    featured: true,
    category_id: null,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'a6666666-6666-6666-6666-666666666666',
    name: 'Ambre Doré',
    brand_inspiration: 'Prada',
    description: 'Un iris poudré et métallique, d\'une élégance discrète.',
    price: 85,
    sizes: [{ size: '10ml', price: 42 }, { size: '50ml', price: 85 }, { size: '100ml', price: 145 }],
    stock: 30,
    top_notes: ['Iris', 'Néroli', 'Mandarine'],
    heart_notes: ['Iris Pallida', 'Cèdre', 'Vétiver'],
    base_notes: ['Benzoin', 'Ambre', 'Musc'],
    longevity_hours: 8,
    scent_family: 'Floral',
    images: ['/images/perfumes/perfume-6.png'],
    featured: false,
    category_id: null,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'a7777777-7777-7777-7777-777777777777',
    name: 'Oud Impérial',
    brand_inspiration: 'Tom Ford',
    description: 'Un boisé profond et envoûtant, entre mystère et sophistication.',
    price: 95,
    sizes: [{ size: '10ml', price: 48 }, { size: '50ml', price: 95 }, { size: '100ml', price: 159 }],
    stock: 20,
    top_notes: ['Bois de oud', 'Poivre noir', 'Inencens'],
    heart_notes: ['Cèdre', 'Patchouli', 'Vétiver'],
    base_notes: ['Bois de santal', 'Ambre', 'Musc'],
    longevity_hours: 11,
    scent_family: 'Woody',
    images: ['/images/perfumes/perfume-7.png'],
    featured: false,
    category_id: null,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'a8888888-8888-8888-8888-888888888888',
    name: 'Rose Élixir',
    brand_inspiration: 'Chanel',
    description: 'Un bouquet floral frais et lumineux, comme une promenade au printemps.',
    price: 72,
    sizes: [{ size: '10ml', price: 36 }, { size: '50ml', price: 72 }, { size: '100ml', price: 125 }],
    stock: 45,
    top_notes: ['Fleur d\'oranger', 'Bergamote', 'Pêche'],
    heart_notes: ['Jasmin', 'Tubéreuse', 'Rose'],
    base_notes: ['Santal', 'Musc', 'Cèdre'],
    longevity_hours: 7,
    scent_family: 'Floral',
    images: ['/images/perfumes/perfume-8.png'],
    featured: false,
    category_id: null,
    created_at: '',
    updated_at: '',
  },
]

export function FeaturedProducts() {
  const { products: dbProducts, loading } = useProducts({ featured: true })
  const displayProducts = dbProducts.length > 0 ? dbProducts : mockProducts

  return (
    <section className="section-padding py-20 lg:py-28">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-medium mb-2 block">
              Nos best-sellers
            </span>
            <h2 className="heading-lg">Parfums en vedette</h2>
          </div>
          <Link
            href="/products"
            className="group flex items-center gap-2 text-sm text-primary hover:text-primary-hover transition-colors"
          >
            Voir tous les parfums
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>

        {loading && dbProducts.length === 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-xl bg-surface border border-border animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {displayProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
