"use client"

import { useState, useCallback, type FormEvent } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductsSection, type Product } from "@/components/products-section"
import { BenefitsSection } from "@/components/benefits-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { CartDrawer, type CartItem } from "@/components/cart-drawer"
import {
  CheckoutDialog,
  type CheckoutFormData,
} from "@/components/checkout-dialog"
import { Footer } from "@/components/footer"

const initialCheckoutForm: CheckoutFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  notes: "",
}

const whatsappNumber = "573104595889"

const formatPrice = (value: number) => `$${value.toFixed(3)}`

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [checkoutForm, setCheckoutForm] =
    useState<CheckoutFormData>(initialCheckoutForm)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [manualWhatsappUrl, setManualWhatsappUrl] = useState<string | null>(null)

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }, [])

  const handleUpdateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      )
    }
  }, [])

  const handleRemoveItem = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const shipping = subtotal > 75 ? 0 : 5.99
  const total = subtotal + shipping

  const handleCheckoutFieldChange = useCallback(
    (field: keyof CheckoutFormData, value: string) => {
      setCheckoutForm((prev) => ({ ...prev, [field]: value }))
    },
    []
  )

  const handleOpenCheckout = useCallback(() => {
    if (cartItems.length === 0) return
    setCheckoutError(null)
    setManualWhatsappUrl(null)
    setIsCheckoutOpen(true)
  }, [cartItems.length])

  const handleCheckoutOpenChange = useCallback((open: boolean) => {
    setIsCheckoutOpen(open)
    if (!open) {
      setCheckoutError(null)
      setManualWhatsappUrl(null)
    }
  }, [])

  const handleSubmitOrder = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      if (cartItems.length === 0) {
        setCheckoutError("Tu carrito está vacío.")
        return
      }

      if (!whatsappNumber) {
        setCheckoutError(
          "Falta configurar el número de WhatsApp del negocio."
        )
        setManualWhatsappUrl(null)
        return
      }

      const notes = checkoutForm.notes.trim() || "Sin notas adicionales."
      const itemsText = cartItems
        .map(
          (item) =>
            `- ${item.name} | ${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(
              item.price * item.quantity
            )}`
        )
        .join("\n")

      const message = [
        "Hola, quiero confirmar este pedido de Sea Breeze:",
        "",
        "Datos del cliente",
        `Nombre: ${checkoutForm.name}`,
        `Email: ${checkoutForm.email}`,
        `WhatsApp: ${checkoutForm.phone}`,
        `Dirección: ${checkoutForm.address}`,
        `Notas: ${notes}`,
        "",
        "Productos",
        itemsText,
        "",
        `Subtotal: ${formatPrice(subtotal)}`,
        `Envío: ${shipping === 0 ? "Gratis" : formatPrice(shipping)}`,
        `Total: ${formatPrice(total)}`,
      ].join("\n")

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
      const openedWindow = window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
      )

      if (openedWindow) {
        setCheckoutError(null)
        setManualWhatsappUrl(null)
        setIsCheckoutOpen(false)
        return
      }

      setManualWhatsappUrl(whatsappUrl)
      setCheckoutError(
        "Tu navegador bloqueó la nueva pestaña. Usa el enlace manual para abrir WhatsApp."
      )
    },
    [cartItems, checkoutForm, shipping, subtotal, total]
  )

  return (
    <main className="min-h-screen">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <HeroSection />

      <ProductsSection onAddToCart={handleAddToCart} />

      <BenefitsSection />

      <AboutSection />

      <ExperienceSection />

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckoutClick={handleOpenCheckout}
      />

      <CheckoutDialog
        open={isCheckoutOpen}
        onOpenChange={handleCheckoutOpenChange}
        formData={checkoutForm}
        onFieldChange={handleCheckoutFieldChange}
        onSubmit={handleSubmitOrder}
        items={cartItems}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        errorMessage={checkoutError}
        whatsappUrl={manualWhatsappUrl}
      />
    </main>
  )
}
