"""
Bot de Telegram para FinSmart - POC
Este script permite conectar con Telegram para recibir y enviar mensajes.
"""

import os
from pathlib import Path
from typing import Final
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    filters,
    ContextTypes
)

# Cargar variables de entorno desde .env
env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path)

# Token del bot - Obtenerlo de @BotFather en Telegram
TOKEN: Final = os.getenv('TELEGRAM_BOT_TOKEN', 'TU_TOKEN_AQUI')
BOT_USERNAME: Final = os.getenv('BOT_USERNAME', '@tu_bot_username')


# Comando /start
async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Responde al comando /start"""
    await update.message.reply_text(
        '¡Hola! 👋 Soy el bot de FinSmart.\n'
        'Puedo ayudarte a gestionar tus finanzas personales.\n\n'
        'Comandos disponibles:\n'
        '/start - Iniciar el bot\n'
        '/help - Mostrar ayuda\n'
        '/balance - Ver tu balance\n'
        '/gastos - Registrar un gasto\n'
        '/ingresos - Registrar un ingreso'
    )


# Comando /help
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Responde al comando /help"""
    await update.message.reply_text(
        '🤖 Ayuda de FinSmart Bot\n\n'
        'Este bot te ayuda a:\n'
        '• Registrar gastos e ingresos\n'
        '• Ver tu balance actual\n'
        '• Obtener reportes financieros\n'
        '• Recibir alertas de presupuesto\n\n'
        'Envía un mensaje y te ayudaré a procesarlo.'
    )


# Comando /balance
async def balance_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Responde al comando /balance"""
    # Aquí se integraría con el backend para obtener el balance real
    await update.message.reply_text(
        '💰 Balance Actual:\n\n'
        'Ingresos: $10,000\n'
        'Gastos: $6,500\n'
        '────────────\n'
        'Balance: $3,500\n\n'
        '(Datos de ejemplo - integrar con API)'
    )


# Comando /gastos
async def gastos_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Responde al comando /gastos"""
    await update.message.reply_text(
        '📝 Para registrar un gasto, envía un mensaje con el formato:\n\n'
        'gasto [monto] [categoría] [descripción]\n\n'
        'Ejemplo:\n'
        'gasto 50 comida almuerzo en restaurante'
    )


# Comando /ingresos
async def ingresos_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Responde al comando /ingresos"""
    await update.message.reply_text(
        '💵 Para registrar un ingreso, envía un mensaje con el formato:\n\n'
        'ingreso [monto] [fuente] [descripción]\n\n'
        'Ejemplo:\n'
        'ingreso 1000 salario pago quincenal'
    )


# Manejo de mensajes de texto
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Procesa los mensajes de texto recibidos"""
    message_type: str = update.message.chat.type
    text: str = update.message.text.lower()
    
    print(f'Usuario ({update.message.chat.id}) en {message_type}: "{text}"')
    
    # Procesar el mensaje
    if message_type == 'group':
        # En grupos, solo responder si se menciona al bot
        if BOT_USERNAME in text:
            new_text: str = text.replace(BOT_USERNAME, '').strip()
            response: str = process_text(new_text)
        else:
            return
    else:
        # En chats privados, responder siempre
        response: str = process_text(text)
    
    # Enviar respuesta
    print('Bot:', response)
    await update.message.reply_text(response)


def process_text(text: str) -> str:
    """Procesa el texto del mensaje y genera una respuesta"""
    # Aquí se integraría la lógica de procesamiento con IA o reglas
    
    # if 'hola' in text:
    #     return '¡Hola! ¿En qué puedo ayudarte hoy? 😊'
    
    # if 'gasto' in text:
    #     # Aquí se procesaría el registro de gasto
    #     return '✅ Gasto registrado correctamente.\n(Integrar con API para guardar en BD)'
    
    # if 'ingreso' in text:
    #     # Aquí se procesaría el registro de ingreso
    #     return '✅ Ingreso registrado correctamente.\n(Integrar con API para guardar en BD)'
    
    # if 'balance' in text or 'saldo' in text:
    #     return '💰 Tu balance actual es: $3,500\n(Datos de ejemplo - integrar con API)'
    
    # if 'ayuda' in text:
    #     return 'Escribe /help para ver todos los comandos disponibles.'
    
    categorias = ['comida', 'transporte', 'salud', 'entretenimiento', 'educacion', 'ropa']
    tipo = ['gasto', 'ingreso']
    import ollama

    response = ollama.chat(
        model='llama3.2',
        messages=[{
            'role': 'user',
            'content': f'del siguiente texto, extrae el elemento y el precio asociado: {text}, a eso asignale la categoria que mejor le corresponda de la siguiente lista: {categorias}, a esto añade el tipo que mejor le corresponda de la siguiente lista: {tipo}, responde en el siguiente formato: "Elemento: [elemento], Cantidad, [cantidad], PrecioUnidad: [precio/cantidad], Precio: [precio], Categoria: [categoria], Tipo: [tipo]", no quiero que me expliques nada mas, solo responde en el formato indicado.'
        }]
    )

    print(response['message']['content'])
    return response['message']['content']

    # Respuesta por defecto
    # return (
    #     'Entiendo que quieres: ' + text + '\n\n'
    #     'Actualmente estoy en modo POC. '
    #     'Usa /help para ver los comandos disponibles.'
    # )


# Manejo de errores
async def error(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Registra los errores del bot"""
    print(f'Update {update} causó el error: {context.error}')


def main():
    """Función principal para ejecutar el bot"""
    print('Iniciando bot de Telegram...')
    
    # Crear la aplicación
    app = Application.builder().token(TOKEN).build()
    
    # Registrar comandos
    app.add_handler(CommandHandler('start', start_command))
    app.add_handler(CommandHandler('help', help_command))
    app.add_handler(CommandHandler('balance', balance_command))
    app.add_handler(CommandHandler('gastos', gastos_command))
    app.add_handler(CommandHandler('ingresos', ingresos_command))
    
    # Registrar manejador de mensajes
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    
    # Registrar manejador de errores
    app.add_error_handler(error)
    
    # Iniciar el bot con polling
    print('Bot iniciado. Presiona Ctrl+C para detener.')
    app.run_polling(poll_interval=3)


if __name__ == '__main__':
    main()
