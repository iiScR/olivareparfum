'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Clock, Wind, ArrowLeft, Check } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AddToCartButton } from '@/components/ui/AddToCartButton'
import { ProductCard } from '@/components/ui/ProductCard'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

// Mock product for demo
const product: Product = {
  id: 'a1111111-1111-1111-1111-111111111111',
  name: 'Santal Noir',
  brand_inspiration: 'Tom Ford',
  description: 'Un santal crémeux et fumé qui évoque le luxe intemporel. Cette création s\'ouvre sur des notes épicées de cardamome et de gingembre, avant de révéler un cœur de santal précieux enveloppé d\'iris et de cèdre. Le fond chaud d\'ambre, de vanille et de musc laisse une empreinte sensuelle et durable.',
  price: 89,
  sizes: [
    { size: '10ml', price: 45 },
    { size: '50ml', price: 89 },
    { size: '100ml', price: 149 },
  ],
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
}

const relatedProducts: Product[] = [
  {
    id: 'a7777777-7777-7777-7777-777777777777', name: 'Bois Mystique', brand_inspiration: 'Tom Ford', description: '',
    price: 95, sizes: [{ size: '10ml', price: 48 }, { size: '50ml', price: 95 }, { size: '100ml', price: 159 }],
    stock: 20, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 11, scent_family: 'Woody',
    images: ['/images/perfumes/perfume-2.png'], featured: false, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: 'a3333333-3333-3333-3333-333333333333', name: 'Oud Impérial', brand_inspiration: 'YSL', description: '',
    price: 99, sizes: [{ size: '10ml', price: 50 }, { size: '50ml', price: 99 }, { size: '100ml', price: 169 }],
    stock: 25, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 12, scent_family: 'Oriental',
    images: ['/images/perfumes/perfume-4.png'], featured: true, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: 'a5555555-5555-5555-5555-555555555555', name: 'Vanille Nuit', brand_inspiration: 'Kayali', description: '',
    price: 75, sizes: [{ size: '10ml', price: 38 }, { size: '50ml', price: 75 }, { size: '100ml', price: 129 }],
    stock: 40, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 9, scent_family: 'Gourmand',
    images: [], featured: true, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: 'a4444444-4444-4444-4444-444444444444', name: 'Citrus Doré', brand_inspiration: 'Louis Vuitton', description: '',
    price: 69, sizes: [{ size: '10ml', price: 35 }, { size: '50ml', price: 69 }, { size: '100ml', price: 119 }],
    stock: 60, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 6, scent_family: 'Fresh',
    images: ['/images/perfumes/perfume-8.png'], featured: false, category_id: null, created_at: '', updated_at: '',
  },
]

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)

  const currentPrice = product.sizes[1].price

  return (
    <div className="pt-20 lg:pt-24">
      <div className="section-padding py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Back link */}
          <AnimatedSection>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux parfums
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Images */}
            <AnimatedSection>
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface border border-border">
                  {product.images[selectedImage] ? (
                    <Image
                      src={product.images[selectedImage]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted">
                      <div className="text-center">
                        <div className="w-24 h-24 rounded-full border-2 border-dashed border-border mx-auto mb-4 flex items-center justify-center">
                          <span className="font-display text-2xl text-text-muted">{product.name[0]}</span>
                        </div>
                        <p className="text-sm">Image du produit</p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Thumbnails */}
                <div className="flex gap-3">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? 'border-primary' : 'border-border hover:border-text-secondary'
                      }`}
                    >
                      <div className="w-full h-full bg-surface-elevated flex items-center justify-center text-xs text-text-muted">
                        {i + 1}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Info */}
            <div className="space-y-6">
              <AnimatedSection delay={0.1}>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                  Inspiré par {product.brand_inspiration}
                </span>
                <h1 className="heading-lg mb-2">{product.name}</h1>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-text-secondary">4.9 (128 avis)</span>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-display text-3xl font-bold">{formatPrice(currentPrice)}</span>
                  <span className="text-text-muted line-through text-sm">
                    {formatPrice(Math.round(currentPrice * 5))}
                  </span>
                  <span className="text-xs bg-secondary/20 text-red-300 px-2 py-0.5 rounded">
                    -80%
                  </span>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <p className="body-base mb-6">{product.description}</p>
              </AnimatedSection>

              {/* Add to cart */}
              <AnimatedSection delay={0.25}>
                <AddToCartButton
                  product={product}
                  showSizeSelector={true}
                  fullWidth={true}
                />
              </AnimatedSection>

              {/* Features */}
              <AnimatedSection delay={0.3}>
                <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.longevity_hours} heures</p>
                      <p className="text-xs text-text-muted">Tenue</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Wind className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Modérée</p>
                      <p className="text-xs text-text-muted">Projection</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Scent pyramid */}
              <AnimatedSection delay={0.35}>
                <h3 className="font-display font-semibold text-lg mb-4">Pyramide olfactive</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Notes de tête', notes: product.top_notes, color: 'bg-primary/20' },
                    { label: 'Notes de cœur', notes: product.heart_notes, color: 'bg-primary/30' },
                    { label: 'Notes de fond', notes: product.base_notes, color: 'bg-primary/40' },
                  ].map((layer) => (
                    <div key={layer.label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{layer.label}</span>
                        <div className={`h-1.5 w-24 rounded-full ${layer.color}`} />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {layer.notes.map((note) => (
                          <span
                            key={note}
                            className="px-3 py-1 bg-surface-elevated border border-border rounded-full text-xs text-text-secondary"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Why customers love */}
              <AnimatedSection delay={0.4}>
                <div className="bg-surface-elevated rounded-xl p-6 border border-border">
                  <h3 className="font-display font-semibold text-lg mb-4">
                    Pourquoi nos clients l&apos;adorent
                  </h3>
                  <ul className="space-y-3">
                    {[
                      '93% de similarité avec l\'original',
                      '1/5 du prix du parfum original',
                      'Tenue de 10+ heures sur la peau',
                      'Fabriqué avec des ingrédients de qualité premium',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Related products */}
          <AnimatedSection className="mt-20">
            <h2 className="heading-md mb-8">Vous aimerez aussi</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
