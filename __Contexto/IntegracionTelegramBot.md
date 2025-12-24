# Integración Telegram Bot con PostgreSQL - FinSmart

## 📋 Descripción del Proyecto

Crear un bot de Telegram que permita a dos personas registrar transacciones financieras mediante lenguaje natural. El bot procesará mensajes como "compre un café de 10000" y los guardará automáticamente en una base de datos PostgreSQL compartida.

## 🎯 Funcionalidades Requeridas

### 1. Registro de Gastos
- **Input:** "compre un café de 10000", "pague ropa 150000"
- **Acción:** Agregar a gastos con categoría automática (cafetería, ropa, etc.)
- **Cuenta:** Débito por defecto

### 2. Pago de Tarjeta de Crédito
- **Input:** "pague tc 500000"
- **Acción:** 
  - Descontar de cuenta débito
  - Agregar el pago a la tarjeta de crédito (reducir deuda o aumentar disponible)

### 3. Registro de Ingresos
- **Input:** "me pagaron nomina 3500000"
- **Acción:** Agregar a ingresos del mes actual
- **Cuenta:** Débito

### 4. Control Mensual
- Todas las transacciones se registran con el mes en curso
- Compartido entre dos personas

## 💻 Stack Tecnológico Recomendado

### Opción 1: Python (⭐ RECOMENDADO)

**Lenguaje:** Python 3.11+

**Por qué Python:**
- Librerías maduras para Telegram Bot
- Excelente soporte para IA (OpenAI, Anthropic, etc.)
- Fácil manejo de PostgreSQL
- Rápido desarrollo y mantenimiento

**Librerías principales:**
```
python-telegram-bot==20.7   # Bot de Telegram
google-generativeai==0.3.2  # Google Gemini (GRATIS)
psycopg2-binary==2.9.9      # PostgreSQL
python-dotenv==1.0.0        # Variables de entorno
pydantic==2.5.3             # Validación de datos

# Alternativas de IA gratuitas:
# groq==0.4.1               # Groq (gratis, ultra rápido)
# ollama-python==0.1.0      # Ollama (gratis, local)
```

**Ventajas:**
- ✅ Ecosistema robusto
- ✅ Documentación excelente
- ✅ Fácil de desplegar
- ✅ Bajo costo de desarrollo

---

### Opción 2: Node.js/TypeScript

**Lenguaje:** TypeScript

**Librerías principales:**
```
telegraf                    # Bot de Telegram
openai                      # IA
pg                          # PostgreSQL
dotenv                      # Variables de entorno
zod                         # Validación
```

**Ventajas:**
- ✅ Si ya usas Node.js en el backend
- ✅ Mismo lenguaje que el frontend
- ✅ Buen rendimiento async

**Desventajas:**
- ❌ Menos ejemplos específicos para bots con IA
- ❌ Más complejo para procesamiento de lenguaje natural

---

## 🤖 Inteligencia Artificial - ¿Cuál Usar?

### Opción A: Google Gemini 1.5 Flash (⭐ RECOMENDADO - GRATIS)

**Modelo:** `gemini-1.5-flash`

**Por qué es la mejor opción GRATUITA:**
- ✅ **GRATIS hasta 15 requests/minuto** (más que suficiente)
- ✅ Excelente comprensión de español
- ✅ JSON mode nativo
- ✅ Muy rápido (Flash)
- ✅ 1M tokens de contexto
- ✅ Extracción precisa de datos

**Costo:**
- **GRATIS** hasta 1500 requests/día
- Para este uso: completamente gratis
- Tier pago: $0.075 / 1M tokens (opcional)

**Configuración:**
```bash
pip install google-generativeai
```

**Ejemplo de uso:**
```python
import google.generativeai as genai

genai.configure(api_key="TU_API_KEY_GRATIS")
model = genai.GenerativeModel('gemini-1.5-flash')
```

**API Key gratis:** https://makersuite.google.com/app/apikey

---

