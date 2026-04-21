"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const socialLinks = [
    {
      name: "Instagram",
      handle: "@cocoluxe.beauty",
      icon: InstagramIcon,
      url: "https://www.instagram.com/seabreezeglow?igsh=d21qM2I1OGdnZTZx",
      color: "from-pink-500 to-purple-600",
    },
    {
      name: "TikTok",
      handle: "@seabreezeglow@gmail.com",
      icon: TikTokIcon,
      url: "https://tiktok.com/@cocoluxe.oficial",
      color: "from-gray-800 to-gray-900",
    },
  ]

  const phoneNumbers = [
    {
      label: "Ventas",
      number: "+57 310 459 5889",
      whatsapp: "3104595889",
    },
    {
      label: "Atención al Cliente",
      number: "+57 311 657 7337",
      whatsapp: "3116577337",
    },
  ]

  return (
    <section id="nosotros" ref={sectionRef} className="py-24 md:py-32 bg-secondary/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div 
          className={cn(
            "text-center max-w-2xl mx-auto mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-gold mb-4">
            Contáctanos
          </span>
          <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
            Estamos aquí para{" "}
            <span className="italic text-gold-gradient">ayudarte</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            ¿Tienes preguntas sobre nuestros productos? ¿Necesitas asesoría personalizada? 
            Contáctanos por cualquiera de nuestros canales.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Social Media */}
          <div 
            className={cn(
              "transition-all duration-1000 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            )}
          >
            <h3 className="text-2xl font-light mb-8 flex items-center gap-3">
              <MessageIcon className="w-6 h-6 text-gold" />
              Síguenos en Redes
            </h3>

            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group flex items-center gap-5 p-6 rounded-2xl bg-card glass border border-border/50 transition-all duration-500 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                    social.color
                  )}>
                    <social.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-lg">{social.name}</p>
                    <p className="text-muted-foreground">{social.handle}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center transition-all duration-300 group-hover:bg-gold/20 group-hover:translate-x-1">
                    <svg className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>

            {/* Decorative element */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20">
              <p className="text-sm text-muted-foreground mb-2">Horario de atención en redes</p>
              <p className="font-medium">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              <p className="font-medium">Sábados: 10:00 AM - 2:00 PM</p>
            </div>
          </div>

          {/* Right - Phone Numbers */}
          <div 
            className={cn(
              "transition-all duration-1000 delay-400",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            )}
          >
            <h3 className="text-2xl font-light mb-8 flex items-center gap-3">
              <PhoneIcon className="w-6 h-6 text-gold" />
              Llámanos o Escríbenos
            </h3>

            <div className="space-y-4">
              {phoneNumbers.map((phone, index) => (
                <div
                  key={phone.label}
                  className={cn(
                    "p-6 rounded-2xl bg-card glass border border-border/50 transition-all duration-500",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  )}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <p className="text-sm text-gold font-medium tracking-wide uppercase mb-2">
                    {phone.label}
                  </p>
                  <p className="text-2xl font-light mb-4">{phone.number}</p>
                  
                  <div className="flex gap-3">
                    <a
                      href={`tel:${phone.number.replace(/\s/g, "")}`}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <PhoneIcon className="w-5 h-5" />
                      <span className="font-medium">Llamar</span>
                    </a>
                    <a
                      href={`https://wa.me/${phone.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white transition-colors"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      <span className="font-medium">WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick contact card */}
            <div 
              className={cn(
                "mt-8 p-8 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 border border-accent/30 text-center transition-all duration-1000 delay-700",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              )}
            >
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h4 className="text-xl font-medium mb-2">¿Prefieres que te contactemos?</h4>
              <p className="text-muted-foreground mb-4">
                Déjanos tu número y te llamamos en menos de 24 horas
              </p>
              <a
                href="mailto:seabreezeglow@gmail.com"
                className="inline-flex items-center gap-2 text-gold hover:underline"
              >
                seabreezeglow@gmail.com
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
