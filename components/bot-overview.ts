import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, Users, MessageSquare, Activity, Play, Pause } from "lucide-react"

export function BotOverview() {
  const botStatus = "online" // This would come from your bot's actual status

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bot Status</CardTitle>
          <Bot className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Badge variant={botStatus === "online" ? "default" : "secondary"}>
              {botStatus === "online" ? "Online" : "Offline"}
            </Badge>
            <Button size="sm" variant="outline">
              {botStatus === "online" ? (
                <>
                  <Pause className="h-3 w-3 mr-1" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 mr-1" />
                  Start
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Messages Today</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5,678</div>
          <p className="text-xs text-muted-foreground">+8% from yesterday</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Commands Used</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">892</div>
          <p className="text-xs text-muted-foreground">+15% from yesterday</p>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest bot interactions and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { user: "User123", action: "Used /help command", time: "2 minutes ago" },
              { user: "BotAdmin", action: "Updated bot settings", time: "5 minutes ago" },
              { user: "User456", action: "Sent message", time: "8 minutes ago" },
              { user: "User789", action: "Used /status command", time: "12 minutes ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{activity.user}</p>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                </div>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
