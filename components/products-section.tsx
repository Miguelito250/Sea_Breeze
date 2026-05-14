"use client"

import Image from "next/image"
import { useState } from "react"
import { Plus, Star, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  rating: number
  image?: string
  isNew?: boolean
  isBestseller?: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: "Bronceador corporal natural",
    description:
      "Bronceador corporal natural que realza el tono de la piel mientras la hidrata, logrando un acabado uniforme, luminoso y no grasoso.",
    price: 40.0,
    category: "cuerpo",
    rating: 5,
    image: "/Bronceador.webp",
    isNew: true,
  },
  {
    id: 2,
    name: "Aceite corporal",
    description:
      "Aceite corporal 100% natural que hidrata profundamente la piel, dejándola suave y nutrida. Elaborado con aceite de coco y esencias naturales que aportan un aroma agradable y duradero.",
    price: 32.0,
    category: "cuerpo",
    rating: 4.8,
    image: "/Aceite.webp",
    isBestseller: true,
  },
  {
    id: 3,
    name: "Mantequilla corporal",
    description:
      "Mantequilla corporal de textura cremosa que nutre intensamente la piel seca, ayudando a mejorar su suavidad y apariencia. Ideal para uso diario, especialmente en zonas resecas.",
    price: 35.0,
    category: "cuerpo",
    rating: 4.9,
    image: "/Mantequilla.webp",
  },
  {
    id: 4,
    name: "Kit esencial de viaje",
    description:
      "Kit práctico con productos naturales en tamaño ideal para llevar a cualquier lugar. Incluye bronceador corporal, aceite hidratante y mantequilla corporal, diseñados para mantener la piel suave, nutrida y con un tono luminoso.",
    price: 85.0,
    category: "cuerpo",
    rating: 4.9,
    image: "/Kit.webp",
  },
  {
    id: 5,
    name: "Cepillo aplicador corporal",
    description:
      "Cepillo diseñado para facilitar la aplicación de aceites y bronceadores en la piel, permitiendo una distribución más uniforme del producto. Sus cerdas suaves ayudan a esparcir sin dejar exceso y mejoran la experiencia de uso.",
    price: 12.0,
    category: "cuerpo",
    rating: 4.9,
    image: "/Cepillo.webp",
  },
]

const categories = ["todos", "rostro", "cuerpo", "cabello"]

interface ProductsSectionProps {
  onAddToCart: (product: Product) => void
}

export function ProductsSection({ onAddToCart }: ProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("todos")
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredProducts =
    activeCategory === "todos"
      ? products
      : products.filter((p) => p.category === activeCategory)

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    )
  }

  return (
    <section id="productos" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-gold">
            Colección
          </span>
          <h2 className="mb-6 text-4xl font-light md:text-5xl lg:text-6xl">
            Sea <span className="italic text-gold-gradient">Breeze</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
            Cada producto es una experiencia sensorial única, creada con los
            ingredientes más puros del trópico.
          </p>
        </div>

        {/* <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-foreground/70 hover:bg-secondary hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div> */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl glass gold-hover p-6">
                <div className="absolute left-4 top-4 z-10 flex gap-2">
                  {product.isNew && (
                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                      Nuevo
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-foreground">
                      Más vendido
                    </span>
                  )}
                </div>

                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute right-4 top-4 z-10 rounded-full bg-card/80 p-2 transition-colors hover:bg-card"
                >
                  <Heart
                    className={cn(
                      "h-4 w-4 transition-colors",
                      favorites.includes(product.id)
                        ? "fill-primary text-primary"
                        : "text-foreground/50"
                    )}
                  />
                </button>

                <div className="relative mb-6 aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-secondary via-card to-secondary">
                  <div
                    className={cn(
                      "absolute inset-0 z-[1] bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-700",
                      hoveredId === product.id
                        ? "translate-x-full"
                        : "-translate-x-full"
                    )}
                  />

                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="h-32 w-24 rounded-2xl bg-gradient-to-b from-gold/30 to-gold/10 transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl transition-transform duration-500 group-hover:rotate-12">
                            {product.category === "rostro"
                              ? "✨"
                              : product.category === "cuerpo"
                                ? "🌿"
                                : "💫"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="mb-2 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3 w-3",
                          i < Math.floor(product.rating)
                            ? "fill-gold text-gold"
                            : "text-border"
                        )}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({product.rating})
                    </span>
                  </div>

                  <h3 className="mb-2 text-xl font-semibold transition-all duration-300 group-hover:text-gold-gradient">
                    {product.name}
                  </h3>

                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                    <span className="text-2xl font-light">
                      ${product.price.toFixed(3)}
                    </span>

                    <Button
                      size="sm"
                      onClick={() => onAddToCart(product)}
                      className="group/btn relative cursor-pointer overflow-hidden rounded-full bg-foreground px-4 text-background hover:bg-foreground/90"
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      <span>Añadir</span>
                      <div className="absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 transition-transform duration-700 group-hover/btn:translate-x-[200%]" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-foreground/20 px-10 py-6 text-base tracking-wide transition-all duration-300 hover:border-gold hover:text-gold"
          >
            Pronto vendrán más productos ❤️
          </Button>
        </div>
      </div>
    </section>
  )
}

export type { Product }
