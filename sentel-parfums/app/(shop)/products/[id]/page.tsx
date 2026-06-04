'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Clock, Wind, ArrowLeft, Check } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { AddToCartButton } from '@/components/ui/AddToCartButton'
import { ProductCard } from '@/components/ui/ProductCard'
import { useProduct, useProducts } from '@/hooks/useSupabase'
import { formatPrice } from '@/lib/utils'

export default function ProductDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [selectedImage, setSelectedImage] = useState(0)

  const { product, loading, error } = useProduct(id)
  const { products: allProducts } = useProducts()

  // Related products: other products from DB, or empty if none
  const relatedProducts = allProducts
    .filter((p) => p.id !== id)
    .slice(0, 4)

  if (loading) {
    return (
      <div className="pt-20 lg:pt-24 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Chargement du produit...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="pt-20 lg:pt-24 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-md mb-4">Produit non trouvé</h1>
          <p className="text-text-secondary mb-6">
            {error || "Ce produit n'existe pas ou a été retiré."}
          </p>
          <Link href="/products" className="btn-primary">
            Voir tous les parfums
          </Link>
        </div>
      </div>
    )
  }

  const currentPrice = product.sizes[1]?.price || product.price

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
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? 'border-primary' : 'border-border hover:border-text-secondary'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
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
                <p className="body-base mb-6">
                  {product.description || 'Un parfum d\'exception, inspiré des plus grandes maisons de parfumerie.'}
                </p>
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
              {(product.top_notes.length > 0 || product.heart_notes.length > 0 || product.base_notes.length > 0) && (
                <AnimatedSection delay={0.35}>
                  <h3 className="font-display font-semibold text-lg mb-4">Pyramide olfactive</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Notes de tête', notes: product.top_notes, color: 'bg-primary/20' },
                      { label: 'Notes de cœur', notes: product.heart_notes, color: 'bg-primary/30' },
                      { label: 'Notes de fond', notes: product.base_notes, color: 'bg-primary/40' },
                    ]
                      .filter((layer) => layer.notes.length > 0)
                      .map((layer) => (
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
              )}

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
                      `Tenue de ${product.longevity_hours}+ heures sur la peau`,
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
          {relatedProducts.length > 0 && (
            <AnimatedSection className="mt-20">
              <h2 className="heading-md mb-8">Vous aimerez aussi</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {relatedProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </div>
  )
}
