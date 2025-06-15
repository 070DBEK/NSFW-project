import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Crown, Zap } from "lucide-react"

export function PricingSection() {
  const plans = [
    {
      name: "Bepul",
      price: "0",
      period: "doimiy",
      description: "Boshlash uchun mukammal",
      features: [
        "Kuniga 10 ta suhbat",
        "5 ta asosiy character",
        "Oddiy rasm yaratish",
        "Jamiyat galereyasi",
        "Asosiy qo'llab-quvvatlash",
      ],
      buttonText: "Bepul Boshlash",
      popular: false,
      icon: Star,
      color: "from-gray-500 to-gray-600",
    },
    {
      name: "Plus",
      price: "9.99",
      period: "oyiga",
      gems: "600 Gems",
      description: "Ko'proq imkoniyatlar",
      features: [
        "Cheklanmagan suhbatlar",
        "20+ premium character",
        "HD rasm yaratish",
        "Character xotirasi",
        "Tezkor qo'llab-quvvatlash",
        "Maxsus effektlar",
      ],
      buttonText: "Plus Olish",
      popular: true,
      icon: Zap,
      color: "from-blue-500 to-purple-600",
    },
    {
      name: "Astro",
      price: "19.99",
      period: "oyiga",
      gems: "1500 Gems",
      description: "Professional foydalanuvchilar uchun",
      features: [
        "Barcha Plus imkoniyatlari",
        "50+ eksklyuziv character",
        "4K rasm yaratish",
        "Voice chat (tez orada)",
        "Shaxsiy character yaratish",
        "Priority qo'llab-quvvatlash",
      ],
      buttonText: "Astro Olish",
      popular: false,
      icon: Crown,
      color: "from-purple-500 to-pink-600",
    },
    {
      name: "Luna",
      price: "99.99",
      period: "oyiga",
      gems: "11790 Gems",
      description: "Maksimal tajriba",
      features: [
        "Barcha Astro imkoniyatlari",
        "Cheklanmagan premium content",
        "Maxsus NSFW characterlar",
        "Video chat (tez orada)",
        "API kirish",
        "24/7 shaxsiy qo'llab-quvvatlash",
      ],
      buttonText: "Luna Olish",
      popular: false,
      icon: Crown,
      color: "from-pink-500 to-red-600",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Sizga Mos Tarifni Tanlang</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Har qanday ehtiyoj uchun moslashuvchan narxlash</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 ${plan.popular ? "ring-2 ring-purple-500" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">Mashhur</Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <plan.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-300">/{plan.period}</span>
                </div>
                {plan.gems && (
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                    {plan.gems}
                  </Badge>
                )}
                <p className="text-gray-300 text-sm">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <Check className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700" : "bg-white/20 hover:bg-white/30"} text-white`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-300 mb-4">Gems bilan mikro-transaksiyalar ham mavjud</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="border-white/30 text-white">
              600 Gems = $9.99
            </Badge>
            <Badge variant="outline" className="border-white/30 text-white">
              1500 Gems = $19.99
            </Badge>
            <Badge variant="outline" className="border-white/30 text-white">
              3500 Gems = $39.99
            </Badge>
            <Badge variant="outline" className="border-white/30 text-white">
              11790 Gems = $99.99
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
