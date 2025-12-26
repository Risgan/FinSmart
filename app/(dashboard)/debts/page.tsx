"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, CreditCard, AlertCircle, Sparkles } from "lucide-react"
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

interface Debt {
  id: string
  name: string
  type: string
  totalAmount: number
  remainingAmount: number
  interestRate: number
  monthlyPayment: number
  dueDate: string
}

export default function DebtsPage() {
  const [debts, setDebts] = useState<Debt[]>([
    {
      id: "1",
      name: "Tarjeta de Crédito Visa",
      type: "Tarjeta de Crédito",
      totalAmount: 5000,
      remainingAmount: 3200,
      interestRate: 18.5,
      monthlyPayment: 250,
      dueDate: "2026-12-31",
    },
    {
      id: "2",
      name: "Préstamo Auto",
      type: "Préstamo",
      totalAmount: 20000,
      remainingAmount: 12000,
      interestRate: 7.5,
      monthlyPayment: 450,
      dueDate: "2027-06-30",
    },
    {
      id: "3",
      name: "Préstamo Personal",
      type: "Préstamo",
      totalAmount: 8000,
      remainingAmount: 2400,
      interestRate: 12.0,
      monthlyPayment: 300,
      dueDate: "2025-08-15",
    },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const [newDebt, setNewDebt] = useState({
    name: "",
    type: "",
    totalAmount: "",
    remainingAmount: "",
    interestRate: "",
    monthlyPayment: "",
    dueDate: "",
  })

  const handleAddDebt = () => {
    if (newDebt.name && newDebt.type && newDebt.totalAmount && newDebt.remainingAmount) {
      setDebts([
        ...debts,
        {
          id: Date.now().toString(),
          name: newDebt.name,
          type: newDebt.type,
          totalAmount: Number.parseFloat(newDebt.totalAmount),
          remainingAmount: Number.parseFloat(newDebt.remainingAmount),
          interestRate: Number.parseFloat(newDebt.interestRate),
          monthlyPayment: Number.parseFloat(newDebt.monthlyPayment),
          dueDate: newDebt.dueDate,
        },
      ])
      setNewDebt({
        name: "",
        type: "",
        totalAmount: "",
        remainingAmount: "",
        interestRate: "",
        monthlyPayment: "",
        dueDate: "",
      })
      setIsOpen(false)
    }
  }

  const totalDebt = debts.reduce((sum, debt) => sum + debt.remainingAmount, 0)
  const totalMonthlyPayment = debts.reduce((sum, debt) => sum + debt.monthlyPayment, 0)
  const totalPaid = debts.reduce((sum, debt) => sum + (debt.totalAmount - debt.remainingAmount), 0)
  const totalOriginal = debts.reduce((sum, debt) => sum + debt.totalAmount, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 text-primary-foreground shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-6 w-6" />
              <h1 className="text-4xl font-bold tracking-tight">Deudas y Obligaciones</h1>
            </div>
            <p className="text-primary-foreground/90 text-lg">Administra tus deudas y pagos pendientes</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Deuda
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar Deuda</DialogTitle>
                <DialogDescription>Agrega una nueva deuda u obligación financiera</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Ej: Tarjeta de Crédito"
                    value={newDebt.name}
                    onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select value={newDebt.type} onValueChange={(value) => setNewDebt({ ...newDebt, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tarjeta de Crédito">Tarjeta de Crédito</SelectItem>
                      <SelectItem value="Préstamo">Préstamo Personal</SelectItem>
                      <SelectItem value="Hipoteca">Hipoteca</SelectItem>
                      <SelectItem value="Préstamo Auto">Préstamo Auto</SelectItem>
                      <SelectItem value="Préstamo Estudiantil">Préstamo Estudiantil</SelectItem>
                      <SelectItem value="Otros">Otros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalAmount">Monto Total ($)</Label>
                    <Input
                      id="totalAmount"
                      type="number"
                      placeholder="0.00"
                      value={newDebt.totalAmount}
                      onChange={(e) => setNewDebt({ ...newDebt, totalAmount: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="remainingAmount">Saldo Pendiente ($)</Label>
                    <Input
                      id="remainingAmount"
                      type="number"
                      placeholder="0.00"
                      value={newDebt.remainingAmount}
                      onChange={(e) => setNewDebt({ ...newDebt, remainingAmount: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Tasa de Interés (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      placeholder="0.0"
                      value={newDebt.interestRate}
                      onChange={(e) => setNewDebt({ ...newDebt, interestRate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyPayment">Pago Mensual ($)</Label>
                    <Input
                      id="monthlyPayment"
                      type="number"
                      placeholder="0.00"
                      value={newDebt.monthlyPayment}
                      onChange={(e) => setNewDebt({ ...newDebt, monthlyPayment: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Fecha de Vencimiento</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newDebt.dueDate}
                    onChange={(e) => setNewDebt({ ...newDebt, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddDebt}>Agregar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Deuda Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${totalDebt.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pago Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMonthlyPayment.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pagado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${totalPaid.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((totalPaid / totalOriginal) * 100).toFixed(0)}%</div>
          </CardContent>
        </Card>
      </div>

      {totalDebt > 5000 && (
        <Card className="border-accent bg-accent/5">
          <CardContent className="flex items-start gap-3 pt-6">
            <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-accent-foreground">Nivel de deuda alto</p>
              <p className="text-sm text-muted-foreground mt-1">
                Considera priorizar el pago de deudas con mayor tasa de interés para reducir costos.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {debts.map((debt) => {
          const paidPercentage = ((debt.totalAmount - debt.remainingAmount) / debt.totalAmount) * 100

          return (
            <Card key={debt.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-destructive/10 p-2">
                      <CreditCard className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <CardTitle>{debt.name}</CardTitle>
                      <CardDescription>{debt.type}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline">{debt.interestRate}% APR</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Saldo pendiente</span>
                    <span className="text-lg font-bold text-destructive">${debt.remainingAmount.toFixed(2)}</span>
                  </div>
                  <Progress value={paidPercentage} className="[&>div]:bg-success" />
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>Pagado: ${(debt.totalAmount - debt.remainingAmount).toFixed(2)}</span>
                    <span>{paidPercentage.toFixed(0)}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Pago mensual</p>
                    <p className="font-semibold">${debt.monthlyPayment.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Vencimiento</p>
                    <p className="font-semibold">{new Date(debt.dueDate).toLocaleDateString("es-ES")}</p>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  Registrar Pago
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
