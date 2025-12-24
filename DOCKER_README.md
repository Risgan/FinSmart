# 🐳 FinSmart - Guía de Docker

Este documento explica cómo usar Docker para ejecutar todos los servicios de FinSmart.

## 📋 Prerequisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) (incluido en Docker Desktop)
- Al menos 8GB de RAM disponible
- 20GB de espacio en disco

## 🚀 Inicio Rápido

### 1. Configurar variables de entorno

```powershell
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env con tus valores reales
notepad .env
```

Asegúrate de configurar al menos:
- `TELEGRAM_BOT_TOKEN` - Tu token de @BotFather
- `BOT_USERNAME` - El username de tu bot
- `JWT_SECRET` - Una clave secreta para autenticación

### 2. Iniciar todos los servicios

```powershell
# Construir e iniciar todos los contenedores
docker-compose up -d

# Ver los logs
docker-compose logs -f
```

### 3. Verificar que todo esté funcionando

```powershell
# Ver el estado de los contenedores
docker-compose ps

# Deberías ver:
# - finsmart-postgres (puerto 5342)
# - finsmart-ollama (puerto 11434)
# - finsmart-ia (puerto 8001)
# - finsmart-backend (puerto 8000)
# - finsmart-frontend (puerto 3000)
# - finsmart-telegram-bot
```

### 4. Acceder a los servicios

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **Documentación API:** http://localhost:8000/docs
- **Servicio IA:** http://localhost:8001
- **PostgreSQL:** localhost:5342
- **Ollama API:** http://localhost:11434

## 🔧 Comandos Útiles

### Gestión de contenedores

```powershell
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (¡cuidado! elimina datos)
docker-compose down -v

# Reiniciar un servicio específico
docker-compose restart backend

# Ver logs de un servicio específico
docker-compose logs -f backend

# Ver logs de todos los servicios
docker-compose logs -f

# Reconstruir después de cambios en el código
docker-compose up -d --build

# Reconstruir un servicio específico
docker-compose up -d --build backend
```

### Ejecutar comandos en los contenedores

```powershell
# Acceder a la shell del backend
docker-compose exec backend bash

# Ejecutar migraciones de base de datos
docker-compose exec backend alembic upgrade head

# Acceder a PostgreSQL
docker-compose exec postgres psql -U finsmart_user -d finsmart

# Ver modelos instalados en Ollama
docker-compose exec ollama ollama list

# Ejecutar Ollama con Llama 3.2
docker-compose exec ollama ollama run llama3.2
```

### Gestión de la base de datos

```powershell
# Backup de la base de datos
docker-compose exec postgres pg_dump -U finsmart_user finsmart > backup.sql

# Restaurar desde backup
cat backup.sql | docker-compose exec -T postgres psql -U finsmart_user -d finsmart

# Ver tablas
docker-compose exec postgres psql -U finsmart_user -d finsmart -c "\dt"
```

## 📦 Arquitectura de Contenedores

```
┌─────────────────────────────────────────────────────────┐
│                    finsmart-network                     │
│                                                         │
│  ┌──────────────┐      ┌──────────────┐               │
│  │   Frontend   │◄────►│   Backend    │               │
│  │  (Next.js)   │      │  (FastAPI)   │               │
│  │  Port: 3000  │      │  Port: 8000  │               │
│  └──────────────┘      └──────┬───────┘               │
│                               │                         │
│  ┌──────────────┐      ┌──────▼───────┐               │
│  │ Telegram Bot │◄────►│  IA Service  │               │
│  │   (Python)   │      │  (FastAPI)   │               │
│  └──────┬───────┘      │  Port: 8001  │               │
│         │              └──────┬───────┘               │
│         │                     │                         │
│         │              ┌──────▼───────┐               │
│         └─────────────►│    Ollama    │               │
│                        │  (Llama 3.2) │               │
│                        │ Port: 11434  │               │
│                        └──────────────┘               │
│                                                         │
│                        ┌──────────────┐               │
│                        │  PostgreSQL  │               │
│                        │      17      │               │
│                        │  Port: 5342  │               │
│                        └──────────────┘               │
└─────────────────────────────────────────────────────────┘
```

