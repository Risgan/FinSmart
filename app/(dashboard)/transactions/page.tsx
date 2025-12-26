"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, ArrowUpRight, ArrowDownRight, Search, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Transaction {
  id: string
  type: "income" | "expense"
  description: string
  amount: number
  category: string
  date: string
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "expense",
      description: "Supermercado",
      amount: 85.5,
      category: "Alimentación",
      date: "2025-01-19",
    },
    { id: "2", type: "income", description: "Salario", amount: 2500.0, category: "Ingreso", date: "2025-01-18" },
    {
      id: "3",
      type: "expense",
      description: "Netflix",
      amount: 12.99,
      category: "Entretenimiento",
      date: "2025-01-17",
    },
    { id: "4", type: "expense", description: "Gasolina", amount: 45.0, category: "Transporte", date: "2025-01-16" },
    { id: "5", type: "income", description: "Freelance", amount: 500.0, category: "Ingreso", date: "2025-01-15" },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    type: "expense" as "income" | "expense",
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  })

  const handleAddTransaction = () => {
    if (newTransaction.description && newTransaction.amount && newTransaction.category) {
      setTransactions([
        {
          id: Date.now().toString(),
          type: newTransaction.type,
          description: newTransaction.description,
          amount: Number.parseFloat(newTransaction.amount),
          category: newTransaction.category,
          date: newTransaction.date,
        },
        ...transactions,
      ])
      setNewTransaction({
        type: "expense",
        description: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split("T")[0],
      })
      setIsOpen(false)
    }
  }

  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 text-primary-foreground shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-6 w-6" />
              <h1 className="text-4xl font-bold tracking-tight">Ingresos y Gastos</h1>
            </div>
            <p className="text-primary-foreground/90 text-lg">Registra y visualiza todas tus transacciones</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Transacción
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Transacción</DialogTitle>
                <DialogDescription>Registra un nuevo ingreso o gasto</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Tabs
                    value={newTransaction.type}
                    onValueChange={(value) =>
                      setNewTransaction({ ...newTransaction, type: value as "income" | "expense" })
                    }
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="expense">Gasto</TabsTrigger>
                      <TabsTrigger value="income">Ingreso</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Input
                    id="description"
                    placeholder="Ej: Supermercado"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Monto ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select
                    value={newTransaction.category}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {newTransaction.type === "expense" ? (
                        <>
                          <SelectItem value="Alimentación">Alimentación</SelectItem>
                          <SelectItem value="Transporte">Transporte</SelectItem>
                          <SelectItem value="Entretenimiento">Entretenimiento</SelectItem>
                          <SelectItem value="Vivienda">Vivienda</SelectItem>
                          <SelectItem value="Salud">Salud</SelectItem>
                          <SelectItem value="Otros">Otros</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="Salario">Salario</SelectItem>
                          <SelectItem value="Freelance">Freelance</SelectItem>
                          <SelectItem value="Inversiones">Inversiones</SelectItem>
                          <SelectItem value="Otros">Otros</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddTransaction}>Agregar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Ingresos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${totalIncome.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${totalExpenses.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalIncome - totalExpenses).toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Todas las Transacciones</CardTitle>
              <CardDescription>Historial completo de movimientos</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2 ${transaction.type === "income" ? "bg-success/10" : "bg-muted"}`}>
                    {transaction.type === "income" ? (
                      <ArrowUpRight className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString("es-ES")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`font-semibold ${transaction.type === "income" ? "text-success" : "text-foreground"}`}>
                  {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
