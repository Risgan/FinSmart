# Bot de Telegram - FinSmart POC

## 📋 Requisitos

- Python 3.8 o superior
- Librería `python-telegram-bot`

## 🚀 Instalación

1. Instalar la librería necesaria:
```bash
pip install python-telegram-bot
```

## 🔑 Configuración

1. **Crear un bot en Telegram:**
   - Abre Telegram y busca `@BotFather`
   - Envía el comando `/newbot`
   - Sigue las instrucciones para elegir un nombre y username para tu bot
   - Copia el token que te proporciona BotFather

2. **Configurar el token:**
   
   Opción 1 - Variable de entorno (recomendado):
   ```bash
   # Windows PowerShell
   $env:TELEGRAM_BOT_TOKEN="tu_token_aqui"
   
   # Windows CMD
   set TELEGRAM_BOT_TOKEN=tu_token_aqui
   
   # Linux/Mac
   export TELEGRAM_BOT_TOKEN=tu_token_aqui
   ```
   
   Opción 2 - Editar el archivo:
   - Abre `telegram_bot.py`
   - Reemplaza `'TU_TOKEN_AQUI'` con tu token real

3. **Configurar el username del bot:**
   - Edita la variable `BOT_USERNAME` en `telegram_bot.py`
   - Ejemplo: `BOT_USERNAME: Final = '@finsmart_bot'`

## ▶️ Ejecución

```bash
python telegram_bot.py
```

El bot quedará escuchando mensajes. Deberías ver:
```
Iniciando bot de Telegram...
Bot iniciado. Presiona Ctrl+C para detener.
```

## 💬 Uso del Bot

### Comandos disponibles:

- `/start` - Iniciar conversación con el bot
- `/help` - Ver ayuda y comandos disponibles
- `/balance` - Ver balance actual (ejemplo)
- `/gastos` - Instrucciones para registrar gastos
- `/ingresos` - Instrucciones para registrar ingresos

### Enviar mensajes:

El bot responde a mensajes de texto normal:
- "hola" - Saludo
- "balance" o "saldo" - Ver balance
- "gasto" - Registrar gasto
- "ingreso" - Registrar ingreso

## 🔧 Próximos Pasos

Para integración completa:

1. **Conectar con Backend:**
   - Agregar llamadas HTTP/API al backend de FinSmart
   - Implementar autenticación de usuarios
   - Guardar transacciones en base de datos

2. **Mejorar Procesamiento:**
   - Integrar procesamiento de lenguaje natural (NLP)
   - Validar formatos de mensajes
   - Manejo de estados de conversación

3. **Agregar Funcionalidades:**
   - Reportes periódicos automáticos
   - Alertas de presupuesto
   - Gráficos y estadísticas
   - Recordatorios de pagos

## 📝 Notas

- Este es un POC (Proof of Concept) para demostrar la funcionalidad básica
- Los datos mostrados son ejemplos estáticos
- Requiere integración con el backend para funcionalidad completa
- Mantén el token del bot seguro y nunca lo compartas públicamente

## 🐛 Troubleshooting

**Error: Invalid token**
- Verifica que el token esté correcto
- Asegúrate de no tener espacios antes/después del token

**Bot no responde:**
- Verifica que el bot esté ejecutándose
- Revisa la consola para ver logs de errores
- Asegúrate de tener conexión a internet

**Import Error:**
- Instala las dependencias: `pip install python-telegram-bot`
- Verifica la versión de Python: `python --version`
