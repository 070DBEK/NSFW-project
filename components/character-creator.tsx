"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { User, Wand2, Save, Edit, Trash2, Download, Sparkles, Heart, Zap } from "lucide-react"

interface Character {
  id: string
  name: string
  description: string
  personality: string
  appearance: string
  backstory: string
  avatar: string
  traits: string[]
  stats: {
    strength: number
    intelligence: number
    charisma: number
    creativity: number
  }
  createdAt: Date
  isActive: boolean
}

export function CharacterCreator() {
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: "1",
      name: "Luna the Wise",
      description: "A mystical advisor with ancient knowledge",
      personality: "Wise, patient, mysterious, helpful",
      appearance: "Silver hair, glowing blue eyes, flowing robes",
      backstory: "An ancient sage who has lived for centuries, guiding travelers",
      avatar: "/placeholder.svg?height=100&width=100",
      traits: ["Wise", "Mystical", "Patient", "Knowledgeable"],
      stats: { strength: 60, intelligence: 95, charisma: 80, creativity: 85 },
      createdAt: new Date(Date.now() - 86400000),
      isActive: true,
    },
    {
      id: "2",
      name: "Rex the Brave",
      description: "A courageous warrior with a noble heart",
      personality: "Brave, loyal, protective, determined",
      appearance: "Tall, muscular, golden armor, fierce eyes",
      backstory: "A knight who protects the innocent and fights for justice",
      avatar: "/placeholder.svg?height=100&width=100",
      traits: ["Brave", "Strong", "Loyal", "Protective"],
      stats: { strength: 90, intelligence: 70, charisma: 75, creativity: 60 },
      createdAt: new Date(Date.now() - 172800000),
      isActive: false,
    },
  ])

  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null)
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    description: "",
    personality: "",
    appearance: "",
    backstory: "",
    traits: [] as string[],
    stats: { strength: 50, intelligence: 50, charisma: 50, creativity: 50 },
  })

  const characterTraits = [
    "Wise",
    "Brave",
    "Funny",
    "Mysterious",
    "Kind",
    "Fierce",
    "Calm",
    "Energetic",
    "Loyal",
    "Creative",
    "Strong",
    "Intelligent",
    "Charming",
    "Protective",
    "Curious",
    "Adventurous",
    "Gentle",
    "Bold",
    "Witty",
    "Compassionate",
  ]

  const handleCreateCharacter = () => {
    if (!newCharacter.name.trim()) return

    const character: Character = {
      id: Date.now().toString(),
      ...newCharacter,
      avatar: "/placeholder.svg?height=100&width=100",
      createdAt: new Date(),
      isActive: false,
    }

    setCharacters([character, ...characters])
    setNewCharacter({
      name: "",
      description: "",
      personality: "",
      appearance: "",
      backstory: "",
      traits: [],
      stats: { strength: 50, intelligence: 50, charisma: 50, creativity: 50 },
    })
  }

  const handleDeleteCharacter = (id: string) => {
    setCharacters(characters.filter((char) => char.id !== id))
  }

  const handleToggleActive = (id: string) => {
    setCharacters(characters.map((char) => (char.id === id ? { ...char, isActive: !char.isActive } : char)))
  }

  const handleAddTrait = (trait: string) => {
    if (!newCharacter.traits.includes(trait)) {
      setNewCharacter({
        ...newCharacter,
        traits: [...newCharacter.traits, trait],
      })
    }
  }

  const handleRemoveTrait = (trait: string) => {
    setNewCharacter({
      ...newCharacter,
      traits: newCharacter.traits.filter((t) => t !== trait),
    })
  }

  const handleStatChange = (stat: keyof typeof newCharacter.stats, value: number[]) => {
    setNewCharacter({
      ...newCharacter,
      stats: { ...newCharacter.stats, [stat]: value[0] },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center">
          <User className="h-6 w-6 mr-2" />
          Character Creator
        </h2>
        <p className="text-muted-foreground">Create unique AI characters for your bot</p>
      </div>

      <Tabs defaultValue="create" className="space-y-4">
        <TabsList>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="characters">Characters</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Character Name</Label>
                  <Input
                    id="name"
                    value={newCharacter.name}
                    onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                    placeholder="Enter character name..."
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCharacter.description}
                    onChange={(e) => setNewCharacter({ ...newCharacter, description: e.target.value })}
                    placeholder="Brief description of the character..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="personality">Personality</Label>
                  <Textarea
                    id="personality"
                    value={newCharacter.personality}
                    onChange={(e) => setNewCharacter({ ...newCharacter, personality: e.target.value })}
                    placeholder="Describe their personality traits..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Appearance & Backstory */}
            <Card>
              <CardHeader>
                <CardTitle>Appearance & Background</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="appearance">Physical Appearance</Label>
                  <Textarea
                    id="appearance"
                    value={newCharacter.appearance}
                    onChange={(e) => setNewCharacter({ ...newCharacter, appearance: e.target.value })}
                    placeholder="Describe how they look..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="backstory">Backstory</Label>
                  <Textarea
                    id="backstory"
                    value={newCharacter.backstory}
                    onChange={(e) => setNewCharacter({ ...newCharacter, backstory: e.target.value })}
                    placeholder="Their history and background..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Character Traits */}
            <Card>
              <CardHeader>
                <CardTitle>Character Traits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {characterTraits.map((trait) => (
                    <Button
                      key={trait}
                      size="sm"
                      variant={newCharacter.traits.includes(trait) ? "default" : "outline"}
                      onClick={() =>
                        newCharacter.traits.includes(trait) ? handleRemoveTrait(trait) : handleAddTrait(trait)
                      }
                    >
                      {trait}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {newCharacter.traits.map((trait) => (
                    <Badge key={trait} variant="secondary">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Character Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Character Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="flex items-center">
                        <Zap className="h-4 w-4 mr-1" />
                        Strength
                      </Label>
                      <span className="text-sm font-medium">{newCharacter.stats.strength}</span>
                    </div>
                    <Slider
                      value={[newCharacter.stats.strength]}
                      onValueChange={(value) => handleStatChange("strength", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="flex items-center">
                        <Sparkles className="h-4 w-4 mr-1" />
                        Intelligence
                      </Label>
                      <span className="text-sm font-medium">{newCharacter.stats.intelligence}</span>
                    </div>
                    <Slider
                      value={[newCharacter.stats.intelligence]}
                      onValueChange={(value) => handleStatChange("intelligence", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        Charisma
                      </Label>
                      <span className="text-sm font-medium">{newCharacter.stats.charisma}</span>
                    </div>
                    <Slider
                      value={[newCharacter.stats.charisma]}
                      onValueChange={(value) => handleStatChange("charisma", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="flex items-center">
                        <Wand2 className="h-4 w-4 mr-1" />
                        Creativity
                      </Label>
                      <span className="text-sm font-medium">{newCharacter.stats.creativity}</span>
                    </div>
                    <Slider
                      value={[newCharacter.stats.creativity]}
                      onValueChange={(value) => handleStatChange("creativity", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleCreateCharacter} className="w-full md:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Create Character
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="characters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Characters</CardTitle>
              <CardDescription>Manage your created characters</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {characters.map((character) => (
                    <Card key={character.id} className="p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={character.avatar || "/placeholder.svg"}
                          alt={character.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">{character.name}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge variant={character.isActive ? "default" : "secondary"}>
                                {character.isActive ? "Active" : "Inactive"}
                              </Badge>
                              <Button size="sm" variant="outline" onClick={() => handleToggleActive(character.id)}>
                                {character.isActive ? "Deactivate" : "Activate"}
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{character.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {character.traits.map((trait) => (
                              <Badge key={trait} variant="outline" className="text-xs">
                                {trait}
                              </Badge>
                            ))}
                          </div>
                          <div className="grid grid-cols-4 gap-2 text-xs">
                            <div className="text-center">
                              <div className="font-medium">STR</div>
                              <div>{character.stats.strength}</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium">INT</div>
                              <div>{character.stats.intelligence}</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium">CHA</div>
                              <div>{character.stats.charisma}</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium">CRE</div>
                              <div>{character.stats.creativity}</div>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteCharacter(character.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Character Templates</CardTitle>
              <CardDescription>Pre-made character templates to get started quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Wise Mentor", type: "advisor", description: "A knowledgeable guide" },
                  { name: "Brave Warrior", type: "fighter", description: "A courageous protector" },
                  { name: "Funny Companion", type: "entertainer", description: "A cheerful friend" },
                  { name: "Mysterious Oracle", type: "mystic", description: "A prophetic seer" },
                  { name: "Loyal Assistant", type: "helper", description: "A reliable aide" },
                  { name: "Creative Artist", type: "creator", description: "An imaginative soul" },
                ].map((template) => (
                  <Card key={template.name} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <Button size="sm" className="mt-2" variant="outline">
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

