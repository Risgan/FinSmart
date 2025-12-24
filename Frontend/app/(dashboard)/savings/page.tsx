"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, Target, Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface SavingsGoal {
  id: string
  name: string
  description: string
  targetAmount: number
  currentAmount: number
  deadline: string
}

export default function SavingsPage() {
  const [goals, setGoals] = useState<SavingsGoal[]>([
    {
      id: "1",
      name: "Fondo de Emergencia",
      description: "6 meses de gastos",
      targetAmount: 10000,
      currentAmount: 8200,
      deadline: "2025-12-31",
    },
    {
      id: "2",
      name: "Vacaciones",
      description: "Viaje a Europa",
      targetAmount: 5000,
      currentAmount: 2300,
      deadline: "2025-08-01",
    },
    {
      id: "3",
      name: "Auto Nuevo",
      description: "Enganche para auto",
      targetAmount: 15000,
      currentAmount: 4500,
      deadline: "2026-06-30",
    },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [newGoal, setNewGoal] = useState({
    name: "",
    description: "",
    targetAmount: "",
    currentAmount: "0",
    deadline: "",
  })

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.targetAmount && newGoal.deadline) {
      setGoals([
        ...goals,
        {
          id: Date.now().toString(),
          name: newGoal.name,
          description: newGoal.description,
          targetAmount: Number.parseFloat(newGoal.targetAmount),
          currentAmount: Number.parseFloat(newGoal.currentAmount),
          deadline: newGoal.deadline,
        },
      ])
      setNewGoal({ name: "", description: "", targetAmount: "", currentAmount: "0", deadline: "" })
      setIsOpen(false)
    }
  }

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 text-primary-foreground shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-6 w-6" />
              <h1 className="text-4xl font-bold tracking-tight">Metas de Ahorro</h1>
            </div>
            <p className="text-primary-foreground/90 text-lg">Define y alcanza tus objetivos financieros</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Meta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Meta de Ahorro</DialogTitle>
                <DialogDescription>Define un nuevo objetivo financiero</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre de la Meta</Label>
                  <Input
                    id="name"
                    placeholder="Ej: Fondo de Emergencia"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe tu meta..."
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetAmount">Meta ($)</Label>
                    <Input
                      id="targetAmount"
                      type="number"
                      placeholder="0.00"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentAmount">Ahorro Actual ($)</Label>
                    <Input
                      id="currentAmount"
                      type="number"
                      placeholder="0.00"
                      value={newGoal.currentAmount}
                      onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Fecha Límite</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddGoal}>Crear Meta</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progreso Total</CardTitle>
          <CardDescription>Resumen de todas tus metas de ahorro</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-bold">${totalSaved.toFixed(2)}</span>
              <span className="text-muted-foreground"> / ${totalTarget.toFixed(2)}</span>
            </div>
            <span className="text-lg font-medium text-success">{((totalSaved / totalTarget) * 100).toFixed(0)}%</span>
          </div>
          <Progress value={(totalSaved / totalTarget) * 100} />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((goal) => {
          const percentage = (goal.currentAmount / goal.targetAmount) * 100
          const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

          return (
            <Card key={goal.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{goal.name}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-bold">${goal.currentAmount.toFixed(2)}</span>
                    <span className="text-muted-foreground"> / ${goal.targetAmount.toFixed(2)}</span>
                  </div>
                  <span className="text-sm font-medium text-success">{percentage.toFixed(0)}%</span>
                </div>
                <Progress value={percentage} />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Faltan ${(goal.targetAmount - goal.currentAmount).toFixed(2)}
                  </span>
                  <span className="text-muted-foreground">{daysLeft > 0 ? `${daysLeft} días` : "Vencido"}</span>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  Agregar Ahorro
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