### Opción B: Groq (GRATIS - Ultra Rápido)

**Modelo:** `llama-3.1-8b-instant` o `mixtral-8x7b`

**Ventajas:**
- ✅ **COMPLETAMENTE GRATIS**
- ✅ Velocidad extrema (Groq LPU)
- ✅ 30 requests/minuto gratis
- ✅ Llama 3.1 8B/70B disponible
- ✅ JSON mode

**Configuración:**
```bash
pip install groq
```

**Obtener API Key gratis:** https://console.groq.com

---

### Opción C: Ollama + Llama 3.1 (GRATIS - Local)

**Modelo:** `llama3.1:8b`

**Ventajas:**
- ✅ **100% GRATIS**
- ✅ Sin enviar datos a terceros (privacidad total)
- ✅ Sin límites de uso
- ✅ Funciona offline

**Desventajas:**
- ❌ Requiere servidor con 8GB+ RAM
- ❌ Configuración inicial más compleja
- ❌ Ligeramente menos preciso que modelos cloud

**Instalación:**
```bash
# Instalar Ollama
curl https://ollama.ai/install.sh | sh

# Descargar modelo
ollama pull llama3.1:8b
```

---

### Opción D: OpenAI GPT-4 Turbo (PAGO)

**Modelo:** `gpt-4-turbo-preview`

**Solo si necesitas la máxima precisión:**
- ✅ Mejor comprensión de lenguaje natural
- ✅ Function calling más robusto
- ✅ Más preciso en casos ambiguos

**Costo:**
- ~$0.01 USD por 1000 tokens
- **Costo mensual: ~$1-2 USD/mes**

**Cuándo pagar por OpenAI:**
- Si las opciones gratuitas no dan la precisión necesaria
- Si el presupuesto no es problema

---

### Opción E: Anthropic Claude (PAGO)

**Modelo:** `claude-3-5-sonnet-20241022`

**Ventajas:**
- ✅ Razonamiento superior
- ✅ Mejor seguimiento de instrucciones

**Costo:** Similar a OpenAI (~$1.5-3 USD/mes)

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐
│  Usuario 1      │
│  (Telegram)     │
└────────┬────────┘
         │
         │ Mensaje de texto
         │ "compre cafe 5000"
         ▼
