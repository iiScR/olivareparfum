'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, Check, ArrowRight, Gift } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { GlowCard } from '@/components/ui/GlowCard'
import type { Product } from '@/types'

const bundleProducts: Product[] = [
  {
    id: '1',
    name: 'Fruits Rouges',
    brand_inspiration: 'Tom Ford',
    description: '',
    price: 89,
    sizes: [{ size: '10ml', price: 45 }],
    stock: 50,
    top_notes: [],
    heart_notes: [],
    base_notes: [],
    longevity_hours: 10,
    scent_family: 'Woody',
    images: [],
    featured: false,
    category_id: null,
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    name: 'Agrumes Luxe',
    brand_inspiration: 'Chanel',
    description: '',
    price: 79,
    sizes: [{ size: '10ml', price: 40 }],
    stock: 35,
    top_notes: [],
    heart_notes: [],
    base_notes: [],
    longevity_hours: 8,
    scent_family: 'Floral',
    images: [],
    featured: false,
    category_id: null,
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    name: 'Coco Vanille'
    brand_inspiration: 'YSL',
    description: '',
    price: 99,
    sizes: [{ size: '10ml', price: 50 }],
    stock: 25,
    top_notes: [],
    heart_notes: [],
    base_notes: [],
    longevity_hours: 12,
    scent_family: 'Oriental',
    images: [],
    featured: false,
    category_id: null,
    created_at: '',
    updated_at: '',
  },
  {
    id: '4',
    name: 'Sucré',
    brand_inspiration: 'Louis Vuitton',
    description: '',
    price: 69,
    sizes: [{ size: '10ml', price: 35 }],
    stock: 60,
    top_notes: [],
    heart_notes: [],
    base_notes: [],
    longevity_hours: 6,
    scent_family: 'Fresh',
    images: [],
    featured: false,
    category_id: null,
    created_at: '',
    updated_at: '',
  },
]

export function BundlePromo() {
  const [selected, setSelected] = useState<string[]>([])
  const toggleSelection = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id))
    } else if (selected.length < 3) {
      setSelected([...selected, id])
    }
  }

  const progress = (selected.length / 3) * 100

  return (
    <section className="section-padding py-20 lg:py-28 bg-surface/30 border-y border-border">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium uppercase tracking-widest mb-6">
            <Gift className="w-3.5 h-3.5" />
            Offre exclusive
          </div>
          <h2 className="heading-lg mb-4">3 parfums au choix — 200 MAD</h2>
          <p className="body-lg max-w-xl mx-auto">
            Composez votre propre coffret. Choisissez 3 flacons de 10ml parmi nos best-sellers 
            et économisez jusqu&apos;à 40%.
          </p>
        </AnimatedSection>

        {/* Progress */}
        <AnimatedSection delay={0.1} className="mb-10">
          <div className="bg-surface-elevated rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">
                {selected.length}/3 parfums sélectionnés
              </span>
              <span className="text-sm text-primary font-bold">
                {selected.length === 3 ? 'Offre complète !' : `${3 - selected.length} restant${3 - selected.length > 1 ? 's' : ''}`}
              </span>
            </div>
            <div className="h-2 bg-background rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary-hover rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {bundleProducts.map((product, i) => {
            const isSelected = selected.includes(product.id)
            const isDisabled = !isSelected && selected.length >= 3

            return (
              <motion.button
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => toggleSelection(product.id)}
                disabled={isDisabled}
                className={`relative p-4 rounded-xl border transition-all duration-300 text-left ${
                  isSelected
                    ? 'border-primary bg-primary/10 shadow-glow'
                    : isDisabled
                    ? 'border-border/50 bg-surface/50 opacity-50 cursor-not-allowed'
                    : 'border-border bg-surface hover:border-primary/30 hover:shadow-glow'
                }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-background" />
                  </motion.div>
                )}
                <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center mb-3">
                  <Package className="w-5 h-5 text-text-muted" />
                </div>
                <h3 className="font-display font-semibold text-sm mb-0.5">{product.name}</h3>
                <p className="text-xs text-primary">Inspiré par {product.brand_inspiration}</p>
              </motion.button>
            )
          })}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.2} className="text-center">
          <Link
            href="/bundle"
            className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all ${
              selected.length === 3
                ? 'btn-primary'
                : 'bg-surface-elevated text-text-muted border border-border cursor-not-allowed'
            }`}
            onClick={(e) => selected.length !== 3 && e.preventDefault()}
          >
            {selected.length === 3 ? 'Ajouter le coffret au panier' : 'Sélectionnez 3 parfums'}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-text-muted mt-4">
            Livraison gratuite incluse avec cette offre
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
