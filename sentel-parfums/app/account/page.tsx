'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, User, LogOut, ChevronRight } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'

const mockOrders = [
  { id: 'SNT-A1B2C3', date: '2024-01-15', total: 267, status: 'delivered', items: ['Fruits Rouges', 'Agrumes Luxe'] },
  { id: 'SNT-D4E5F6', date: '2024-01-10', total: 200, status: 'shipped', items: ['Coffret 3 Parfums'] },
  { id: 'SNT-G7H8I9', date: '2024-01-05', total: 89, status: 'delivered', items: ['Coco Vanille'] },
]

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'bg-yellow-500/20 text-yellow-300' },
  confirmed: { label: 'Confirmée', color: 'bg-blue-500/20 text-blue-300' },
  shipped: { label: 'Expédiée', color: 'bg-purple-500/20 text-purple-300' },
  delivered: { label: 'Livrée', color: 'bg-green-500/20 text-green-300' },
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders')

  return (
    <div className="pt-20 lg:pt-24">
      <div className="section-padding py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h1 className="heading-lg mb-8">Mon compte</h1>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <AnimatedSection delay={0.1} className="lg:col-span-1">
              <div className="bg-surface rounded-xl border border-border p-4 space-y-1">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    activeTab === 'orders' ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-surface-elevated'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  Mes commandes
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                    activeTab === 'profile' ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-surface-elevated'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Mon profil
                </button>
                <div className="border-t border-border my-2" />
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </div>
            </AnimatedSection>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === 'orders' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <AnimatedSection>
                    <h2 className="font-display font-semibold text-xl mb-6">Mes commandes</h2>
                  </AnimatedSection>

                  <div className="space-y-4">
                    {mockOrders.map((order, i) => {
                      const status = statusConfig[order.status]
                      return (
                        <AnimatedSection key={order.id} delay={0.1 + i * 0.05}>
                          <div className="bg-surface rounded-xl border border-border p-5 hover:border-primary/20 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                              <div>
                                <p className="font-medium text-sm">{order.id}</p>
                                <p className="text-xs text-text-muted">{order.date}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                  {status.label}
                                </span>
                                <span className="font-display font-bold">{order.total} MAD</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-text-secondary">
                                {order.items.join(', ')}
                              </p>
                              <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                                Détails
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </AnimatedSection>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === 'profile' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <AnimatedSection>
                    <h2 className="font-display font-semibold text-xl mb-6">Mon profil</h2>
                  </AnimatedSection>

                  <AnimatedSection delay={0.1}>
                    <div className="bg-surface rounded-xl border border-border p-6 space-y-5">
                      <div>
                        <label className="block text-sm font-medium mb-2">Nom complet</label>
                        <input
                          type="text"
                          defaultValue="Amina Benali"
                          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="amina@example.com"
                          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Téléphone</label>
                        <input
                          type="tel"
                          defaultValue="+212 612-345678"
                          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                      <button className="btn-primary">Enregistrer les modifications</button>
                    </div>
                  </AnimatedSection>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
