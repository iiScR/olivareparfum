'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Search,
  ArrowLeft,
  Loader2,
} from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { GlowCard } from '@/components/ui/GlowCard'
import { useProducts, useOrders } from '@/hooks/useSupabase'
import { formatPrice } from '@/lib/utils'

type Tab = 'dashboard' | 'products' | 'orders'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-300',
  confirmed: 'bg-blue-500/20 text-blue-300',
  shipped: 'bg-purple-500/20 text-purple-300',
  delivered: 'bg-green-500/20 text-green-300',
  cancelled: 'bg-red-500/20 text-red-300',
}

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // Real data hooks
  const { products: dbProducts, loading: productsLoading } = useProducts()
  const { orders: dbOrders, loading: ordersLoading } = useOrders()

  // Computed stats
  const stats = useMemo(() => {
    const totalRevenue = dbOrders.reduce((sum, o) => sum + (o.total || 0), 0)
    const totalOrders = dbOrders.length
    const totalProducts = dbProducts.length
    const totalCustomers = new Set(dbOrders.map((o) => o.user_id).filter(Boolean)).size

    return [
      {
        label: 'Ventes totales',
        value: formatPrice(totalRevenue),
        icon: TrendingUp,
        change: `${totalOrders} commandes`,
      },
      {
        label: 'Commandes',
        value: String(totalOrders),
        icon: ShoppingCart,
        change: `${dbOrders.filter((o) => o.status === 'pending').length} en attente`,
      },
      {
        label: 'Produits',
        value: String(totalProducts),
        icon: Package,
        change: `${dbProducts.filter((p) => p.stock && p.stock < 20).length} stock faible`,
      },
      {
        label: 'Clients',
        value: String(totalCustomers || dbOrders.length),
        icon: Users,
        change: 'uniques',
      },
    ]
  }, [dbOrders, dbProducts])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.includes('@')) {
      setIsAuthenticated(true)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-dvh flex items-center justify-center section-padding">
        <AnimatedSection className="w-full max-w-md">
          <div className="bg-surface rounded-2xl border border-border p-8">
            <div className="text-center mb-8">
              <h1 className="font-display text-2xl font-bold mb-2">Administration</h1>
              <p className="text-sm text-text-secondary">Connectez-vous pour accéder au panel admin</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email admin</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="admin@sentelparfums.ma"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mot de passe</label>
                <input
                  type="password"
                  required
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Se connecter
              </button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    )
  }

  const isLoading = productsLoading || ordersLoading

  return (
    <div className="pt-20 lg:pt-24 min-h-dvh">
      <div className="section-padding py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="heading-md">Panel Admin</h1>
              <p className="text-sm text-text-muted">Gérez vos produits et commandes</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-sm text-text-muted hover:text-primary transition-colors"
            >
              Déconnexion
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-border pb-1">
            {(
              [
                { key: 'dashboard', label: 'Tableau de bord' },
                { key: 'products', label: 'Produits' },
                { key: 'orders', label: 'Commandes' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative ${
                  activeTab === tab.key
                    ? 'text-primary'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="adminTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {/* Dashboard */}
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat) => {
                      const Icon = stat.icon
                      return (
                        <GlowCard key={stat.label} className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-xs text-green-400 font-medium">{stat.change}</span>
                          </div>
                          <p className="font-display text-2xl font-bold">{stat.value}</p>
                          <p className="text-xs text-text-muted">{stat.label}</p>
                        </GlowCard>
                      )
                    })}
                  </div>

                  {/* Recent orders */}
                  <div className="bg-surface rounded-xl border border-border overflow-hidden">
                    <div className="p-6 border-b border-border">
                      <h3 className="font-display font-semibold">Commandes récentes</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                              Commande
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                              Total
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                              Statut
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {dbOrders.slice(0, 5).map((order) => (
                            <tr
                              key={order.id}
                              className="border-b border-border/50 hover:bg-surface-elevated/50 transition-colors"
                            >
                              <td className="px-6 py-4 text-sm font-medium">
                                {order.id.slice(0, 8).toUpperCase()}
                              </td>
                              <td className="px-6 py-4 text-sm">{formatPrice(order.total)}</td>
                              <td className="px-6 py-4">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || statusColors.pending}`}
                                >
                                  {statusLabels[order.status] || order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-text-muted">
                                {new Date(order.created_at).toLocaleDateString('fr-FR')}
                              </td>
                            </tr>
                          ))}
                          {dbOrders.length === 0 && (
                            <tr>
                              <td colSpan={4} className="px-6 py-8 text-center text-text-muted text-sm">
                                Aucune commande pour le moment
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Products */}
              {activeTab === 'products' && (
                <motion.div
                  key="products"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors w-64"
                      />
                    </div>
                    <button className="btn-primary flex items-center gap-2 text-sm">
                      <Plus className="w-4 h-4" />
                      Ajouter un produit
                    </button>
                  </div>

                  <div className="bg-surface rounded-xl border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                              Produit
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                              Marque
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                              Prix
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                              Stock
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {dbProducts
                            .filter((p) =>
                              p.name.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((product) => (
                              <tr
                                key={product.id}
                                className="border-b border-border/50 hover:bg-surface-elevated/50 transition-colors"
                              >
                                <td className="px-6 py-4 text-sm font-medium">{product.name}</td>
                                <td className="px-6 py-4 text-sm text-text-secondary">
                                  {product.brand_inspiration}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                  {formatPrice(product.price)}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                  <span
                                    className={
                                      product.stock < 20 ? 'text-red-400' : 'text-text-secondary'
                                    }
                                  >
                                    {product.stock}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-2">
                                    <button className="p-1.5 rounded hover:bg-primary/10 hover:text-primary transition-colors">
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-1.5 rounded hover:bg-red-500/10 hover:text-red-400 transition-colors">
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          {dbProducts.length === 0 && (
                            <tr>
                              <td colSpan={5} className="px-6 py-8 text-center text-text-muted text-sm">
                                Aucun produit trouvé
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Orders */}
              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="bg-surface rounded-xl border border-border overflow-hidden">
                    <div className="p-6 border-b border-border flex items-center justify-between">
                      <h3 className="font-display font-semibold">Toutes les commandes</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                              Commande
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                              Total
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                              Articles
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                              Statut
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {dbOrders.map((order) => (
                            <tr
                              key={order.id}
                              className="border-b border-border/50 hover:bg-surface-elevated/50 transition-colors"
                            >
                              <td className="px-6 py-4 text-sm font-medium">
                                {order.id.slice(0, 8).toUpperCase()}
                              </td>
                              <td className="px-6 py-4 text-sm">{formatPrice(order.total)}</td>
                              <td className="px-6 py-4 text-sm text-text-secondary">
                                {order.order_items?.length || 0} article
                                {(order.order_items?.length || 0) !== 1 ? 's' : ''}
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || statusColors.pending}`}
                                >
                                  {statusLabels[order.status] || order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-text-muted">
                                {new Date(order.created_at).toLocaleDateString('fr-FR')}
                              </td>
                            </tr>
                          ))}
                          {dbOrders.length === 0 && (
                            <tr>
                              <td colSpan={5} className="px-6 py-8 text-center text-text-muted text-sm">
                                Aucune commande pour le moment
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  )
}