┌─────────────────────────┐
│   Telegram Bot API      │
│   (recibe mensaje)      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Servidor Bot (Python)  │
│  - Valida usuario       │
│  - Procesa mensaje      │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Servicio IA            │
│  (OpenAI/Claude)        │
│  - Extrae: tipo,        │
│    categoría, monto     │
│  - Retorna JSON         │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Validador              │
│  - Verifica datos       │
│  - Valida monto         │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  PostgreSQL Database    │
│  - Tabla transactions   │
│  - Tabla accounts       │
│  - Tabla users          │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  Frontend FinSmart      │
│  (Next.js)              │
│  - Lee transacciones    │
│  - Muestra dashboard    │
└─────────────────────────┘
```

---

## 📊 Estructura de Base de Datos PostgreSQL

```sql
-- Usuarios (los 2 que usan el bot)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    telegram_id BIGINT UNIQUE NOT NULL,
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cuentas bancarias
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    name VARCHAR(50) NOT NULL,          -- 'debito', 'tc', 'ahorro'
    type VARCHAR(20) NOT NULL,          -- 'debito', 'credito', 'ahorro'
    balance DECIMAL(10, 2) DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transacciones
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(20) NOT NULL,          -- 'gasto', 'ingreso', 'pago_tc'
    category VARCHAR(50),               -- 'cafeteria', 'ropa', 'nomina', etc.
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    account_from INTEGER REFERENCES accounts(id),
    account_to INTEGER REFERENCES accounts(id),
    month INTEGER NOT NULL,             -- 1-12
    year INTEGER NOT NULL,
    raw_message TEXT,                   -- mensaje original
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categorías predefinidas
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    type VARCHAR(20),                   -- 'gasto', 'ingreso'
    icon VARCHAR(50),
    color VARCHAR(20)
);
```

---

## 🔄 Flujo de Procesamiento

### Ejemplo: "compre un café de 5000"

1. **Usuario envía mensaje** → Telegram
2. **Bot recibe** → Valida que el telegram_id esté autorizado
3. **Envía a IA** → OpenAI procesa el texto
4. **IA responde:**
   ```json
   {
     "type": "gasto",
     "category": "cafeteria",
     "amount": 5000,
     "description": "café",
     "account": "debito"
   }
   ```
5. **Validación:**
   - ✅ Monto > 0
   - ✅ Categoría válida
   - ✅ Tipo reconocido
6. **Guardar en BD:**
   - Crear transacción
   - Actualizar balance cuenta débito (-5000)
   - Registrar mes y año actual
7. **Responder al usuario:**
   ```
   ✅ Gasto registrado
   💰 Monto: $5.000 COP
   ☕ Categoría: Cafetería
   💳 Cuenta: Débito
   📊 Balance: $1.245.000
   ```

---

### Ejemplo: "pague tc 500000"

1. **IA extrae:**
   ```json
   {
     "type": "pago_tc",
     "amount": 500000,
     "from_account": "debito",
     "to_account": "tc"
   }
   ```
2. **Procesar:**
   - Restar 500000 de cuenta débito
   - Sumar 500000 a disponible de TC (o restar deuda)
   - Crear transacción de tipo "pago_tc"
3. **Confirmar:**
   ```
   ✅ Pago TC procesado
   💰 Monto: $500.000 COP
   📤 Desde: Débito (-$500.000)
   📥 Hacia: TC (+$500.000 disponible)
   📊 Balance Débito: $745.000
   ```

---

## 🛡️ Seguridad

### 1. Autenticación
- Solo usuarios con `telegram_id` autorizado pueden usar el bot
- Lista de IDs en variable de entorno

### 2. Validaciones
- Montos deben ser positivos
- Límite máximo por transacción (configurable)
- Categorías válidas

### 3. Rate Limiting
- Máximo X transacciones por minuto
- Prevenir spam o errores

### 4. Logs
- Registrar todas las transacciones
- Guardar mensaje original para auditoría

---

## 🚀 Deployment

### Opción 1: Railway.app (Recomendado)
- ✅ Gratis para empezar
- ✅ PostgreSQL incluido
- ✅ Fácil deploy desde GitHub
- ✅ Variables de entorno sencillas

### Opción 2: Render.com
- ✅ Gratis con limitaciones
- ✅ PostgreSQL incluido
- ✅ Auto-deploy

### Opción 3: VPS (DigitalOcean, Linode)
- ✅ Control total
- ✅ $5/mes
- ❌ Requiere configuración manual

---

## 💰 Costos Estimados

### Setup Inicial
- Bot de Telegram: **Gratis**
- PostgreSQL: **Gratis** (Railway/Render) o $5/mes (hosted)
- Servidor: **Gratis** (Railway free tier) o $5/mes (VPS)

### Costos Operacionales (Con IA Gratuita)
- Google Gemini API: **GRATIS** (hasta 1500 requests/día)
- Groq API: **GRATIS** (hasta 30 requests/min)
- Hosting: **Gratis** (Railway) o $5/mes (VPS)
- **Total: $0-5 USD/mes** ✅

### Con IA de Pago (Opcional)
- OpenAI API: **$1-2 USD/mes**
- **Total: $1-7 USD/mes**

---

## 📝 Variables de Entorno Necesarias

```env
# Telegram
TELEGRAM_BOT_TOKEN=tu_token_de_botfather
ALLOWED_TELEGRAM_IDS=123456789,987654321  # IDs de ambos usuarios

# IA - Elige UNA opción (todas GRATIS):

# Opción 1: Google Gemini (RECOMENDADO - GRATIS)
GEMINI_API_KEY=tu_api_key_gratis
AI_PROVIDER=gemini

