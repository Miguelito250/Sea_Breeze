"use client"

import { X, Plus, Minus, ShoppingBag, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Product } from "@/components/products-section"

interface CartItem extends Product {
  quantity: number
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
}

export function CartDrawer({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 75 ? 0 : 5.99
  const total = subtotal + shipping

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-card z-50 shadow-2xl transition-transform duration-500 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <h2 className="text-xl font-semibold">Tu Carrito</h2>
              <span className="px-2 py-0.5 bg-gold/20 text-sm rounded-full">
                {items.length} {items.length === 1 ? "artículo" : "artículos"}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium mb-2">Tu carrito está vacío</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Descubre nuestra colección de productos naturales
                </p>
                <Button
                  onClick={onClose}
                  className="rounded-full bg-primary hover:bg-primary/90"
                >
                  Explorar Productos
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="group flex gap-4 p-4 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-secondary to-card flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">
                        {item.category === "rostro" ? "✨" : item.category === "cuerpo" ? "🌿" : "💫"}
                      </span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium truncate">{item.name}</h3>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        €{item.price} cada uno
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-card rounded-full p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-semibold">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-border bg-secondary/20">
              {/* Free Shipping Progress */}
              {subtotal < 75 && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      Añade €{(75 - subtotal).toFixed(2)} más para envío gratis
                    </span>
                    <Sparkles className="w-4 h-4 text-gold" />
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold to-gold-shimmer rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((subtotal / 75) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span className={shipping === 0 ? "text-accent" : ""}>
                    {shipping === 0 ? "Gratis" : `€${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-gold-gradient">€{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                size="lg"
                className="w-full group relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 rounded-full py-6 text-base font-medium"
              >
                <span className="relative z-10">Finalizar Compra</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </Button>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                <span>🔒 Pago Seguro</span>
                <span>•</span>
                <span>🚚 Envío Express</span>
                <span>•</span>
                <span>↩️ Devolución Fácil</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export type { CartItem }
