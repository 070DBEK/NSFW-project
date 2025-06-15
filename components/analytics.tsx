import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, MessageSquare, Command, Clock } from "lucide-react"

export function Analytics() {
  const analyticsData = {
    totalUsers: 1234,
    activeUsers: 892,
    totalMessages: 15678,
    commandsUsed: 3456,
    uptime: 99.9,
    responseTime: 0.3,
    topCommands: [
      { name: "/help", usage: 245, percentage: 35 },
      { name: "/status", usage: 156, percentage: 22 },
      { name: "/info", usage: 89, percentage: 13 },
      { name: "/settings", usage: 67, percentage: 10 },
      { name: "/about", usage: 45, percentage: 6 },
    ],
    userActivity: [
      { hour: "00:00", users: 45 },
      { hour: "06:00", users: 123 },
      { hour: "12:00", users: 456 },
      { hour: "18:00", users: 789 },
      { hour: "23:00", users: 234 },
    ],
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Monitor your bot's performance and usage</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalUsers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.activeUsers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalMessages.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15% from last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commands Used</CardTitle>
            <Command className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.commandsUsed.toLocaleString()}</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -3% from last week
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Uptime</span>
                <span>{analyticsData.uptime}%</span>
              </div>
              <Progress value={analyticsData.uptime} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Response Time</span>
                <span>{analyticsData.responseTime}s</span>
              </div>
              <div className="text-xs text-muted-foreground">Average response time for commands</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Commands</CardTitle>
            <CardDescription>Most frequently used commands</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.topCommands.map((command, index) => (
                <div key={command.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{index + 1}</Badge>
                    <span className="font-mono text-sm">{command.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{command.usage}</span>
                    <div className="w-16">
                      <Progress value={command.percentage} className="h-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
          <CardDescription>Active users throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.userActivity.map((activity) => (
              <div key={activity.hour} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-mono">{activity.hour}</div>
                <div className="flex-1">
                  <Progress value={(activity.users / 800) * 100} className="h-3" />
                </div>
                <div className="w-16 text-sm text-right">{activity.users} users</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
