"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  userId?: string
}

export function MessageHandler() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "2",
      content: "/help",
      sender: "user",
      timestamp: new Date(Date.now() - 240000),
      userId: "user123",
    },
    {
      id: "3",
      content: "Here are the available commands: /help, /status, /info",
      sender: "bot",
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: "4",
      content: "/status",
      sender: "user",
      timestamp: new Date(Date.now() - 120000),
      userId: "user456",
    },
    {
      id: "5",
      content: "Bot is running normally. Uptime: 99.9%",
      sender: "bot",
      timestamp: new Date(Date.now() - 60000),
    },
  ])

  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
      userId: "admin",
    }

    setMessages([...messages, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Message received and processed.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setNewMessage("")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Message Handler</h2>
        <p className="text-muted-foreground">Monitor and test bot conversations</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">User Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.filter((m) => m.sender === "user").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Bot Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.filter((m) => m.sender === "bot").length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Chat</CardTitle>
          <CardDescription>Test your bot in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ScrollArea className="h-96 w-full border rounded-md p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-2 ${
                      message.sender === "bot" ? "" : "flex-row-reverse space-x-reverse"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === "bot" ? "bg-blue-100" : "bg-green-100"
                      }`}
                    >
                      {message.sender === "bot" ? (
                        <Bot className="h-4 w-4 text-blue-600" />
                      ) : (
                        <User className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div className={`flex-1 max-w-xs ${message.sender === "bot" ? "" : "text-right"}`}>
                      <div
                        className={`inline-block p-3 rounded-lg ${
                          message.sender === "bot" ? "bg-gray-100 text-gray-900" : "bg-blue-500 text-white"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</p>
                        {message.userId && (
                          <Badge variant="outline" className="text-xs">
                            {message.userId}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message to test the bot..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
