"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "signin" | "signup"
  onModeChange: (mode: "signin" | "signup") => void
}

export function AuthModal({ isOpen, onClose, mode, onModeChange }: AuthModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === "signin") {
        await signIn(email, password)
        toast({
          title: "Muvaffaqiyatli kirish",
          description: "Xush kelibsiz!",
        })
      } else {
        await signUp(email, password, username)
        toast({
          title: "Ro'yxatdan o'tish muvaffaqiyatli",
          description: "Emailingizni tasdiqlang",
        })
      }
      onClose()
    } catch (error: any) {
      toast({
        title: "Xatolik",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "signin" ? "Tizimga kirish" : "Ro'yxatdan o'tish"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <Label htmlFor="username">Foydalanuvchi nomi</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div>
            <Label htmlFor="password">Parol</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Yuklanmoqda..." : mode === "signin" ? "Kirish" : "Ro'yxatdan o'tish"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-muted-foreground hover:underline"
              onClick={() => onModeChange(mode === "signin" ? "signup" : "signin")}
            >
              {mode === "signin" ? "Hisobingiz yo'qmi? Ro'yxatdan o'ting" : "Hisobingiz bormi? Kirish"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
