"use client"

import Link from "next/link"
import { Instagram, Facebook, Twitter, Youtube, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const footerLinks = {
  productos: [
    { label: "Rostro", href: "#" },
    { label: "Cuerpo", href: "#" },
    { label: "Cabello", href: "#" },
    { label: "Sets de Regalo", href: "#" },
  ],
  empresa: [
    { label: "Nuestra Historia", href: "#nosotros" },
    { label: "Sostenibilidad", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Trabaja con Nosotros", href: "#" },
  ],
  ayuda: [
    { label: "Contacto", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Envíos", href: "#" },
    { label: "Devoluciones", href: "#" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-light mb-4">
                Únete a la familia{" "}
                <span className="italic text-gold">CocoLuxe</span>
              </h3>
              <p className="text-background/60 text-lg">
                Recibe ofertas exclusivas, consejos de belleza y acceso anticipado a nuevos productos.
              </p>
            </div>

            <div>
              {isSubscribed ? (
                <div className="flex items-center gap-3 p-6 rounded-2xl bg-background/10">
                  <span className="text-3xl">✨</span>
                  <div>
                    <p className="font-medium">¡Gracias por suscribirte!</p>
                    <p className="text-sm text-background/60">
                      Pronto recibirás novedades en tu bandeja de entrada.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Tu email"
                      className="w-full px-6 py-4 rounded-full bg-background/10 border border-background/20 text-background placeholder:text-background/40 focus:outline-none focus:border-gold transition-colors"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="group relative overflow-hidden bg-gold hover:bg-gold/90 text-foreground rounded-full px-8"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    <span>Suscribir</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-background/0 via-background/20 to-background/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:pr-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <span className="text-2xl">🥥</span>
              <span className="text-2xl font-semibold">
                Coco<span className="text-gold">Luxe</span>
              </span>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Lujo natural del trópico. Cosméticos artesanales elaborados con amor y aceite de coco virgen.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-gold hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">Productos</h4>
            <ul className="space-y-3">
              {footerLinks.productos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gold">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-gold">Ayuda</h4>
            <ul className="space-y-3">
              {footerLinks.ayuda.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">
            © 2024 CocoLuxe. Todos los derechos reservados.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-background/40">
            <Link href="#" className="hover:text-background transition-colors">
              Política de Privacidad
            </Link>
            <Link href="#" className="hover:text-background transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="#" className="hover:text-background transition-colors">
              Cookies
            </Link>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-2 text-sm text-background/40">
            <span>Pagos seguros</span>
            <div className="flex gap-1">
              <span className="px-2 py-1 bg-background/10 rounded text-xs">Visa</span>
              <span className="px-2 py-1 bg-background/10 rounded text-xs">MC</span>
              <span className="px-2 py-1 bg-background/10 rounded text-xs">PayPal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Gold Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </footer>
  )
}
