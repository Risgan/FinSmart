"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, PiggyBank, Sparkles } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

const monthlyData = [
  { month: "Ene", ingresos: 4500, gastos: 3200 },
  { month: "Feb", ingresos: 4800, gastos: 3400 },
  { month: "Mar", ingresos: 4600, gastos: 3100 },
  { month: "Abr", ingresos: 5200, gastos: 3600 },
  { month: "May", ingresos: 5000, gastos: 3800 },
  { month: "Jun", ingresos: 5400, gastos: 3500 },
]

const categoryData = [
  { category: "Vivienda", amount: 1200 },
  { category: "Alimentación", amount: 800 },
  { category: "Transporte", amount: 400 },
  { category: "Entretenimiento", amount: 300 },
  { category: "Otros", amount: 500 },
]

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 text-primary-foreground shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6" />
            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          </div>
          <p className="text-primary-foreground/90 text-lg">Resumen general de tus finanzas personales</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-shadow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Balance Total</CardTitle>
            <div className="rounded-full p-2 bg-primary/10">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">$12,450.00</div>
            <p className="text-xs text-success flex items-center gap-1 mt-2 font-medium">
              <ArrowUpRight className="h-3 w-3" />
              +12.5% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-shadow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos del Mes</CardTitle>
            <div className="rounded-full p-2 bg-secondary/10">
              <TrendingUp className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">$5,400.00</div>
            <p className="text-xs text-success flex items-center gap-1 mt-2 font-medium">
              <ArrowUpRight className="h-3 w-3" />
              +8% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-shadow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-full blur-2xl" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Gastos del Mes</CardTitle>
            <div className="rounded-full p-2 bg-destructive/10">
              <ArrowDownRight className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">$3,500.00</div>
            <p className="text-xs text-success flex items-center gap-1 mt-2 font-medium">
              <ArrowDownRight className="h-3 w-3" />
              -3% vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-shadow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ahorros</CardTitle>
            <div className="rounded-full p-2 bg-accent/10">
              <PiggyBank className="h-5 w-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">$8,200.00</div>
            <p className="text-xs text-muted-foreground mt-2 font-medium">Meta: $10,000</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Ingresos vs Gastos</CardTitle>
            <CardDescription className="text-base">Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                ingresos: {
                  label: "Ingresos",
                  color: "hsl(var(--secondary))",
                },
                gastos: {
                  label: "Gastos",
                  color: "hsl(var(--destructive))",
                },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="ingresos"
                    stroke="hsl(var(--secondary))"
                    fill="hsl(var(--secondary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="gastos"
                    stroke="hsl(var(--destructive))"
                    fill="hsl(var(--destructive))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Gastos por Categoría</CardTitle>
            <CardDescription className="text-base">Este mes</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                amount: {
                  label: "Monto",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="category" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Transacciones Recientes</CardTitle>
          <CardDescription className="text-base">Últimas 5 transacciones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Supermercado", amount: -85.5, date: "Hoy", category: "Alimentación" },
              { name: "Salario", amount: 2500.0, date: "Ayer", category: "Ingreso" },
              { name: "Netflix", amount: -12.99, date: "2 días", category: "Entretenimiento" },
              { name: "Gasolina", amount: -45.0, date: "3 días", category: "Transporte" },
              { name: "Freelance", amount: 500.0, date: "4 días", category: "Ingreso" },
            ].map((transaction, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-full p-2.5 ${transaction.amount > 0 ? "bg-success/10" : "bg-muted"}`}>
                    {transaction.amount > 0 ? (
                      <ArrowUpRight className="h-5 w-5 text-success" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-base">{transaction.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>
                </div>
                <div className={`font-bold text-lg ${transaction.amount > 0 ? "text-success" : "text-foreground"}`}>
                  {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
