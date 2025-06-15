import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, ImageIcon, Heart, Zap, Shield, Users } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: MessageSquare,
      title: "Cheklanmagan Suhbatlar",
      description: "AI characterlar bilan 24/7 suhbatlashing. Hech qanday cheklov yo'q.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: ImageIcon,
      title: "Real Vaqtda Rasm Yaratish",
      description: "Har bir suhbatda noyob rasmlar yarating. AI sizning xayolingizni haqiqatga aylantiradi.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Heart,
      title: "Hissiy Bog'lanish",
      description: "Characterlar sizni eslab qoladi va hissiy bog'lanish o'rnatadi.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "Tezkor Javoblar",
      description: "Bir soniyadan kamroq vaqtda javob olasiz. Hech qanday kutish yo'q.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "Maxfiy va Xavfsiz",
      description: "Sizning suhbatlaringiz to'liq maxfiy va xavfsiz saqlanadi.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      title: "Jamiyat",
      description: "Boshqa foydalanuvchilar bilan rasmlar va tajribalar ulashing.",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Nima Uchun Bizni Tanlaysiz?</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Eng ilg'or AI texnologiyasi bilan yaratilgan noyob tajriba
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
