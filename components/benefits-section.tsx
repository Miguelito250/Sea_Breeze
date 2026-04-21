"use client"

import { useEffect, useRef, useState } from "react"
import { Leaf, Droplets, Recycle, Award, Clock, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const benefits = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Ingredientes puros extraídos directamente de la naturaleza, sin aditivos químicos ni sintéticos.",
    stat: "0%",
    statLabel: "Químicos",
  },
  {
    icon: Sparkles,
    title: "Vitaminas C, y E",
    description: "La vitamina C es potente antioxidante que ilumina la piel, estimula la producción de colágeno y ayuda a reducir manchas, dejando un rostro más firme y radiante. Y la E antioxidante que hidrata profundamente, protege contra los daños ambientales y ayuda a mantener la piel suave, nutrida y saludable.",
    stat: "100%",
    statLabel: "Pureza",
  },
  {
    icon: Clock,
    title: "Duración",
    description: "De olor y no deja una sensacion aceitosa, se absorbe rápidamente y deja la piel suave e hidratada por horas.",
    stat: "Hasta 24h",
    statLabel: "De hidratación",
  },
  {
    icon: Droplets,
    title: "Hidratación profunda",
    description: "El aceite de coco es un hidratante natural que penetra profundamente en la piel, proporcionando una hidratación duradera y ayudando a restaurar la barrera cutánea para una piel suave y flexible.",
    stat: "Nutrición",
    statLabel: "Profunda",
  },
]

export function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
    )

    const items = sectionRef.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="beneficios" ref={sectionRef} className="py-24 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-gold mb-4">
            Filosofía
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            El poder de lo <span className="italic text-gold-gradient">natural</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Creemos que la verdadera belleza nace de la armonía con la naturaleza.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              data-index={index}
              className={cn(
                "group relative p-8 rounded-2xl bg-card transition-all duration-700 gold-hover",
                visibleItems.includes(index) 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div className="relative w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <benefit.icon className="w-7 h-7 text-gold" />
                <div className="absolute inset-0 rounded-2xl bg-gold/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              </div>

              {/* Stat */}
              <div className="mb-4">
                <span className="text-3xl md:text-4xl font-light text-gold-gradient">
                  {benefit.stat}
                </span>
                <span className="block text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  {benefit.statLabel}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 group-hover:text-gold-gradient transition-all duration-300">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-20 relative overflow-hidden rounded-3xl glass p-10 md:p-16">
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
  <h3 className="text-3xl md:text-4xl font-light mb-6">
    Del coco a tu piel,{" "}
    <span className="italic text-gold-gradient">sin intermediarios</span>
  </h3>

  <p className="text-muted-foreground text-lg leading-relaxed mb-10">
    En Sea Breeze elaboramos nuestros productos a partir de ingredientes naturales cuidadosamente seleccionados, como el aceite de coco, conocido por sus propiedades hidratantes y nutritivas. <br />
    Nuestro proceso es artesanal, buscando conservar al máximo los beneficios de cada ingrediente y ofreciendo productos frescos, seguros y amigables con la piel. <br />
    Creemos en lo natural, en lo simple y en el cuidado consciente del cuerpo, por eso evitamos químicos agresivos y priorizamos la calidad en cada fórmula.
  </p>

  {/* Features premium */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
  
  <div className="rounded-xl p-5 text-center border border-gold/20 bg-white/80 backdrop-blur-md shadow-md gold-hover">
    <span className="block text-lg font-light text-gold-gradient mb-1">
      Ingredientes naturales
    </span>
    {/* <span className="text-sm text-muted-foreground">
      Pureza desde el origen
    </span> */}
  </div>

  <div className="rounded-xl p-5 text-center border border-gold/20 bg-white/80 backdrop-blur-md shadow-md gold-hover">
    <span className="block text-lg font-light text-gold-gradient mb-1">
      Elaboración artesanal
    </span>
    {/* <span className="text-sm text-muted-foreground">
      Cuidado en cada detalle
    </span> */}
  </div>

  <div className="rounded-xl p-5 text-center border border-gold/20 bg-white/80 backdrop-blur-md shadow-md gold-hover">
    <span className="block text-lg font-light text-gold-gradient mb-1">
      Libre de químicos agresivos
    </span>
    {/* <span className="text-sm text-muted-foreground">
      Suave con tu piel
    </span> */}
  </div>

</div>
</div>
            
            {/* Visual */}
            <div className="relative h-80 md:h-96 rounded-2xl bg-gradient-to-br from-secondary via-card to-secondary overflow-visible">
              
              {/* Imagen */}
              <div className="absolute inset-0 rounded-md">
                <img 
                  src="/woman.webp" 
                  alt="" 
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              {/* Logo sobresalido */}
              <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/3 z-50">
                <div className="w-28 h-28 rounded-full flex items-center justify-center">
                  
                  {/* Glow interno opcional */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gold/30 to-transparent blur-md opacity-60"></div>

                  {/* Logo */}
                  <img 
                    src="/logo_sea.webp" 
                    alt="Sea Breeze Logo"
                    className="w-24 h-24 rounded-full object-cover animate-float relative z-10"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  )
}
