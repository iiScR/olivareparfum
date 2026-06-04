'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import gsap from 'gsap'

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!heroRef.current || !titleRef.current) return

    const ctx = gsap.context(() => {
      gsap.to('.hero-bg-img', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image — taller than container to allow parallax without cutting */}
      <div className="hero-bg absolute -top-[10%] left-0 right-0 h-[120%]">
        <img
          src="/images/bg.png"
          alt="EMAT SCENTS"
          className="hero-bg-img absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Very light overlay so the image stays visible */}
        <div className="absolute inset-0 bg-background/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/40" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium uppercase tracking-widest">
            Parfumerie de luxe accessible
          </span>
        </motion.div>

        <h1
          ref={titleRef}
          className="heading-xl mb-6"
        >
          Le parfum que vous aimez,{' '}
          <span className="text-gradient">jusqu&apos;à 93% plus accessible</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="body-lg text-lg sm:text-xl max-w-2xl mx-auto mb-10"
        >
          Découvrez nos créations inspirées des plus grandes maisons de parfumerie.
          Une qualité exceptionnelle, des notes olfactives identiques, à prix juste.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/products" className="btn-primary flex items-center gap-2 text-base px-8 py-4">
            Découvrir nos parfums
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/bundle" className="btn-outline flex items-center gap-2 text-base px-8 py-4">
            Offre 3 pour 200 MAD
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: '50+', label: 'Parfums' },
            { value: '93%', label: 'Similarité' },
            { value: '15K+', label: 'Clients' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-text-muted uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-6 h-6 text-text-muted" />
      </motion.div>
    </section>
  )
}
