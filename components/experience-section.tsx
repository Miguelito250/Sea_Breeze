"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const experiences = [
  {
    step: "01",
    title: "Abre",
    description: "El aroma tropical te envuelve instantáneamente",
    emoji: "🌺",
    feeling: "Frescura",
  },
  {
    step: "02",
    title: "Aplica",
    description: "Textura sedosa que se funde con tu piel",
    emoji: "💆‍♀️",
    feeling: "Suavidad",
  },
  {
    step: "03",
    title: "Absorbe",
    description: "Nutrientes que penetran profundamente",
    emoji: "✨",
    feeling: "Hidratación",
  },
  {
    step: "04",
    title: "Resplandece",
    description: "Tu piel brilla con luz propia",
    emoji: "🌟",
    feeling: "Luminosidad",
  },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % experiences.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <section 
      id="experiencia" 
      ref={sectionRef} 
      className="py-24 md:py-32 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-gold mb-4">
            Experiencia Sensorial
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Cómo se siente{" "}
            <span className="italic text-gold-gradient">cuidarte</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Cada aplicación es un momento de conexión contigo misma. Un ritual que transforma tu rutina en algo extraordinario.
          </p>
        </div>

        {/* Experience Flow */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={cn(
                  "relative group cursor-pointer transition-all duration-700",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Card */}
                <div
                  className={cn(
                    "relative p-8 rounded-3xl transition-all duration-500",
                    activeStep === index
                      ? "bg-card glass shadow-2xl scale-105"
                      : "bg-transparent hover:bg-card/50"
                  )}
                >
                  {/* Step Number */}
                  <span
                    className={cn(
                      "absolute -top-4 left-8 text-6xl font-light transition-colors duration-500",
                      activeStep === index ? "text-gold-gradient" : "text-border"
                    )}
                  >
                    {exp.step}
                  </span>

                  {/* Emoji with glow */}
                  <div className="relative w-20 h-20 mx-auto mb-6 mt-8">
                    <div
                      className={cn(
                        "absolute inset-0 rounded-full bg-gold/20 blur-xl transition-opacity duration-500",
                        activeStep === index ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-secondary to-card flex items-center justify-center">
                      <span
                        className={cn(
                          "text-4xl transition-transform duration-500",
                          activeStep === index ? "scale-125" : "scale-100"
                        )}
                      >
                        {exp.emoji}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3
                      className={cn(
                        "text-2xl font-semibold mb-3 transition-colors duration-500",
                        activeStep === index ? "text-gold-gradient" : "text-foreground"
                      )}
                    >
                      {exp.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {exp.description}
                    </p>
                    
                    {/* Feeling Tag */}
                    <span
                      className={cn(
                        "inline-block px-4 py-1 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-500",
                        activeStep === index
                          ? "bg-gold/20 text-foreground"
                          : "bg-secondary text-muted-foreground"
                      )}
                    >
                      {exp.feeling}
                    </span>
                  </div>

                  {/* Active indicator dot */}
                  <div
                    className={cn(
                      "absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-all duration-500",
                      activeStep === index
                        ? "bg-gold scale-100"
                        : "bg-border scale-75"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl glass gold-hover">
            <span className="text-5xl animate-float">🧴</span>
            <p className="text-xl font-light">
              ¿Lista para <span className="italic text-gold-gradient">transformar</span> tu rutina?
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