# Opción 2: Groq (GRATIS - Ultra rápido)
# GROQ_API_KEY=tu_api_key_gratis
# AI_PROVIDER=groq

# Opción 3: Ollama (GRATIS - Local)
# OLLAMA_HOST=http://localhost:11434
# AI_PROVIDER=ollama

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=finsmart
DB_USER=postgres
DB_PASSWORD=tu_password

# Configuración
TIMEZONE=America/Bogota
DEFAULT_CURRENCY=COP
MAX_TRANSACTION_AMOUNT=50000000
```

---

## 🎯 Casos de Uso Soportados

| Input Usuario | Tipo | Acción |
|---------------|------|--------|
| "compre un café de 5000" | Gasto | -5000 débito, categoría: cafetería |
| "pague 150000 de ropa" | Gasto | -150000 débito, categoría: ropa |
| "gaste 30000 en transporte" | Gasto | -30000 débito, categoría: transporte |
| "me pagaron nomina 3500000" | Ingreso | +3500000 débito, categoría: nómina |
| "recibi 200000 de freelance" | Ingreso | +200000 débito, categoría: freelance |
| "pague tc 500000" | Pago TC | -500000 débito, +500000 TC disponible |
| "abone 300000 a la tarjeta" | Pago TC | -300000 débito, +300000 TC disponible |

---

## ✅ Ventajas de Usar IA

1. **Flexibilidad:** No necesitas comandos rígidos como `/gasto 5000 cafeteria`
2. **Natural:** Escribe como le hablarías a una persona
3. **Inteligente:** Infiere categorías automáticamente
4. **Contexto:** Entiende "pague tc" vs "compre"
5. **Tolerante:** Funciona con errores de ortografía
6. **Escalable:** Fácil agregar nuevos tipos de transacciones

---

## 📱 Comandos del Bot

- `/start` - Iniciar el bot y ver bienvenida
- `/help` - Ver ayuda y ejemplos de uso
- `/balance` - Ver balance de todas las cuentas
- `/mes` - Resumen del mes actual (ingresos, gastos, balance)
- `/ultimas` - Ver últimas 5 transacciones
- `/categorias` - Ver lista de categorías disponibles

---

## 🔮 Funcionalidades Futuras

1. **Reconocimiento de voz:** Audio → Texto → IA
2. **Fotos de recibos:** OCR + IA para extraer datos
3. **Presupuestos:** Alertas cuando se exceda una categoría
4. **Reportes:** `/reporte` genera PDF del mes
5. **Pagos recurrentes:** Recordatorios automáticos
6. **Multi-idioma:** Soporte para inglés
7. **Análisis IA:** "¿En qué gasté más este mes?"

---

## 📚 Resumen de Recomendaciones

### Stack Recomendado (100% GRATIS):
- **Lenguaje:** Python 3.11+
- **Bot:** python-telegram-bot
- **IA:** Google Gemini 1.5 Flash (GRATIS)
- **Base de Datos:** PostgreSQL
- **Hosting:** Railway.app (gratis) o VPS ($5/mes)

### Por qué esta combinación:
1. Python es el más rápido de desarrollar para bots
2. **Gemini es GRATIS** y muy preciso (1500 requests/día)
3. PostgreSQL es robusto y gratis en Railway
4. **Costo total: $0 USD/mes** (100% gratis) ✅
5. Fácil de mantener y escalar

### Alternativas gratuitas:
- **Groq**: Más rápido que Gemini, también gratis
- **Ollama**: Si quieres privacidad total y tienes servidor

---

## 🎓 Siguiente Paso

1. Crear bot en Telegram con [@BotFather](https://t.me/botfather)
2. Obtener API key GRATIS de Google Gemini: https://makersuite.google.com/app/apikey
3. Crear cuenta en Railway.app (gratis)
4. Configurar PostgreSQL en Railway (gratis)
5. Desarrollar el bot en Python
6. Desplegar y probar

**Costo total: $0 USD** 🎉
