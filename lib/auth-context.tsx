"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("finsmart_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock authentication
    const mockUser = {
      id: "1",
      name: email.split("@")[0],
      email,
    }
    setUser(mockUser)
    localStorage.setItem("finsmart_user", JSON.stringify(mockUser))
    router.push("/dashboard")
  }

  const register = async (name: string, email: string, password: string) => {
    // Mock registration
    const mockUser = {
      id: "1",
      name,
      email,
    }
    setUser(mockUser)
    localStorage.setItem("finsmart_user", JSON.stringify(mockUser))
    router.push("/dashboard")
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("finsmart_user")
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
