"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Save, Key, Shield, Bell, Palette } from "lucide-react"

export function BotSettings() {
  const [settings, setSettings] = useState({
    botName: "MyBot",
    botDescription: "A helpful assistant bot",
    prefix: "/",
    language: "en",
    timezone: "UTC",
    autoResponse: true,
    logging: true,
    notifications: true,
    rateLimiting: true,
    maxRequestsPerMinute: 60,
    welcomeMessage: "Welcome! I'm here to help you.",
    errorMessage: "Sorry, something went wrong. Please try again.",
    theme: "default",
  })

  const [apiKeys, setApiKeys] = useState([
    { id: "1", name: "OpenAI API", key: "sk-***************", status: "active" },
    { id: "2", name: "Discord Bot Token", key: "MTk***************", status: "active" },
    { id: "3", name: "Telegram Bot Token", key: "123***************", status: "inactive" },
  ])

  const handleSaveSettings = () => {
    // Here you would save the settings to your backend
    console.log("Saving settings:", settings)
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Bot Settings</h2>
        <p className="text-muted-foreground">Configure your bot's behavior and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Basic Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="botName">Bot Name</Label>
              <Input
                id="botName"
                value={settings.botName}
                onChange={(e) => handleSettingChange("botName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="botDescription">Description</Label>
              <Textarea
                id="botDescription"
                value={settings.botDescription}
                onChange={(e) => handleSettingChange("botDescription", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="prefix">Command Prefix</Label>
              <Input
                id="prefix"
                value={settings.prefix}
                onChange={(e) => handleSettingChange("prefix", e.target.value)}
                className="w-20"
              />
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={settings.language} onValueChange={(value) => handleSettingChange("language", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="uz">Uzbek</SelectItem>
                  <SelectItem value="ru">Russian</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Feature Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Features & Behavior
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="autoResponse">Auto Response</Label>
              <Switch
                id="autoResponse"
                checked={settings.autoResponse}
                onCheckedChange={(checked) => handleSettingChange("autoResponse", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="logging">Enable Logging</Label>
              <Switch
                id="logging"
                checked={settings.logging}
                onCheckedChange={(checked) => handleSettingChange("logging", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Notifications</Label>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="rateLimiting">Rate Limiting</Label>
              <Switch
                id="rateLimiting"
                checked={settings.rateLimiting}
                onCheckedChange={(checked) => handleSettingChange("rateLimiting", checked)}
              />
            </div>
            {settings.rateLimiting && (
              <div>
                <Label htmlFor="maxRequests">Max Requests per Minute</Label>
                <Input
                  id="maxRequests"
                  type="number"
                  value={settings.maxRequestsPerMinute}
                  onChange={(e) => handleSettingChange("maxRequestsPerMinute", Number.parseInt(e.target.value))}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-4 w-4 mr-2" />
              Custom Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="welcomeMessage">Welcome Message</Label>
              <Textarea
                id="welcomeMessage"
                value={settings.welcomeMessage}
                onChange={(e) => handleSettingChange("welcomeMessage", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="errorMessage">Error Message</Label>
              <Textarea
                id="errorMessage"
                value={settings.errorMessage}
                onChange={(e) => handleSettingChange("errorMessage", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="h-4 w-4 mr-2" />
              API Keys
            </CardTitle>
            <CardDescription>Manage your bot's API keys and tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{apiKey.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">{apiKey.key}</p>
                  </div>
                  <Badge variant={apiKey.status === "active" ? "default" : "secondary"}>{apiKey.status}</Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Add New API Key
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="w-full md:w-auto">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
