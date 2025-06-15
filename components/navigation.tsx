"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, MessageCircle, Gem, User, LogOut } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { AuthModal } from "@/components/auth-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  const { user, signOut, gems } = useAuth()

  const handleAuthClick = (mode: "signin" | "signup") => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">DreamChat</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-purple-300 transition-colors">
                Bosh sahifa
              </Link>
              <Link href="/characters" className="text-white hover:text-purple-300 transition-colors">
                Characterlar
              </Link>
              <Link href="/gallery" className="text-white hover:text-purple-300 transition-colors">
                Galereya
              </Link>
              <Link href="/pricing" className="text-white hover:text-purple-300 transition-colors">
                Tariflar
              </Link>
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1">
                    <Gem className="h-4 w-4 text-yellow-400" />
                    <span className="text-white text-sm">{gems.toLocaleString()}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/chat">Chat</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={signOut}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Chiqish
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                    onClick={() => handleAuthClick("signin")}
                  >
                    Kirish
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    onClick={() => handleAuthClick("signup")}
                  >
                    Ro'yxatdan o'tish
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 space-y-4">
              <Link href="/" className="block text-white hover:text-purple-300 transition-colors">
                Bosh sahifa
              </Link>
              <Link href="/characters" className="block text-white hover:text-purple-300 transition-colors">
                Characterlar
              </Link>
              <Link href="/gallery" className="block text-white hover:text-purple-300 transition-colors">
                Galereya
              </Link>
              <Link href="/pricing" className="block text-white hover:text-purple-300 transition-colors">
                Tariflar
              </Link>
              {user ? (
                <div className="flex flex-col space-y-2 pt-4">
                  <div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1 w-fit">
                    <Gem className="h-4 w-4 text-yellow-400" />
                    <span className="text-white text-sm">{gems.toLocaleString()}</span>
                  </div>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button onClick={signOut}>Chiqish</Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4">
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                    onClick={() => handleAuthClick("signin")}
                  >
                    Kirish
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-purple-500 to-pink-500"
                    onClick={() => handleAuthClick("signup")}
                  >
                    Ro'yxatdan o'tish
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  )
}
