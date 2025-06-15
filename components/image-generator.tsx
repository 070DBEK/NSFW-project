"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Wand2, Download, Share, Trash2, Settings, Sparkles } from "lucide-react"

interface GeneratedImage {
  id: string
  prompt: string
  style: string
  size: string
  url: string
  createdAt: Date
  likes: number
}

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("realistic")
  const [size, setSize] = useState("1024x1024")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([
    {
      id: "1",
      prompt: "A beautiful sunset over mountains",
      style: "realistic",
      size: "1024x1024",
      url: "/placeholder.svg?height=300&width=300",
      createdAt: new Date(Date.now() - 3600000),
      likes: 15,
    },
    {
      id: "2",
      prompt: "Cyberpunk city at night",
      style: "cyberpunk",
      size: "1024x1024",
      url: "/placeholder.svg?height=300&width=300",
      createdAt: new Date(Date.now() - 7200000),
      likes: 23,
    },
    {
      id: "3",
      prompt: "Cute anime character with blue hair",
      style: "anime",
      size: "512x512",
      url: "/placeholder.svg?height=300&width=300",
      createdAt: new Date(Date.now() - 10800000),
      likes: 31,
    },
  ])

  const imageStyles = [
    { value: "realistic", label: "Realistic", description: "Photorealistic images" },
    { value: "anime", label: "Anime", description: "Japanese animation style" },
    { value: "cartoon", label: "Cartoon", description: "Cartoon/comic style" },
    { value: "cyberpunk", label: "Cyberpunk", description: "Futuristic neon style" },
    { value: "fantasy", label: "Fantasy", description: "Magical and mystical" },
    { value: "abstract", label: "Abstract", description: "Abstract art style" },
    { value: "pixel", label: "Pixel Art", description: "8-bit pixel style" },
    { value: "oil", label: "Oil Painting", description: "Classical oil painting" },
  ]

  const imageSizes = [
    { value: "512x512", label: "Square (512x512)" },
    { value: "1024x1024", label: "Large Square (1024x1024)" },
    { value: "1024x768", label: "Landscape (1024x768)" },
    { value: "768x1024", label: "Portrait (768x1024)" },
    { value: "1920x1080", label: "HD Landscape (1920x1080)" },
    { value: "1080x1920", label: "HD Portrait (1080x1920)" },
  ]

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt,
        style,
        size,
        url: "/placeholder.svg?height=300&width=300",
        createdAt: new Date(),
        likes: 0,
      }

      setGeneratedImages([newImage, ...generatedImages])
      setIsGenerating(false)
      setPrompt("")
    }, 3000)
  }

  const handleDeleteImage = (id: string) => {
    setGeneratedImages(generatedImages.filter((img) => img.id !== id))
  }

  const handleLikeImage = (id: string) => {
    setGeneratedImages(generatedImages.map((img) => (img.id === id ? { ...img, likes: img.likes + 1 } : img)))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center">
          <ImageIcon className="h-6 w-6 mr-2" />
          Image Generator
        </h2>
        <p className="text-muted-foreground">Create amazing images with AI for your bot</p>
      </div>

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wand2 className="h-4 w-4 mr-2" />
                Create New Image
              </CardTitle>
              <CardDescription>Describe what you want to create</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="prompt">Image Description</Label>
                <Textarea
                  id="prompt"
                  placeholder="A beautiful landscape with mountains and a lake at sunset..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="style">Art Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {imageStyles.map((styleOption) => (
                        <SelectItem key={styleOption.value} value={styleOption.value}>
                          <div>
                            <div className="font-medium">{styleOption.label}</div>
                            <div className="text-xs text-muted-foreground">{styleOption.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="size">Image Size</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {imageSizes.map((sizeOption) => (
                        <SelectItem key={sizeOption.value} value={sizeOption.value}>
                          {sizeOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleGenerateImage} disabled={!prompt.trim() || isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Image
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Images</CardTitle>
              <CardDescription>Your AI-generated image collection</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {generatedImages.map((image) => (
                    <Card key={image.id} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.prompt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Badge variant="secondary" className="text-xs">
                            {image.style}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <p className="text-sm font-medium line-clamp-2 mb-2">{image.prompt}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span>{image.size}</span>
                          <span>{image.createdAt.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Button size="sm" variant="ghost" onClick={() => handleLikeImage(image.id)}>
                              ❤️ {image.likes}
                            </Button>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost">
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Share className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteImage(image.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Image Generation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Default Style</Label>
                <Select defaultValue="realistic">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {imageStyles.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Quality</Label>
                <Select defaultValue="high">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (Fast)</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High (Slow)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="apiKey">AI Service API Key</Label>
                <Input id="apiKey" type="password" placeholder="Enter your API key..." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
