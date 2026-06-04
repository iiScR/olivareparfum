'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useHasMounted } from '@/hooks/useHasMounted'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/products', label: 'Parfums' },
  { href: '/bundle', label: 'Offre 3 pour 200' },
  { href: '/about', label: 'Notre Histoire' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const hasMounted = useHasMounted()
  const cartCount = useCartStore((s) => s.getCartCount())
  const toggleCart = useCartStore((s) => s.toggleCart)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-surface transition-colors"
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
            >
              <img
                src="/images/logo.svg"
                alt="IZIL PARFUMS"
                className="h-8 lg:h-10 w-auto"
              />
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg hover:bg-surface transition-colors hidden sm:block"
              aria-label="Rechercher"
            >
              <Search className="w-5 h-5 text-text-secondary" />
            </button>

            <Link
              href="/account"
              className="p-2 rounded-lg hover:bg-surface transition-colors hidden sm:block"
              aria-label="Mon compte"
            >
              <User className="w-5 h-5 text-text-secondary" />
            </Link>

            <button
              onClick={toggleCart}
              className="relative p-2 rounded-lg hover:bg-surface transition-colors"
              aria-label="Panier"
            >
              <ShoppingBag className="w-5 h-5 text-text-secondary" />
              {hasMounted && cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-background text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pb-4">
                <input
                  type="text"
                  placeholder="Rechercher un parfum..."
                  className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface border-t border-border overflow-hidden"
          >
            <div className="section-padding py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-4 rounded-lg text-text-secondary hover:text-primary hover:bg-surface-elevated transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-2 border-t border-border mt-2">
                <Link
                  href="/account"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg text-text-secondary hover:text-primary hover:bg-surface-elevated transition-colors"
                >
                  <User className="w-5 h-5" />
                  Mon compte
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
