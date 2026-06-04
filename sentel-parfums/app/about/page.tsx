'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Gem, FlaskConical, Heart, Leaf } from 'lucide-react'
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/components/animations/AnimatedSection'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    icon: Gem,
    title: 'Luxe accessible',
    description: 'Nous croyons que chacun mérite de sentir le luxe. Nos créations offrent 93% de similarité avec les parfums originaux à 1/5 du prix.',
  },
  {
    icon: FlaskConical,
    title: 'Expertise olfactive',
    description: 'Nos parfumeurs analysent méticuleusement chaque fragrance pour reproduire fidèlement les pyramides olfactives des maisons de renom.',
  },
  {
    icon: Heart,
    title: 'Passion marocaine',
    description: 'Né au cœur du Maroc, EMAT SCENTS allie les traditions orientales de parfumerie avec les standards internationaux de qualité.',
  },
  {
    icon: Leaf,
    title: 'Engagement durable',
    description: 'Nous privilégions des ingrédients de qualité et des emballages éco-responsables pour réduire notre empreinte.',
  },
]

export default function AboutPage() {
  const storyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!storyRef.current) return

    const ctx = gsap.context(() => {
      gsap.from('.story-text', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 70%',
        },
      })
    }, storyRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f00] via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(198,164,63,0.1)_0%,_transparent_70%)]" />
        
        <div className="relative z-10 section-padding text-center max-w-4xl mx-auto py-20">
          <AnimatedSection>
            <span className="text-xs uppercase tracking-widest text-primary font-medium mb-4 block">
              Notre histoire
            </span>
            <h1 className="heading-xl mb-6">
              L&apos;art du parfum,{' '}
              <span className="text-gradient">accessible à tous</span>
            </h1>
            <p className="body-lg text-lg max-w-2xl mx-auto">
              EMAT SCENTS est né d&apos;une conviction simple : le luxe olfactif ne devrait pas être
              un privilège réservé à quelques-uns. Depuis notre création au Maroc, nous
              réinventons l&apos;expérience parfumée.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section ref={storyRef} className="section-padding py-20 lg:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            <div className="story-text">
              <h2 className="heading-md mb-4">Des racines marocaines</h2>
              <p className="body-lg">
                Notre aventure a commencé dans les ruelles odorantes de la médina de Fès, 
                où les traditions de parfumerie se transmettent de génération en génération. 
                Fascinés par l&apos;art olfactif, nous avons décidé de marier ce savoir-faire 
                ancestral avec les techniques modernes pour créer des parfums d&apos;exception.
              </p>
            </div>

            <div className="story-text">
              <h2 className="heading-md mb-4">Une promesse de qualité</h2>
              <p className="body-lg">
                Chaque fragrance EMAT SCENTS est le fruit de centaines d&apos;heures de recherche et
                développement. Nos parfumeurs analysent les pyramides olfactives des créations 
                les plus iconiques pour reproduire fidèlement chaque note, chaque accord, 
                chaque nuance. Le résultat ? Une similarité de 93% avec les originaux, 
                à un prix qui rend le luxe accessible.
              </p>
            </div>

            <div className="story-text">
              <h2 className="heading-md mb-4">L&apos;avenir de la parfumerie</h2>
              <p className="body-lg">
                Aujourd&apos;hui, EMAT SCENTS compte plus de 15 000 clients satisfaits à travers
                le Maroc. Notre ambition ? Devenir la référence de la parfumerie accessible 
                en Afrique du Nord, tout en préservant l&apos;excellence et l&apos;authenticité 
                qui font notre identité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding py-20 lg:py-28 bg-surface/30 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-medium mb-2 block">
              Nos valeurs
            </span>
            <h2 className="heading-lg">Ce qui nous anime</h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <StaggerItem key={value.title}>
                  <div className="p-6 rounded-xl bg-surface border border-border hover:border-primary/30 hover:shadow-glow transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding py-20 lg:py-28">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="heading-lg">EMAT SCENTS en chiffres</h2>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Parfums créés' },
              { value: '15K+', label: 'Clients satisfaits' },
              { value: '93%', label: 'Similarité moyenne' },
              { value: '48h', label: 'Livraison au Maroc' },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <div className="font-display text-4xl lg:text-5xl font-bold text-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-secondary">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  )
}
