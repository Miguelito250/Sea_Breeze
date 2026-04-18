"use client"

import { useEffect, useRef } from "react"
import { ArrowDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20
      
      heroRef.current.style.setProperty("--mouse-x", `${x}px`)
      heroRef.current.style.setProperty("--mouse-y", `${y}px`)
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-secondary/30 via-background to-background"
    >
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Coconut leaf decorations */}
        <div 
          className="absolute top-20 -left-20 w-64 h-64 opacity-20 animate-float"
          style={{ transform: "translate(var(--mouse-x, 0), var(--mouse-y, 0))" }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-accent">
            <path 
              fill="currentColor" 
              d="M100 10 C120 50 180 60 190 100 C180 140 120 150 100 190 C80 150 20 140 10 100 C20 60 80 50 100 10Z"
            />
          </svg>
        </div>
        
        <div 
          className="absolute bottom-40 -right-10 w-48 h-48 opacity-15 animate-float-delayed"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-accent rotate-45">
            <path 
              fill="currentColor" 
              d="M100 10 C120 50 180 60 190 100 C180 140 120 150 100 190 C80 150 20 140 10 100 C20 60 80 50 100 10Z"
            />
          </svg>
        </div>

        {/* Golden particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gold/40 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-gold" />
          <span className="text-sm font-medium tracking-wider uppercase text-foreground/80">
            Lujo Natural del Trópico
          </span>
        </div>

        {/* Headline */}
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="block">Belleza que</span>
          <span className="block italic text-gold-gradient">fluye naturalmente</span>
        </h1>

        {/* Subheadline */}
        <p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          Descubre el poder transformador del aceite de coco virgen. 
          Rituales de belleza artesanales que despiertan tus sentidos 
          y nutren tu piel desde lo más profundo.
        </p>

        {/* CTA Buttons */}
        {/* <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <Button
            size="lg"
            className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-medium tracking-wide rounded-full transition-all duration-500 gold-hover"
          >
            <span className="relative z-10">Explorar Colección</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 text-base font-medium tracking-wide rounded-full border-foreground/20 hover:border-gold hover:text-gold transition-all duration-300"
          >
            Nuestra Historia
          </Button>
        </div> */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up" style={{ animationDelay: "1s" }}>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Descubre más</span>
        <ArrowDown className="w-4 h-4 text-muted-foreground animate-bounce" />
      </div>
    </section>
  )
}
