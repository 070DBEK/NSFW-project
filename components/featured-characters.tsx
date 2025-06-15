"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Star, Crown } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { useState } from "react"

export function FeaturedCharacters() {
  const { user } = useAuth()
  const [likedCharacters, setLikedCharacters] = useState<Set<number>>(new Set())

  const characters = [
    {
      id: 1,
      name: "Luna",
      title: "Mystical Advisor",
      description: "Sirli va dono maslahatchi. Sizning eng chuqur savollaringizga javob beradi.",
      avatar: "/placeholder.svg?height=200&width=200",
      category: "Fantasy",
      popularity: 95,
      isPremium: false,
      traits: ["Wise", "Mystical", "Caring"],
      chatCount: "12.5K",
    },
    {
      id: 2,
      name: "Aria",
      title: "Romantic Partner",
      description: "Sevimli va g'amxo'r hamkor. Sizning hissiyotlaringizni tushunadi.",
      avatar: "/placeholder.svg?height=200&width=200",
      category: "Romance",
      popularity: 98,
      isPremium: true,
      traits: ["Romantic", "Sweet", "Understanding"],
      chatCount: "25.8K",
    },
    {
      id: 3,
      name: "Rex",
      title: "Adventure Guide",
      description: "Jasur va kuchli yo'ldosh. Har qanday sarguzashtga tayyor.",
      avatar: "/placeholder.svg?height=200&width=200",
      category: "Adventure",
      popularity: 87,
      isPremium: false,
      traits: ["Brave", "Strong", "Loyal"],
      chatCount: "8.2K",
    },
    {
      id: 4,
      name: "Sakura",
      title: "Anime Companion",
      description: "Quvnoq va energik anime qiz. Sizni doimo xursand qiladi.",
      avatar: "/placeholder.svg?height=200&width=200",
      category: "Anime",
      popularity: 92,
      isPremium: true,
      traits: ["Cheerful", "Energetic", "Cute"],
      chatCount: "18.7K",
    },
    {
      id: 5,
      name: "Viktor",
      title: "Dark Romance",
      description: "Sirli va jozibali. Qorong'u romantika sevuvchilar uchun.",
      avatar: "/placeholder.svg?height=200&width=200",
      category: "Dark",
      popularity: 89,
      isPremium: true,
      traits: ["Mysterious", "Charming", "Intense"],
      chatCount: "15.3K",
    },
    {
      id: 6,
      name: "Zara",
      title: "Sci-Fi Explorer",
      description: "Kelajakdan kelgan tadqiqotchi. Ilm-fan va texnologiya haqida.",
      avatar: "/placeholder.svg?height=200&width=200",
      category: "Sci-Fi",
      popularity: 84,
      isPremium: false,
      traits: ["Intelligent", "Curious", "Futuristic"],
      chatCount: "6.9K",
    },
  ]

  const handleLike = (characterId: number) => {
    setLikedCharacters((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(characterId)) {
        newSet.delete(characterId)
      } else {
        newSet.add(characterId)
      }
      return newSet
    })
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Mashhur AI Characterlar</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Minglab foydalanuvchilar tomonidan sevilgan characterlar bilan tanishing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <Card
              key={character.id}
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img
                    src={character.avatar || "/placeholder.svg"}
                    alt={character.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-white/30"
                  />
                  {character.isPremium && <Crown className="absolute -top-1 -right-1 h-6 w-6 text-yellow-400" />}
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{character.name}</h3>
                  <p className="text-purple-300 text-sm mb-2">{character.title}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{character.description}</p>
                </div>

                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {character.traits.map((trait) => (
                    <Badge key={trait} variant="secondary" className="bg-white/20 text-white text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-300">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{character.popularity}%</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>{character.chatCount}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    asChild
                  >
                    <Link href={user ? "/chat" : "#"}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Suhbat
                    </Link>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className={`border-white/30 hover:bg-white/10 ${
                      likedCharacters.has(character.id) ? "text-red-500 bg-red-500/20" : "text-white"
                    }`}
                    onClick={() => handleLike(character.id)}
                  >
                    <Heart className={`h-4 w-4 ${likedCharacters.has(character.id) ? "text-red-500" : "text-white"}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
