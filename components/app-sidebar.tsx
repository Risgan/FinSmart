"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  PiggyBank,
  LineChart,
  CreditCard,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Presupuestos", href: "/budgets", icon: Wallet },
  { name: "Ingresos y Gastos", href: "/transactions", icon: TrendingUp },
  { name: "Ahorros", href: "/savings", icon: PiggyBank },
  { name: "Inversiones", href: "/investments", icon: LineChart },
  { name: "Obligaciones", href: "/debts", icon: CreditCard },
  { name: "Reportes", href: "/reports", icon: BarChart3 },
  { name: "Configuración", href: "/settings", icon: Settings },
  { name: "Ayuda", href: "/help", icon: HelpCircle },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex items-center h-16 px-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-sidebar-primary p-2">
              <Wallet className="h-6 w-6 text-sidebar-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-sidebar-foreground">FinSmart</span>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
