"use client"

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
  isNew?: boolean
  isBestseller?: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: "Bronceador corporal natural",
    description: "Bronceador corporal natural que realza el tono de la piel mientras la hidrata, logrando un acabado uniforme, luminoso y no grasoso.",
    price: 60.000,
    category: "cuerpo",
    rating: 5,
    isNew: true,
  },
  {
    id: 2,
    name: "Aceite corporal",
    description: "Aceite corporal 100% natural que hidrata profundamente la piel, dejándola suave y nutrida. Elaborado con aceite de coco y esencias naturales que aportan un aroma agradable y duradero.",
    price: 70.000,
    category: "cuerpo",
    rating: 4.8,
    isBestseller: true,
  },
  {
    id: 3,
    name: "Mantequilla corporal",
    description: "Mantequilla corporal de textura cremosa que nutre intensamente la piel seca, ayudando a mejorar su suavidad y apariencia. Ideal para uso diario, especialmente en zonas resecas.",
    price: 80.000,
    category: "cuerpo",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Kit esencial de viaje",
    description: "Kit práctico con productos naturales en tamaño ideal para llevar a cualquier lugar. Incluye bronceador corporal, aceite hidratante y mantequilla corporal, diseñados para mantener la piel suave, nutrida y con un tono luminoso.",
    price: 80.000,
    category: "cuerpo",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Cepillo aplicador corporal",
    description: "Cepillo diseñado para facilitar la aplicación de aceites y bronceadores en la piel, permitiendo una distribución más uniforme del producto. Sus cerdas suaves ayudan a esparcir sin dejar exceso y mejoran la experiencia de uso.",
    price: 80.000,
    category: "cuerpo",
    rating: 4.9,
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

  const filteredProducts = activeCategory === "todos" 
    ? products 
    : products.filter(p => p.category === activeCategory)

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    )
  }

  return (
    <section id="productos" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium tracking-widest uppercase text-gold mb-4">
            Colección
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Sea <span className="italic text-gold-gradient">Breeze</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            Cada producto es una experiencia sensorial única, creada con los ingredientes 
            más puros del trópico.
          </p>
        </div>

        {/* Filters */}
        {/* <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-foreground/70 hover:bg-secondary hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div> */}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl glass gold-hover p-6 h-full flex flex-col">
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2 z-10">
                  {product.isNew && (
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      Nuevo
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="px-3 py-1 bg-gold/20 text-foreground text-xs font-medium rounded-full">
                      Más vendido
                    </span>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card/80 hover:bg-card transition-colors"
                >
                  <Heart 
                    className={cn(
                      "w-4 h-4 transition-colors",
                      favorites.includes(product.id) 
                        ? "fill-primary text-primary" 
                        : "text-foreground/50"
                    )} 
                  />
                </button>

                {/* Product Image Placeholder */}
                <div className="relative aspect-square mb-6 rounded-xl bg-gradient-to-br from-secondary via-card to-secondary overflow-hidden">
                  {/* Shimmer effect on hover */}
                  <div 
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent transition-transform duration-700",
                      hoveredId === product.id ? "translate-x-full" : "-translate-x-full"
                    )}
                  />
                  
                  {/* Product visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-24 h-32 rounded-2xl bg-gradient-to-b from-gold/30 to-gold/10 transform group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl transform group-hover:rotate-12 transition-transform duration-500">
                          {product.category === "rostro" ? "✨" : product.category === "cuerpo" ? "🌿" : "💫"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-3 h-3",
                          i < Math.floor(product.rating) 
                            ? "fill-gold text-gold" 
                            : "text-border"
                        )}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                      ({product.rating})
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-gold-gradient transition-all duration-300">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price & Add to Cart */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <span className="text-2xl font-light">
                      ${product.price.toFixed(3)}
                    </span>
                    
                    <Button
                      size="sm"
                      onClick={() => onAddToCart(product)}
                      className="group/btn relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 rounded-full px-4 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      <span>Añadir</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-10 py-6 text-base tracking-wide border-foreground/20 hover:border-gold hover:text-gold transition-all duration-300"
          >
            Pronto vendrán más productos ❤️
          </Button>
        </div>
      </div>
    </section>
  )
}

export type { Product }
