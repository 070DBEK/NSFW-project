import { Button } from "@/components/ui/button"
import { Sparkles, MessageCircle, ImageIcon } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <div className="relative overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-3xl" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10" />

      <div className="relative container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-white text-sm">AI Character Chat Platform</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Dream with
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              AI Characters
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Cheklanmagan AI character suhbatlari, real vaqtda rasm yaratish va hissiy bog'lanishlar. Sizning
            orzularingiz haqiqatga aylanadi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
              asChild
            >
              <Link href="/chat">
                <MessageCircle className="h-5 w-5 mr-2" />
                Bepul Boshlash
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
              asChild
            >
              <Link href="/gallery">
                <ImageIcon className="h-5 w-5 mr-2" />
                Galereyani Ko'rish
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500K+</div>
              <div className="text-gray-400 text-sm">Foydalanuvchilar</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">1M+</div>
              <div className="text-gray-400 text-sm">Suhbatlar</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">100+</div>
              <div className="text-gray-400 text-sm">AI Characterlar</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">2M+</div>
              <div className="text-gray-400 text-sm">Yaratilgan Rasmlar</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
