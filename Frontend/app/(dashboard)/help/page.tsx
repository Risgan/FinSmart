"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Mail, MessageCircle, Book } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Centro de Ayuda</h1>
        <p className="text-muted-foreground mt-1">Encuentra respuestas y soporte</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar en la ayuda..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <Book className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Guías</CardTitle>
            <CardDescription>Aprende a usar FinSmart</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              Ver guías
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MessageCircle className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Chat en vivo</CardTitle>
            <CardDescription>Habla con nuestro equipo</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              Iniciar chat
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Mail className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Email</CardTitle>
            <CardDescription>Envíanos un mensaje</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full bg-transparent">
              Contactar
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preguntas Frecuentes</CardTitle>
          <CardDescription>Respuestas a las dudas más comunes</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>¿Cómo creo un presupuesto?</AccordionTrigger>
              <AccordionContent>
                Para crear un presupuesto, ve a la sección de Presupuestos y haz clic en "Nuevo Presupuesto". Define la
                categoría, el límite de gasto y el período. FinSmart te ayudará a monitorear tu progreso
                automáticamente.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>¿Cómo registro una transacción?</AccordionTrigger>
              <AccordionContent>
                En la sección de Ingresos y Gastos, haz clic en "Nueva Transacción". Selecciona si es un ingreso o
                gasto, agrega la descripción, monto, categoría y fecha. La transacción se reflejará inmediatamente en
                tus reportes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>¿Cómo establezco una meta de ahorro?</AccordionTrigger>
              <AccordionContent>
                Dirígete a la sección de Ahorros y selecciona "Nueva Meta". Define el nombre, descripción, monto
                objetivo y fecha límite. Puedes agregar ahorros periódicamente y FinSmart calculará tu progreso
                automáticamente.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>¿Mis datos están seguros?</AccordionTrigger>
              <AccordionContent>
                Sí, FinSmart utiliza encriptación de nivel bancario para proteger tu información. Tus datos financieros
                están almacenados de forma segura y nunca se comparten con terceros sin tu consentimiento.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>¿Puedo exportar mis datos?</AccordionTrigger>
              <AccordionContent>
                Sí, puedes exportar tus datos en formato CSV o PDF desde la sección de Reportes. Esto te permite
                analizar tu información en otras herramientas o mantener respaldos personales.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
