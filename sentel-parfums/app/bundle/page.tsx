'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, Check, ArrowRight, Gift, Truck } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { useCartStore } from '@/lib/store'
import { toast } from '@/components/ui/Toaster'
import type { Product } from '@/types'

const bundleProducts: Product[] = [
  {
    id: '1', name: 'Fruits Rouges', brand_inspiration: 'Tom Ford', description: 'Santal crémeux et fumé',
    price: 89, sizes: [{ size: '10ml', price: 0 }],
    stock: 50, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 10, scent_family: 'Woody',
    images: ['/images/perfumes/perfume-1.png'], featured: false, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: '2', name: 'Agrumes Luxe', brand_inspiration: 'Chanel', description: 'Rose damascène veloutée',
    price: 79, sizes: [{ size: '10ml', price: 0 }],
    stock: 35, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 8, scent_family: 'Floral',
    images: ['/images/perfumes/perfume-2.png'], featured: false, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: '3', name: 'Coco Vanille', brand_inspiration: 'YSL', description: 'Oud profond et boisé',
    price: 99, sizes: [{ size: '10ml', price: 0 }],
    stock: 25, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 12, scent_family: 'Oriental',
    images: ['/images/perfumes/perfume-3.png'], featured: false, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: '4', name: 'Sucré', brand_inspiration: 'Louis Vuitton', description: 'Éclat citrus frais',
    price: 69, sizes: [{ size: '10ml', price: 0 }],
    stock: 60, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 6, scent_family: 'Fresh',
    images: ['/images/perfumes/perfume-4.png'], featured: false, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: '5', name: 'Vanille Royale', brand_inspiration: 'Kayali', description: 'Vanille gourmande',
    price: 75, sizes: [{ size: '10ml', price: 0 }],
    stock: 40, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 9, scent_family: 'Gourmand',
    images: ['/images/perfumes/perfume-5.png'], featured: false, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: '6', name: 'Ambre Doré', brand_inspiration: 'Prada', description: 'Iris poudré élégant',
    price: 85, sizes: [{ size: '10ml', price: 0 }],
    stock: 30, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 8, scent_family: 'Floral',
    images: ['/images/perfumes/perfume-6.png'], featured: false, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: '7', name: 'Oud Impérial', brand_inspiration: 'Tom Ford', description: 'Boisé mystérieux',
    price: 95, sizes: [{ size: '10ml', price: 0 }],
    stock: 20, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 11, scent_family: 'Woody',
    images: ['/images/perfumes/perfume-7.png'], featured: false, category_id: null, created_at: '', updated_at: '',
  },
  {
    id: '8', name: 'Rose Élixir', brand_inspiration: 'Chanel', description: 'Jardin fleuri',
    price: 72, sizes: [{ size: '10ml', price: 0 }],
    stock: 45, top_notes: [], heart_notes: [], base_notes: [], longevity_hours: 7, scent_family: 'Floral',
    images: ['/images/perfumes/perfume-8.png'], featured: false, category_id: null, created_at: '', updated_at: '',
  },
]

const BUNDLE_PRICE = 200
const BUNDLE_SIZE = '10ml'

