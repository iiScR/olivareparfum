'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, CreditCard, Truck, Building2, Wallet, Loader2 } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { useCartStore } from '@/lib/store'
import { useHasMounted } from '@/hooks/useHasMounted'
import { formatPrice } from '@/lib/utils'
import { toast } from '@/components/ui/Toaster'
import { createOrder } from '@/hooks/useSupabase'

const PAYMENT_METHODS = [
  {
    id: 'cod',
    label: 'Paiement à la livraison',
    description: 'Payez en espèces à la réception de votre commande',
    icon: Truck,
  },
  {
    id: 'bank_transfer',
    label: 'Virement bancaire',
    description: 'Virement sur notre compte bancaire CIH/BMCE',
    icon: Building2,
  },
  {
    id: 'cmi',
    label: 'Paiement en ligne (CMI)',
    description: 'Paiement sécurisé par carte bancaire — Bientôt disponible',
    icon: CreditCard,
    disabled: true,
  },
]

type Step = 'shipping' | 'payment' | 'confirmation'

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>('shipping')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const hasMounted = useHasMounted()
  const { items, getCartTotal, clearCart } = useCartStore()
  const total = getCartTotal()

  const [shippingData, setShippingData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  })
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePaymentSubmit = async () => {
    if (items.length === 0) return

    setIsPlacingOrder(true)
    try {
      const order = await createOrder({
        total: total,
        payment_method: paymentMethod,
        shipping_address: shippingData,
        items: items.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          size: item.size,
          price_at_time:
            item.product.sizes.find((s) => s.size === item.size)?.price ||
            item.product.price,
        })),
      })

      setStep('confirmation')
      clearCart()
      toast(`Commande confirmée ! N° ${order.id.slice(0, 8)}`, 'success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      toast(
        err instanceof Error ? err.message : 'Erreur lors de la commande',
        'error'
      )
    } finally {
      setIsPlacingOrder(false)
    }
  }

  if (hasMounted && items.length === 0 && step !== 'confirmation') {
    return (
      <div className="pt-20 lg:pt-24 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-md mb-4">Votre panier est vide</h1>
          <p className="text-text-secondary mb-6">Ajoutez des parfums avant de passer commande</p>
          <Link href="/products" className="btn-primary">
            Découvrir nos parfums
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 lg:pt-24">
      <div className="section-padding py-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <AnimatedSection>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Continuer les achats
            </Link>

            {/* Steps */}
            <div className="flex items-center gap-4 mb-10">
              {[
                { key: 'shipping', label: 'Livraison' },
                { key: 'payment', label: 'Paiement' },
                { key: 'confirmation', label: 'Confirmation' },
              ].map((s, i) => (
                <div key={s.key} className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step === s.key
                          ? 'bg-primary text-background'
                          : step === 'confirmation' || (step === 'payment' && s.key === 'shipping')
                          ? 'bg-primary/20 text-primary'
                          : 'bg-surface text-text-muted border border-border'
                      }`}
                    >
                      {step === 'confirmation' || (step === 'payment' && s.key === 'shipping') ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span
                      className={`text-sm hidden sm:block ${
                        step === s.key ? 'text-text-primary font-medium' : 'text-text-muted'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < 2 && <div className="w-8 h-px bg-border" />}
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatePresence mode="wait">
            {/* Shipping Step */}
            {step === 'shipping' && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="bg-surface rounded-xl border border-border p-6 lg:p-8">
                  <h2 className="heading-md mb-6">Informations de livraison</h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom complet</label>
                      <input
                        type="text"
                        required
                        value={shippingData.fullName}
                        onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="Prénom et nom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Téléphone</label>
                      <input
                        type="tel"
                        required
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                        placeholder="+212 6XX-XXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Adresse</label>
                      <textarea
                        required
                        value={shippingData.address}
                        onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                        rows={3}
                        placeholder="Rue, immeuble, appartement..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Ville</label>
                        <input
                          type="text"
                          required
                          value={shippingData.city}
                          onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                          placeholder="Casablanca"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Code postal</label>
                        <input
                          type="text"
                          value={shippingData.postalCode}
                          onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                          placeholder="20000"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                      Continuer vers le paiement
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                  </form>
                </div>

                {/* Order summary */}
                <div className="mt-6 bg-surface rounded-xl border border-border p-6">
                  <h3 className="font-display font-semibold mb-4">Récapitulatif</h3>
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          {formatPrice(
                            (item.product.sizes.find((s) => s.size === item.size)?.price || item.product.price) *
                              item.quantity
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border pt-4 flex items-center justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-display text-xl font-bold text-gradient">{formatPrice(total)}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Payment Step */}
            {step === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="bg-surface rounded-xl border border-border p-6 lg:p-8 mb-6">
                  <h2 className="heading-md mb-6">Méthode de paiement</h2>
                  <div className="space-y-3">
                    {PAYMENT_METHODS.map((method) => {
                      const Icon = method.icon
                      return (
                        <button
                          key={method.id}
                          onClick={() => !method.disabled && setPaymentMethod(method.id)}
                          disabled={method.disabled}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                            paymentMethod === method.id
                              ? 'border-primary bg-primary/10'
                              : method.disabled
                              ? 'border-border/50 opacity-50 cursor-not-allowed'
                              : 'border-border hover:border-primary/30'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              paymentMethod === method.id ? 'border-primary' : 'border-border'
                            }`}
                          >
                            {paymentMethod === method.id && (
                              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                            )}
                          </div>
                          <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-text-muted" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{method.label}</p>
                            <p className="text-xs text-text-muted">{method.description}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* Bank transfer instructions */}
                  {paymentMethod === 'bank_transfer' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 p-4 bg-background rounded-lg border border-border"
                    >
                      <p className="text-sm font-medium mb-2">Instructions de virement :</p>
                      <ul className="text-sm text-text-secondary space-y-1">
                        <li>Banque : CIH Bank</li>
                        <li>Nom : IZIL PARFUMS SARL</li>
                        <li>RIB : 230 1234 5678 9012 3456 7890 1</li>
                        <li>Montant : {formatPrice(total)}</li>
                        <li className="text-primary">Référence : Votre nom + date</li>
                      </ul>
                      <p className="text-xs text-text-muted mt-2">
                        Votre commande sera traitée après confirmation du virement.
                      </p>
                    </motion.div>
                  )}

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStep('shipping')}
                      className="px-6 py-3 rounded-lg border border-border text-sm font-medium hover:bg-surface-elevated transition-colors"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handlePaymentSubmit}
                      disabled={isPlacingOrder}
                      className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isPlacingOrder ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Traitement...
                        </>
                      ) : (
                        <>
                          Confirmer la commande
                          <Check className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-surface rounded-xl border border-border p-6">
                  <h3 className="font-display font-semibold mb-4">Récapitulatif</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-text-secondary">
                      <span>Sous-total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Livraison</span>
                      <span className="text-primary">Gratuite</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-medium">
                      <span>Total</span>
                      <span className="font-display text-lg text-gradient">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Confirmation Step */}
            {step === 'confirmation' && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-primary" />
                </motion.div>
                <h2 className="heading-lg mb-4">Commande confirmée !</h2>
                <p className="body-lg max-w-md mx-auto mb-8">
                  Merci pour votre commande. Nous vous contacterons prochainement pour confirmer 
                  les détails de livraison.
                </p>
                <div className="bg-surface rounded-xl border border-border p-6 max-w-sm mx-auto mb-8">
                  <p className="text-sm text-text-muted mb-1">Numéro de commande</p>
                  <p className="font-display text-xl font-bold text-gradient">
                    OLV-{Date.now().toString(36).toUpperCase()}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/products" className="btn-primary">
                    Continuer les achats
                  </Link>
                  <Link href="/account" className="btn-outline">
                    Voir mes commandes
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
