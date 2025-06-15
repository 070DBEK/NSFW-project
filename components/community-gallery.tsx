import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share, Eye } from "lucide-react"

export function CommunityGallery() {
  const galleryItems = [
    {
      id: 1,
      image: "/placeholder.svg?height=300&width=300",
      title: "Mystical Forest",
      character: "Luna",
      likes: 234,
      comments: 45,
      views: 1200,
      tags: ["Fantasy", "Nature", "Magic"],
    },
    {
      id: 2,
      image: "/placeholder.svg?height=300&width=300",
      title: "Cyberpunk City",
      character: "Zara",
      likes: 189,
      comments: 32,
      views: 890,
      tags: ["Sci-Fi", "Neon", "Future"],
    },
    {
      id: 3,
      image: "/placeholder.svg?height=300&width=300",
      title: "Romantic Sunset",
      character: "Aria",
      likes: 456,
      comments: 78,
      views: 2100,
      tags: ["Romance", "Sunset", "Love"],
    },
    {
      id: 4,
      image: "/placeholder.svg?height=300&width=300",
      title: "Anime Adventure",
      character: "Sakura",
      likes: 321,
      comments: 56,
      views: 1500,
      tags: ["Anime", "Adventure", "Cute"],
    },
    {
      id: 5,
      image: "/placeholder.svg?height=300&width=300",
      title: "Dark Castle",
      character: "Viktor",
      likes: 167,
      comments: 23,
      views: 750,
      tags: ["Dark", "Gothic", "Mystery"],
    },
    {
      id: 6,
      image: "/placeholder.svg?height=300&width=300",
      title: "Space Explorer",
      character: "Zara",
      likes: 298,
      comments: 41,
      views: 1100,
      tags: ["Space", "Explorer", "Stars"],
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Jamiyat Galereyasi</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Foydalanuvchilar tomonidan yaratilgan eng go'zal rasmlar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <Card
              key={item.id}
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group overflow-hidden"
            >
              <div className="relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-black/50 text-white">{item.character}</Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>

                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-white/20 text-white text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-300">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>{item.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span>{item.comments}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
            Ko'proq Ko'rish
          </Button>
        </div>
      </div>
    </section>
  )
}