export default function BundlePage() {
  const [selected, setSelected] = useState<string[]>([])
  const { addToCart, setCartOpen } = useCartStore()

  const toggleSelection = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id))
    } else if (selected.length < 3) {
      setSelected([...selected, id])
    }
  }

  const progress = (selected.length / 3) * 100
  const isComplete = selected.length === 3

  const handleAddBundle = () => {
    if (!isComplete) return

    // Create a bundle product
    const bundleProduct: Product = {
      id: `bundle_${Date.now()}`,
      name: 'Coffret 3 Parfums',
      brand_inspiration: 'Bundle',
      description: `Coffret contenant : ${selectedProducts.map((p) => p.name).join(', ')}`,
      price: BUNDLE_PRICE,
      sizes: [{ size: BUNDLE_SIZE, price: BUNDLE_PRICE }],
      stock: 1,
      top_notes: [],
      heart_notes: [],
      base_notes: [],
      longevity_hours: 0,
      scent_family: '',
      images: [],
      featured: false,
      category_id: null,
      created_at: '',
      updated_at: '',
    }

    addToCart(bundleProduct, BUNDLE_SIZE, 1)
    toast('Coffret ajouté au panier !', 'success')
    setCartOpen(true)
  }

  const selectedProducts = bundleProducts.filter((p) => selected.includes(p.id))

  return (
    <div className="pt-20 lg:pt-24">
      <div className="section-padding py-12 lg:py-16">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium uppercase tracking-widest mb-6">
              <Gift className="w-3.5 h-3.5" />
              Offre spéciale
            </div>
            <h1 className="heading-lg mb-4">Composez votre coffret</h1>
            <p className="body-lg max-w-xl mx-auto">
              Choisissez 3 parfums de 10ml pour seulement 200 MAD. 
              Livraison gratuite incluse.
            </p>
          </AnimatedSection>

          {/* Progress bar */}
          <AnimatedSection delay={0.1} className="mb-10">
            <div className="bg-surface rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">
                  {selected.length}/3 parfums sélectionnés
                </span>
                <span className="text-sm text-primary font-bold">
                  {isComplete ? 'Coffret complet !' : `${3 - selected.length} restant${3 - selected.length > 1 ? 's' : ''}`}
                </span>
              </div>
              <div className="h-3 bg-background rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary-hover rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: 'spring', stiffness: 100 }}
                />
              </div>

              {/* Selected preview */}
              {selectedProducts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-border"
                >
                  <p className="text-xs text-text-muted mb-2">Votre sélection :</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProducts.map((p) => (
                      <span
                        key={p.id}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {p.name}
                        <button
                          onClick={() => toggleSelection(p.id)}
                          className="hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </AnimatedSection>

          {/* Product grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {bundleProducts.map((product, i) => {
              const isSelected = selected.includes(product.id)
              const isDisabled = !isSelected && selected.length >= 3

              return (
                <motion.button
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => toggleSelection(product.id)}
                  disabled={isDisabled}
                  className={`relative p-5 rounded-xl border transition-all duration-300 text-left ${
                    isSelected
                      ? 'border-primary bg-primary/10 shadow-glow'
                      : isDisabled
                      ? 'border-border/50 bg-surface/50 opacity-40 cursor-not-allowed'
                      : 'border-border bg-surface hover:border-primary/30 hover:shadow-glow'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                    >
                      <Check className="w-3.5 h-3.5 text-background" />
                    </motion.div>
                  )}
                  <div className="w-12 h-12 rounded-lg bg-background border border-border flex items-center justify-center mb-3">
                    <Package className="w-6 h-6 text-text-muted" />
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-1">{product.name}</h3>
                  <p className="text-xs text-primary mb-1">Inspiré par {product.brand_inspiration}</p>
                  <p className="text-xs text-text-muted">{product.scent_family}</p>
                </motion.button>
              )
            })}
          </div>

          {/* CTA */}
          <AnimatedSection delay={0.2} className="text-center">
            <div className="bg-surface rounded-xl p-8 border border-border">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-sm text-primary font-medium">Livraison gratuite incluse</span>
              </div>
              <button
                onClick={handleAddBundle}
                disabled={!isComplete}
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all ${
                  isComplete
                    ? 'btn-primary text-base'
                    : 'bg-surface-elevated text-text-muted border border-border cursor-not-allowed'
                }`}
              >
                {isComplete ? (
                  <>
                    Ajouter le coffret — 200 MAD
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  'Sélectionnez 3 parfums'
                )}
              </button>
              <p className="text-xs text-text-muted mt-4">
                Économisez jusqu&apos;à 40% par rapport à l&apos;achat individuel
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
