
import Link from "next/link"
import { MessageCircle, Heart, Shield, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">DreamChat</span>
            </div>
            <p className="text-gray-300 text-sm">
              AI characterlar bilan cheklanmagan suhbat va rasm yaratish platformasi. Sizning orzularingiz haqiqatga
              aylanadi.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Tezkor Havolalar</h3>
            <div className="space-y-2">
              <Link href="/characters" className="block text-gray-300 hover:text-white transition-colors">
                Characterlar
              </Link>
              <Link href="/gallery" className="block text-gray-300 hover:text-white transition-colors">
                Galereya
              </Link>
              <Link href="/pricing" className="block text-gray-300 hover:text-white transition-colors">
                Tariflar
              </Link>
              <Link href="/chat" className="block text-gray-300 hover:text-white transition-colors">
                Chat
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Yordam</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-gray-300 hover:text-white transition-colors">
                Yordam Markazi
              </Link>
              <Link href="/privacy" className="block text-gray-300 hover:text-white transition-colors">
                Maxfiylik Siyosati
              </Link>
              <Link href="/terms" className="block text-gray-300 hover:text-white transition-colors">
                Foydalanish Shartlari
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Aloqa
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Aloqa</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@dreamchat.uz</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Shield className="h-4 w-4" />
                <span className="text-sm">18+ Platform</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-300">
            <span>© 2024 DreamChat. Barcha huquqlar himoyalangan.</span>
            <Heart className="h-4 w-4 text-red-500" />
          </div>
        </div>
      </div>
    </footer>
  )
}
