import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BotOverview } from "@/components/bot-overview"
import { CommandManager } from "@/components/command-manager"
import { MessageHandler } from "@/components/message-handler"
import { BotSettings } from "@/components/bot-settings"
import { Analytics } from "@/components/analytics"
import { ImageGenerator } from "@/components/image-generator"
import { CharacterCreator } from "@/components/character-creator"
import { Hero } from "@/components/hero"
import { FeaturedCharacters } from "@/components/featured-characters"
import { Features } from "@/components/features"
import { PricingSection } from "@/components/pricing-section"
import { CommunityGallery } from "@/components/community-gallery"
import { Footer } from "@/components/footer"

export default function BotDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Hero />
      <FeaturedCharacters />
      <Features />
      <PricingSection />
      <CommunityGallery />
      <Footer />

      <div className="container mx-auto p-6 space-y-6 mt-24">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bot Dashboard</h1>
            <p className="text-muted-foreground">Manage your bot, commands, and monitor performance</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="commands">Commands</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="characters">Characters</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <BotOverview />
          </TabsContent>

          <TabsContent value="commands" className="space-y-4">
            <CommandManager />
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <MessageHandler />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Analytics />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <BotSettings />
          </TabsContent>

          <TabsContent value="images" className="space-y-4">
            <ImageGenerator />
          </TabsContent>

          <TabsContent value="characters" className="space-y-4">
            <CharacterCreator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
