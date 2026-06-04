'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Mail, MapPin, Phone, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-surface border-t border-border">
      {/* Newsletter */}
      <div className="section-padding py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h3 className="heading-md mb-4">Rejoignez l&apos;univers EMAT SCENTS</h3>
          <p className="body-lg mb-8">
            Recevez en avant-première nos nouveautés, offres exclusives et conseils olfactifs.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              className="flex-1 bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              required
            />
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {subscribed ? 'Inscrit !' : 'S\'inscrire'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>

      {/* Footer links */}
      <div className="section-padding py-12 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <img
                src="/images/logo.svg"
                alt="EMAT SCENTS"
                className="h-10 w-auto"
              />
            </Link>
            <p className="body-base text-sm mb-6">
              Le luxe olfactif accessible. Des parfums d&apos;exception inspirés des plus grandes maisons,
              créés avec passion au Maroc.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-surface-elevated hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-text-muted mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {['Nos Parfums', 'Offre 3 pour 200', 'Notre Histoire', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Nos Parfums' ? '/products' : item === 'Offre 3 pour 200' ? '/bundle' : item === 'Notre Histoire' ? '/about' : '#'}
                    className="text-text-secondary hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-text-muted mb-4">
              Collections
            </h4>
            <ul className="space-y-3">
              {['Tom Ford', 'Chanel', 'YSL', 'Louis Vuitton', 'Prada'].map((brand) => (
                <li key={brand}>
                  <Link
                    href={`/products?brand=${encodeURIComponent(brand)}`}
                    className="text-text-secondary hover:text-primary transition-colors text-sm"
                  >
                    Inspiré par {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-text-muted mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-text-secondary text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>Casablanca, Maroc</span>
              </li>
              <li className="flex items-center gap-3 text-text-secondary text-sm">
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                <span>+212 5XX-XXXXXX</span>
              </li>
              <li className="flex items-center gap-3 text-text-secondary text-sm">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                <span>contact@ematscents.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="section-padding py-6 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-text-muted text-xs">
          <p>&copy; {new Date().getFullYear()} EMAT SCENTS. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-primary transition-colors">Politique de confidentialité</Link>
            <Link href="#" className="hover:text-primary transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
