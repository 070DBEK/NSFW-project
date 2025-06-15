"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Command {
  id: string
  name: string
  description: string
  response: string
  enabled: boolean
  usage: number
}

export function CommandManager() {
  const [commands, setCommands] = useState<Command[]>([
    {
      id: "1",
      name: "/help",
      description: "Show available commands",
      response: "Here are the available commands: /help, /status, /info",
      enabled: true,
      usage: 245,
    },
    {
      id: "2",
      name: "/status",
      description: "Check bot status",
      response: "Bot is running normally. Uptime: 99.9%",
      enabled: true,
      usage: 156,
    },
    {
      id: "3",
      name: "/info",
      description: "Get bot information",
      response: "This is a multi-purpose bot created to help users.",
      enabled: false,
      usage: 89,
    },
  ])

  const [editingCommand, setEditingCommand] = useState<Command | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSaveCommand = (command: Command) => {
    if (editingCommand) {
      setCommands(commands.map((cmd) => (cmd.id === command.id ? command : cmd)))
    } else {
      setCommands([...commands, { ...command, id: Date.now().toString(), usage: 0 }])
    }
    setEditingCommand(null)
    setIsDialogOpen(false)
  }

  const handleDeleteCommand = (id: string) => {
    setCommands(commands.filter((cmd) => cmd.id !== id))
  }

  const toggleCommand = (id: string) => {
    setCommands(commands.map((cmd) => (cmd.id === id ? { ...cmd, enabled: !cmd.enabled } : cmd)))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Command Manager</h2>
          <p className="text-muted-foreground">Create and manage bot commands</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingCommand(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Command
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCommand ? "Edit Command" : "Add New Command"}</DialogTitle>
              <DialogDescription>Configure your bot command settings</DialogDescription>
            </DialogHeader>
            <CommandForm command={editingCommand} onSave={handleSaveCommand} onCancel={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {commands.map((command) => (
          <Card key={command.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-lg">{command.name}</CardTitle>
                  <Badge variant={command.enabled ? "default" : "secondary"}>
                    {command.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={() => toggleCommand(command.id)}>
                    {command.enabled ? "Disable" : "Enable"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingCommand(command)
                      setIsDialogOpen(true)
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteCommand(command.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <CardDescription>{command.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <Label className="text-sm font-medium">Response:</Label>
                  <p className="text-sm text-muted-foreground mt-1">{command.response}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Usage Count:</Label>
                  <p className="text-sm text-muted-foreground">{command.usage} times</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CommandForm({
  command,
  onSave,
  onCancel,
}: {
  command: Command | null
  onSave: (command: Command) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: command?.name || "",
    description: command?.description || "",
    response: command?.response || "",
    enabled: command?.enabled ?? true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      id: command?.id || "",
      ...formData,
      usage: command?.usage || 0,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Command Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="/example"
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="What does this command do?"
          required
        />
      </div>
      <div>
        <Label htmlFor="response">Response</Label>
        <Textarea
          id="response"
          value={formData.response}
          onChange={(e) => setFormData({ ...formData, response: e.target.value })}
          placeholder="Bot's response to this command"
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="h-4 w-4 mr-2" />
          Save Command
        </Button>
      </div>
    </form>
  )
}
