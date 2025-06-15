"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, ImageIcon, Heart, Settings, Sparkles, ArrowLeft } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { generateChatResponse } from "@/lib/actions/chat"
import { generateImage } from "@/lib/actions/image"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Gem } from "lucide-react" // Import Gem component

interface Message {
  id: string
  content: string
  sender: "user" | "character"
  timestamp: Date
  image?: string
  characterName?: string
}

interface Character {
  id: string
  name: string
  title: string
  avatar: string
  personality: string
  mood: string
  affectionLevel: number
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const { user, gems, updateGems } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const characters: Character[] = [
    {
      id: "1",
      name: "Luna",
      title: "Mystical Advisor",
      avatar: "/placeholder.svg?height=100&width=100",
      personality: "Wise, mystical, caring, and always ready to help with deep questions about life and spirituality.",
      mood: "Friendly",
      affectionLevel: 75,
    },
    {
      id: "2",
      name: "Aria",
      title: "Romantic Partner",
      avatar: "/placeholder.svg?height=100&width=100",
      personality: "Sweet, romantic, understanding, and deeply caring about your emotions and feelings.",
      mood: "Loving",
      affectionLevel: 85,
    },
    {
      id: "3",
      name: "Sakura",
      title: "Anime Companion",
      avatar: "/placeholder.svg?height=100&width=100",
      personality: "Cheerful, energetic, cute, and always excited to talk about anime, manga, and Japanese culture.",
      mood: "Excited",
      affectionLevel: 60,
    },
  ]

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }

    // Set default character
    if (!selectedCharacter) {
      setSelectedCharacter(characters[0])
      setMessages([
        {
          id: "1",
          content: `Salom! Men ${characters[0].name}. Sizga qanday yordam bera olaman?`,
          sender: "character",
          timestamp: new Date(),
          characterName: characters[0].name,
        },
      ])
    }
  }, [user, selectedCharacter])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedCharacter || loading) return

    if (gems < 1) {
      toast({
        title: "Gems yetarli emas",
        description: "Xabar yuborish uchun kamida 1 gem kerak",
        variant: "destructive",
      })
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setLoading(true)
    updateGems(-1)

    try {
      const response = await generateChatResponse(
        newMessage,
        selectedCharacter.name,
        selectedCharacter.personality,
        messages.slice(-5), // Last 5 messages for context
      )

      const characterMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "character",
        timestamp: new Date(),
        characterName: selectedCharacter.name,
      }

      setMessages((prev) => [...prev, characterMessage])
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Xabar yuborishda xatolik yuz berdi",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRequestImage = async () => {
    if (!selectedCharacter || imageLoading) return

    if (gems < 5) {
      toast({
        title: "Gems yetarli emas",
        description: "Rasm yaratish uchun 5 gem kerak",
        variant: "destructive",
      })
      return
    }

    setImageLoading(true)
    updateGems(-5)

    try {
      const prompt = `Beautiful portrait of ${selectedCharacter.name}, ${selectedCharacter.title}, anime style, high quality`
      const imageUrl = await generateImage(prompt)

      const imageMessage: Message = {
        id: Date.now().toString(),
        content: `${selectedCharacter.name} sizga maxsus rasm yaratdi!`,
        sender: "character",
        timestamp: new Date(),
        characterName: selectedCharacter.name,
        image: imageUrl,
      }

      setMessages((prev) => [...prev, imageMessage])

      toast({
        title: "Rasm yaratildi!",
        description: "Yangi rasm muvaffaqiyatli yaratildi",
      })
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Rasm yaratishda xatolik yuz berdi",
        variant: "destructive",
      })
      updateGems(5) // Refund gems on error
    } finally {
      setImageLoading(false)
    }
  }

  const handleGiveGift = () => {
    if (gems < 10) {
      toast({
        title: "Gems yetarli emas",
        description: "Gift berish uchun 10 gem kerak",
        variant: "destructive",
      })
      return
    }

    updateGems(-10)

    if (selectedCharacter) {
      setSelectedCharacter({
        ...selectedCharacter,
        affectionLevel: Math.min(100, selectedCharacter.affectionLevel + 5),
      })
    }

    const giftMessage: Message = {
      id: Date.now().toString(),
      content: `Rahmat! Bu juda go'zal sovg'a! ❤️ (Affection +5)`,
      sender: "character",
      timestamp: new Date(),
      characterName: selectedCharacter?.name,
    }

    setMessages((prev) => [...prev, giftMessage])

    toast({
      title: "Gift berildi!",
      description: "Character sizning sovg'angizdan xursand!",
    })
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-16">
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <Button
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Orqaga
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
          {/* Character Selection & Info */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 lg:col-span-1">
            <CardHeader className="text-center">
              <div className="space-y-2 mb-4">
                <select
                  className="w-full p-2 rounded bg-white/20 text-white border border-white/30"
                  value={selectedCharacter?.id || ""}
                  onChange={(e) => {
                    const character = characters.find((c) => c.id === e.target.value)
                    if (character) {
                      setSelectedCharacter(character)
                      setMessages([
                        {
                          id: Date.now().toString(),
                          content: `Salom! Men ${character.name}. Sizga qanday yordam bera olaman?`,
                          sender: "character",
                          timestamp: new Date(),
                          characterName: character.name,
                        },
                      ])
                    }
                  }}
                >
                  {characters.map((character) => (
                    <option key={character.id} value={character.id} className="bg-gray-800">
                      {character.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedCharacter && (
                <>
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={selectedCharacter.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedCharacter.name[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-white">{selectedCharacter.name}</CardTitle>
                  <p className="text-purple-300 text-sm">{selectedCharacter.title}</p>
                  <Badge className="bg-green-500/20 text-green-300">{selectedCharacter.mood}</Badge>
                </>
              )}
            </CardHeader>

            {selectedCharacter && (
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-white mb-2">
                    <span>Affection Level</span>
                    <span>{selectedCharacter.affectionLevel}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${selectedCharacter.affectionLevel}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    className="w-full bg-white/20 hover:bg-white/30 text-white"
                    onClick={handleRequestImage}
                    disabled={imageLoading || gems < 5}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    {imageLoading ? "Yaratilmoqda..." : "Rasm So'rash (5 gems)"}
                  </Button>
                  <Button
                    className="w-full bg-white/20 hover:bg-white/30 text-white"
                    onClick={handleGiveGift}
                    disabled={gems < 10}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Gift Berish (10 gems)
                  </Button>
                  <Button className="w-full bg-white/20 hover:bg-white/30 text-white">
                    <Settings className="h-4 w-4 mr-2" />
                    Sozlamalar
                  </Button>
                </div>

                <div className="text-center p-3 bg-white/10 rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Gem className="h-4 w-4 text-yellow-400" />
                    <span className="text-white font-medium">{gems} Gems</span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-pink-500"
                    onClick={() => router.push("/pricing")}
                  >
                    Gems Sotib Olish
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Chat Area */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 lg:col-span-3 flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white font-medium">{selectedCharacter?.name} bilan suhbat</span>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-300">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-4 p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-xs lg:max-w-md ${message.sender === "user" ? "order-2" : "order-1"}`}>
                        <div
                          className={`p-3 rounded-lg ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                              : "bg-white/20 text-white"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          {message.image && (
                            <img
                              src={message.image || "/placeholder.svg"}
                              alt="Generated"
                              className="mt-2 rounded-lg w-full"
                            />
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                      </div>
                      {message.sender === "character" && selectedCharacter && (
                        <Avatar className="w-8 h-8 order-1 mr-2">
                          <AvatarImage src={selectedCharacter.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{selectedCharacter.name[0]}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-white/20 text-white p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Xabar yozing... (1 gem)"
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder-gray-400"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={loading || gems < 1}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-purple-500 to-pink-500"
                  disabled={loading || gems < 1}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
