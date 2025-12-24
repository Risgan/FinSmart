"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, Edit, Trash2, Sparkles } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Budget {
  id: string
  category: string
  limit: number
  spent: number
  period: string
}

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: "1", category: "Alimentación", limit: 800, spent: 650, period: "Mensual" },
    { id: "2", category: "Transporte", limit: 400, spent: 320, period: "Mensual" },
    { id: "3", category: "Entretenimiento", limit: 300, spent: 280, period: "Mensual" },
    { id: "4", category: "Vivienda", limit: 1200, spent: 1200, period: "Mensual" },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [newBudget, setNewBudget] = useState({ category: "", limit: "", period: "Mensual" })

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.limit) {
      setBudgets([
        ...budgets,
        {
          id: Date.now().toString(),
          category: newBudget.category,
          limit: Number.parseFloat(newBudget.limit),
          spent: 0,
          period: newBudget.period,
        },
      ])
      setNewBudget({ category: "", limit: "", period: "Mensual" })
      setIsOpen(false)
    }
  }

  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter((b) => b.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 text-primary-foreground shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-6 w-6" />
              <h1 className="text-4xl font-bold tracking-tight">Presupuestos</h1>
            </div>
            <p className="text-primary-foreground/90 text-lg">Gestiona tus límites de gastos por categoría</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Presupuesto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Crear Presupuesto</DialogTitle>
                <DialogDescription>Define un límite de gasto para una categoría</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Input
                    id="category"
                    placeholder="Ej: Alimentación"
                    value={newBudget.category}
                    onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limit">Límite ($)</Label>
                  <Input
                    id="limit"
                    type="number"
                    placeholder="0.00"
                    value={newBudget.limit}
                    onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period">Período</Label>
                  <Select
                    value={newBudget.period}
                    onValueChange={(value) => setNewBudget({ ...newBudget, period: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Semanal">Semanal</SelectItem>
                      <SelectItem value="Mensual">Mensual</SelectItem>
                      <SelectItem value="Anual">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddBudget}>Crear</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100
          const isOverBudget = percentage > 100
          const isNearLimit = percentage > 80 && percentage <= 100

          return (
            <Card key={budget.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{budget.category}</CardTitle>
                    <CardDescription>{budget.period}</CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteBudget(budget.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-bold">${budget.spent.toFixed(2)}</span>
                    <span className="text-muted-foreground"> / ${budget.limit.toFixed(2)}</span>
                  </div>
                  <span
                    className={`text-sm font-medium ${isOverBudget ? "text-destructive" : isNearLimit ? "text-accent" : "text-success"}`}
                  >
                    {percentage.toFixed(0)}%
                  </span>
                </div>
                <Progress
                  value={Math.min(percentage, 100)}
                  className={isOverBudget ? "[&>div]:bg-destructive" : isNearLimit ? "[&>div]:bg-accent" : ""}
                />
                {isOverBudget && <p className="text-sm text-destructive">¡Has excedido tu presupuesto!</p>}
                {isNearLimit && !isOverBudget && <p className="text-sm text-accent">Cerca del límite</p>}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
