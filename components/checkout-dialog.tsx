"use client"

import type { FormEvent } from "react"
import { MapPin, Mail, MessageSquare, Phone, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { CartItem } from "@/components/cart-drawer"

export interface CheckoutFormData {
  name: string
  email: string
  phone: string
  address: string
  notes: string
}

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: CheckoutFormData
  onFieldChange: (field: keyof CheckoutFormData, value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  errorMessage: string | null
  whatsappUrl: string | null
}

const formatPrice = (value: number) => `$${value.toFixed(3)}`

export function CheckoutDialog({
  open,
  onOpenChange,
  formData,
  onFieldChange,
  onSubmit,
  items,
  subtotal,
  shipping,
  total,
  errorMessage,
  whatsappUrl,
}: CheckoutDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Confirma tu pedido</DialogTitle>
          <DialogDescription>
            Completa tus datos para enviar el pedido a Sea Breeze por WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Nombre</span>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  required
                  value={formData.name}
                  onChange={(event) => onFieldChange("name", event.target.value)}
                  placeholder="Tu nombre completo"
                  className="pl-9"
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Correo electrónico</span>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(event) => onFieldChange("email", event.target.value)}
                  placeholder="nombre@correo.com"
                  className="pl-9"
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">WhatsApp</span>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  required
                  value={formData.phone}
                  onChange={(event) => onFieldChange("phone", event.target.value)}
                  placeholder="Tu número de contacto"
                  className="pl-9"
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium">Dirección</span>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  required
                  value={formData.address}
                  onChange={(event) => onFieldChange("address", event.target.value)}
                  placeholder="Dirección de entrega"
                  className="pl-9"
                />
              </div>
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Notas del pedido</span>
            <div className="relative">
              <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                value={formData.notes}
                onChange={(event) => onFieldChange("notes", event.target.value)}
                placeholder="Indicaciones adicionales, referencias de entrega o preferencias"
                className="min-h-28 pl-9"
              />
            </div>
          </label>

          <div className="rounded-2xl border border-border/60 bg-secondary/20 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Resumen del pedido</h3>
              <span className="text-sm text-muted-foreground">
                {items.length} {items.length === 1 ? "producto" : "productos"}
              </span>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4 text-sm"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground">
                      {item.quantity} x {formatPrice(item.price)}
                    </p>
                  </div>
                  <span className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 border-t border-border/60 pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="space-y-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <p>{errorMessage}</p>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex font-medium underline underline-offset-4"
                >
                  Abrir WhatsApp manualmente
                </a>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={items.length === 0} className="min-w-40">
              Enviar por WhatsApp
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