## 🔍 Monitoreo y Debugging

### Ver uso de recursos

```powershell
# Ver uso de CPU y memoria
docker stats

# Ver uso de espacio en disco
docker system df
```

### Logs detallados

```powershell
# Logs de los últimos 100 líneas
docker-compose logs --tail=100

# Logs desde una fecha específica
docker-compose logs --since 2024-01-01

# Logs con timestamps
docker-compose logs -t
```

### Healthchecks

```powershell
# Ver estado de salud de los contenedores
docker-compose ps

# Inspeccionar un contenedor específico
docker inspect finsmart-postgres
```

## 🐛 Troubleshooting

### El contenedor de Ollama no descarga el modelo

```powershell
# Descargar manualmente el modelo
docker-compose exec ollama ollama pull llama3.2

# Verificar que se descargó
docker-compose exec ollama ollama list
```

### PostgreSQL no acepta conexiones

```powershell
# Ver logs de PostgreSQL
docker-compose logs postgres

# Verificar que el healthcheck pasa
docker inspect finsmart-postgres | grep Health -A 10

# Reiniciar el servicio
docker-compose restart postgres
```

### Frontend no se conecta al Backend

```powershell
# Verificar variables de entorno del Frontend
docker-compose exec frontend env | grep API

# Verificar que el Backend está corriendo
curl http://localhost:8000/health
```

### Problemas de memoria

```powershell
# Ver uso de memoria
docker stats

# Asignar más memoria en Docker Desktop:
# Settings > Resources > Memory > Aumentar a 8GB o más
```

### Limpiar todo y empezar de nuevo

```powershell
# Detener todos los contenedores
docker-compose down

# Eliminar volúmenes
docker-compose down -v

# Limpiar imágenes no usadas
docker system prune -a

# Reconstruir todo
docker-compose up -d --build
```

## 🔄 Actualizaciones

### Actualizar código sin reconstruir

Los volúmenes montados permiten que los cambios en el código se reflejen automáticamente (con hot-reload en desarrollo).

### Actualizar con reconstrucción

```powershell
# Detener servicios
docker-compose down

# Reconstruir con cambios
docker-compose up -d --build
```

### Actualizar solo un servicio

```powershell
docker-compose up -d --build backend
```

## 📊 Volúmenes de Datos

Los siguientes volúmenes persisten datos:

- `postgres_data` - Base de datos PostgreSQL
- `ollama_data` - Modelos de Ollama
- `ia_cache` - Cache del servicio de IA
- `backend_uploads` - Archivos subidos al backend

Para hacer backup:

```powershell
# Listar volúmenes
docker volume ls

# Crear backup de un volumen
docker run --rm -v finsmart_postgres_data:/data -v ${PWD}:/backup alpine tar czf /backup/postgres_backup.tar.gz /data
```

## 🌐 Despliegue en Producción

Para producción, considera:

1. **Usar variables de entorno seguras**
   ```powershell
   # No commitear .env al repositorio
   # Usar secrets de Docker o variables del hosting
   ```

2. **Configurar reverse proxy (nginx)**
   ```yaml
   # Agregar servicio nginx en docker-compose.yml
   ```

3. **Usar volúmenes con nombre para datos importantes**

4. **Configurar SSL/TLS**

5. **Limitar recursos**
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '2'
         memory: 4G
   ```

6. **Configurar logging centralizado**

7. **Implementar monitoreo (Prometheus, Grafana)**

## 📝 Notas Importantes

- El primer inicio puede tardar varios minutos mientras descarga las imágenes y el modelo de Ollama
- Ollama con Llama 3.2 requiere ~4GB de RAM
- PostgreSQL usa el puerto 5342 (no el 5432 estándar) para evitar conflictos
- Los servicios están en una red privada y solo exponen los puertos necesarios
- Para usar GPU con Ollama, asegúrate de tener NVIDIA Docker toolkit instalado

## 🆘 Obtener Ayuda

Si tienes problemas:

1. Revisa los logs: `docker-compose logs -f`
2. Verifica el estado: `docker-compose ps`
3. Revisa la documentación de cada servicio
4. Consulta los issues en GitHub
