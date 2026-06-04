'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection'
import { GlowCard } from '@/components/ui/GlowCard'
import { useReviews } from '@/hooks/useSupabase'

const reviews = [
  {
    name: 'Amina B.',
    city: 'Casablanca',
    rating: 5,
    comment: 'Je suis bluffée par la similarité avec l\'original. Fruits Rouges est exactement comme celui de Tom Ford à 5x le prix. Livraison rapide et emballage luxueux.',
  },
  {
    name: 'Karim E.',
    city: 'Rabat',
    rating: 5,
    comment: 'J\'ai acheté le coffret 3 pour 200 MAD pour tester. Résultat : j\'ai commandé 3 autres flacons de 50ml la semaine suivante. Qualité exceptionnelle.',
  },
  {
    name: 'Laila M.',
    city: 'Marrakech',
    rating: 5,
    comment: 'La tenue est impressionnante — 10 heures facilement sur mes vêtements. Agrumes Luxe est devenu mon signature scent. Merci Olivare !',
  },
  {
    name: 'Youssef T.',
    city: 'Tanger',
    rating: 5,
    comment: 'Service client au top. J\'avais une question sur les notes olfactives, ils m\'ont répondu en 10 minutes et m\'ont conseillé parfaitement.',
  },
  {
    name: 'Samira K.',
    city: 'Agadir',
    rating: 5,
    comment: 'J\'offre régulièrement Olivare à mes amies. C\'est le cadeau parfait : luxueux, abordable, et tout le monde adore. L\'emballage est sublime.',
  },
  {
    name: 'Omar H.',
    city: 'Fès',
    rating: 4,
    comment: 'Très bon rapport qualité-prix. Oud Impérial est puissant et sophistiqué. J\'apprécie particulièrement la transparence sur les notes olfactives.',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? 'fill-primary text-primary' : 'text-text-muted'}`}
        />
      ))}
    </div>
  )
}

export function Reviews() {
  const { reviews: dbReviews, loading } = useReviews()
  const displayReviews = dbReviews.length > 0 ? dbReviews.map(r => ({
    name: r.name,
    city: r.city || '',
    rating: r.rating,
    comment: r.comment || '',
  })) : reviews

  return (
    <section className="section-padding py-20 lg:py-28">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-primary font-medium mb-2 block">
            Témoignages
          </span>
          <h2 className="heading-lg mb-4">Ce que nos clients disent</h2>
          <div className="flex items-center justify-center gap-2">
            <span className="font-display text-3xl font-bold text-gradient">4.9</span>
            <StarRating rating={5} />
            <span className="text-text-muted text-sm">sur 1,200+ avis vérifiés</span>
          </div>
        </AnimatedSection>

        {loading && dbReviews.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 rounded-xl bg-surface border border-border animate-pulse" />
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayReviews.map((review, i) => (
              <StaggerItem key={i}>
                <GlowCard className="p-6 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />
                  <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-4">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="font-medium text-sm">{review.name}</p>
                      <p className="text-xs text-text-muted">{review.city}</p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  )
}
