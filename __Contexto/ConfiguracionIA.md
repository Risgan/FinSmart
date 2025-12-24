# Configuración de IA para FinSmart

## 📋 Opciones de Modelos de IA

Para el procesamiento de lenguaje natural en el bot de Telegram, tenemos varias opciones:

---

## 🚀 Opción 1: Ollama (Recomendado - Local y Gratuito)

Ollama permite ejecutar modelos de IA potentes localmente sin necesidad de internet ni APIs externas.

### Paso 1: Descargar Ollama

1. Ve a [https://ollama.com/download](https://ollama.com/download)
2. Descarga la versión para Windows
3. Ejecuta el instalador `OllamaSetup.exe`
4. Sigue el asistente de instalación

### Paso 2: Verificar la instalación

```powershell
# Abre PowerShell y verifica que Ollama esté instalado
ollama --version
```

### Paso 3: Descargar modelos

**Para procesamiento de lenguaje general (recomendado):**
```powershell
# Llama 3.2 (3B) - Ligero y rápido
ollama pull llama3.2

# O Llama 3.1 (8B) - Más potente pero requiere más RAM
ollama pull llama3.1
```

**Para análisis financiero específico:**
```powershell
# Mistral - Excelente para razonamiento
ollama pull mistral

# Gemma - Optimizado de Google
ollama pull gemma2:9b
```

**Para español:**
```powershell
# Llama 3.2 funciona bien en español
ollama pull llama3.2

# Alternativa especializada en español
ollama pull bge-m3
```

### Paso 4: Probar el modelo

```powershell
# Iniciar chat interactivo
ollama run llama3.2

# Probar con un prompt de prueba
# Escribe: "Hola, ayúdame a categorizar este gasto: compré pizza por $15"
# Para salir: /bye
```

### Paso 5: Integración con Python

**Instalar la librería de Ollama:**
```powershell
pip install ollama
```

**Código de ejemplo:**
```python
import ollama

response = ollama.chat(
    model='llama3.2',
    messages=[{
        'role': 'user',
        'content': 'Categoriza este gasto: compré pizza por $15'
    }]
)

print(response['message']['content'])
```

### Requisitos del Sistema
- **RAM:** Mínimo 8GB (16GB recomendado)
- **Espacio en disco:** 4-10GB por modelo
- **Procesador:** Intel/AMD moderno (GPU opcional para mejor rendimiento)

---

## 🌐 Opción 2: OpenAI API (GPT)

Más potente pero requiere conexión a internet y tiene costo.

### Paso 1: Crear cuenta en OpenAI

1. Ve a [https://platform.openai.com/signup](https://platform.openai.com/signup)
2. Regístrate con tu email
3. Verifica tu cuenta

### Paso 2: Obtener API Key

1. Ve a [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Click en "Create new secret key"
3. Copia la clave (solo se muestra una vez)
4. Guárdala en tu archivo `.env`:
   ```
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
   ```

### Paso 3: Instalar librería

```powershell
pip install openai
```

### Paso 4: Código de ejemplo

```python
from openai import OpenAI

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

response = client.chat.completions.create(
    model="gpt-4o-mini",  # Más económico
    messages=[
        {"role": "system", "content": "Eres un asistente financiero experto"},
        {"role": "user", "content": "Categoriza este gasto: compré pizza por $15"}
    ]
)

print(response.choices[0].message.content)
```

### Costos aproximados (GPT-4o-mini):
- **Input:** $0.15 por 1M tokens
- **Output:** $0.60 por 1M tokens
- ~$0.01 por cada 100 mensajes típicos

---

## 🤗 Opción 3: Hugging Face (Modelos especializados)

Modelos específicos para tareas financieras.

### Paso 1: Instalar librerías

```powershell
pip install transformers torch sentencepiece
```

### Paso 2: Código de ejemplo

```python
from transformers import pipeline

# Clasificador de texto para categorización
classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli"
)

texto = "Compré pizza por $15"
categorias = ["comida", "transporte", "entretenimiento", "servicios"]

result = classifier(texto, categorias)
print(f"Categoría: {result['labels'][0]}")
```

---

## 📊 Comparación de Opciones

| Característica | Ollama | OpenAI | Hugging Face |
|----------------|--------|--------|--------------|
| **Costo** | Gratis | De pago | Gratis |
| **Internet** | No requiere | Requiere | No requiere |
| **Potencia** | Media-Alta | Muy Alta | Media |
| **Privacidad** | Total | Limitada | Total |
| **Facilidad** | Media | Alta | Baja |
| **Latencia** | Baja | Media | Baja |
| **Español** | Bueno | Excelente | Variable |

---

## 🎯 Recomendación para FinSmart

**Para desarrollo/POC:** Ollama con Llama 3.2
- Gratis y sin límites
- Funciona offline
- Bueno para español
- Datos privados

**Para producción:** Combinación híbrida
- Ollama para categorización simple
- OpenAI para análisis complejos y reportes
- Fallback entre ambos

---

## 🔧 Integración con el Bot de Telegram

### Archivo: `POC/ai_processor.py`

```python
import ollama
import os
from typing import Dict, Any

class AIProcessor:
    def __init__(self, model: str = "llama3.2"):
        self.model = model
    
    def categorize_transaction(self, text: str) -> Dict[str, Any]:
        """Categoriza una transacción usando IA"""
        prompt = f"""
        Analiza esta transacción y extrae:
        - Monto (número)
        - Categoría (comida, transporte, entretenimiento, servicios, salud, otros)
        - Descripción breve
        
        Transacción: {text}
        
        Responde en formato JSON.
        """
        
        response = ollama.chat(
            model=self.model,
            messages=[{
                'role': 'user',
                'content': prompt
            }]
        )
        
        return response['message']['content']
    
    def financial_advice(self, balance: float, expenses: float) -> str:
        """Genera consejo financiero personalizado"""
        prompt = f"""
        Basado en estos datos financieros:
        - Balance: ${balance}
        - Gastos mensuales: ${expenses}
        
        Da un consejo financiero breve y práctico en español.
        """
        
        response = ollama.chat(
            model=self.model,
            messages=[{
                'role': 'system',
                'content': 'Eres un asesor financiero experto.'
            }, {
                'role': 'user',
                'content': prompt
            }]
        )
        
        return response['message']['content']

# Uso:
# ai = AIProcessor()
# result = ai.categorize_transaction("gasté 50 pesos en uber")
```

---

## 📝 Próximos Pasos

1. ✅ Instalar Ollama
2. ✅ Descargar modelo Llama 3.2
3. ✅ Probar con ejemplos
4. ⬜ Integrar con el bot de Telegram
5. ⬜ Crear prompts específicos para finanzas
6. ⬜ Agregar caché de respuestas frecuentes
7. ⬜ Implementar análisis de sentimiento
8. ⬜ Crear reportes automáticos con IA

---

## 🐛 Troubleshooting

**Error: "ollama not found"**
- Reinicia PowerShell después de la instalación
- Verifica que Ollama esté en el PATH

**Modelo muy lento:**
- Usa un modelo más pequeño (llama3.2 en lugar de llama3.1:70b)
- Considera usar GPU si está disponible

**Respuestas en inglés:**
- Especifica en el prompt: "Responde en español"
- Usa modelos entrenados en español

**Error de memoria:**
- Cierra otras aplicaciones
- Usa modelos más pequeños
- Aumenta la RAM del sistema
