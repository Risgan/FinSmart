"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Palette, Check } from "lucide-react"
import { useColorTheme } from "@/lib/theme-context"

const themes = [
  { name: "Teal", value: "teal" as const, colors: ["bg-[#1A535C]", "bg-[#4ECDC4]", "bg-[#F5B700]"] },
  { name: "Purple", value: "purple" as const, colors: ["bg-[#6B46C1]", "bg-[#9F7AEA]", "bg-[#F687B3]"] },
  { name: "Blue", value: "blue" as const, colors: ["bg-[#1E40AF]", "bg-[#3B82F6]", "bg-[#60A5FA]"] },
  { name: "Orange", value: "orange" as const, colors: ["bg-[#C2410C]", "bg-[#F97316]", "bg-[#FB923C]"] },
]

export function ThemeSwitcher() {
  const { colorTheme, setColorTheme } = useColorTheme()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Cambiar tema de color</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="end">
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Tema de Color</h4>
          <div className="grid gap-2">
            {themes.map((theme) => (
              <button
                key={theme.value}
                onClick={() => setColorTheme(theme.value)}
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {theme.colors.map((color, i) => (
                      <div key={i} className={`w-4 h-4 rounded-full ${color}`} />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{theme.name}</span>
                </div>
                {colorTheme === theme.value && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
