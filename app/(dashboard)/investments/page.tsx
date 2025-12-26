"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, TrendingDown, Sparkles } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface Investment {
  id: string
  name: string
  type: string
  amount: number
  currentValue: number
  purchaseDate: string
  performance: number
}

const portfolioData = [
  { month: "Ene", value: 10000 },
  { month: "Feb", value: 10500 },
  { month: "Mar", value: 10200 },
  { month: "Abr", value: 11000 },
  { month: "May", value: 11800 },
  { month: "Jun", value: 12450 },
]

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: "1",
      name: "Acciones Tech",
      type: "Acciones",
      amount: 5000,
      currentValue: 5750,
      purchaseDate: "2024-01-15",
      performance: 15.0,
    },
    {
      id: "2",
      name: "Fondo Indexado S&P 500",
      type: "Fondo",
      amount: 3000,
      currentValue: 3300,
      purchaseDate: "2024-03-20",
      performance: 10.0,
    },
    {
      id: "3",
      name: "Bonos Gubernamentales",
      type: "Bonos",
      amount: 2000,
      currentValue: 2100,
      purchaseDate: "2024-06-10",
      performance: 5.0,
    },
    {
      id: "4",
      name: "Criptomonedas",
      type: "Cripto",
      amount: 1000,
      currentValue: 1300,
      purchaseDate: "2024-08-01",
      performance: 30.0,
    },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [newInvestment, setNewInvestment] = useState({
    name: "",
    type: "",
    amount: "",
    currentValue: "",
    purchaseDate: new Date().toISOString().split("T")[0],
  })

  const handleAddInvestment = () => {
    if (newInvestment.name && newInvestment.type && newInvestment.amount && newInvestment.currentValue) {
      const amount = Number.parseFloat(newInvestment.amount)
      const currentValue = Number.parseFloat(newInvestment.currentValue)
      const performance = ((currentValue - amount) / amount) * 100

      setInvestments([
        ...investments,
        {
          id: Date.now().toString(),
          name: newInvestment.name,
          type: newInvestment.type,
          amount,
          currentValue,
          purchaseDate: newInvestment.purchaseDate,
          performance,
        },
      ])
      setNewInvestment({
        name: "",
        type: "",
        amount: "",
        currentValue: "",
        purchaseDate: new Date().toISOString().split("T")[0],
      })
      setIsOpen(false)
    }
  }

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0)
  const totalGain = totalValue - totalInvested
  const totalPerformance = (totalGain / totalInvested) * 100

  return (
    <div className="p-6 space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 text-primary-foreground shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-6 w-6" />
              <h1 className="text-4xl font-bold tracking-tight">Inversiones</h1>
            </div>
            <p className="text-primary-foreground/90 text-lg">Monitorea el rendimiento de tu portafolio</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Inversión
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Inversión</DialogTitle>
                <DialogDescription>Registra una nueva inversión en tu portafolio</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Ej: Acciones Apple"
                    value={newInvestment.name}
                    onChange={(e) => setNewInvestment({ ...newInvestment, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select
                    value={newInvestment.type}
                    onValueChange={(value) => setNewInvestment({ ...newInvestment, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Acciones">Acciones</SelectItem>
                      <SelectItem value="Fondo">Fondo</SelectItem>
                      <SelectItem value="Bonos">Bonos</SelectItem>
                      <SelectItem value="Cripto">Criptomonedas</SelectItem>
                      <SelectItem value="Bienes Raíces">Bienes Raíces</SelectItem>
                      <SelectItem value="Otros">Otros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Monto Invertido ($)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={newInvestment.amount}
                      onChange={(e) => setNewInvestment({ ...newInvestment, amount: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentValue">Valor Actual ($)</Label>
                    <Input
                      id="currentValue"
                      type="number"
                      placeholder="0.00"
                      value={newInvestment.currentValue}
                      onChange={(e) => setNewInvestment({ ...newInvestment, currentValue: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">Fecha de Compra</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={newInvestment.purchaseDate}
                    onChange={(e) => setNewInvestment({ ...newInvestment, purchaseDate: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddInvestment}>Agregar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Invertido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInvested.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ganancia/Pérdida</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalGain >= 0 ? "text-success" : "text-destructive"}`}>
              {totalGain >= 0 ? "+" : ""}${totalGain.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rendimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalPerformance >= 0 ? "text-success" : "text-destructive"}`}>
              {totalPerformance >= 0 ? "+" : ""}
              {totalPerformance.toFixed(2)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolución del Portafolio</CardTitle>
          <CardDescription>Valor total en los últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "Valor",
                color: "hsl(var(--secondary))",
              },
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--secondary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mis Inversiones</CardTitle>
          <CardDescription>Detalle de cada inversión en tu portafolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {investments.map((investment) => (
              <div key={investment.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div
                    className={`rounded-full p-2 ${investment.performance >= 0 ? "bg-success/10" : "bg-destructive/10"}`}
                  >
                    {investment.performance >= 0 ? (
                      <TrendingUp className="h-5 w-5 text-success" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{investment.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {investment.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Comprado: {new Date(investment.purchaseDate).toLocaleDateString("es-ES")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${investment.currentValue.toFixed(2)}</div>
                  <div className={`text-sm ${investment.performance >= 0 ? "text-success" : "text-destructive"}`}>
                    {investment.performance >= 0 ? "+" : ""}
                    {investment.performance.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
