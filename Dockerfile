# Dockerfile principal para FinSmart
# Este archivo sirve como referencia. Usa docker-compose.yml para orquestar todos los servicios.

# Para construir y ejecutar todos los servicios:
# docker-compose up -d

# Para detener todos los servicios:
# docker-compose down

# Para ver logs:
# docker-compose logs -f

# Para reconstruir después de cambios:
# docker-compose up -d --build

# Servicios incluidos:
# - PostgreSQL 17 (puerto 5342)
# - Ollama con Llama 3.2 (puerto 11434)
# - Servicio de IA (puerto 8001)
# - Backend API (puerto 8000)
# - Frontend Next.js (puerto 3000)
# - Bot de Telegram
