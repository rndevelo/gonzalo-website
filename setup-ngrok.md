# Configuración de ngrok para recibir mensajes del formulario

## Paso 1: Instalar ngrok
```bash
# Descarga ngrok desde https://ngrok.com/download
# O usa Chocolatey (Windows):
choco install ngrok
```

## Paso 2: Iniciar tu servidor Ktor
```bash
# En la carpeta backend
./gradlew run
```

## Paso 3: Iniciar ngrok
```bash
# Exponer tu puerto 8080 a internet
ngrok http 8080
```

## Paso 4: Actualizar la URL en la API
Copia la URL que te da ngrok (ej: https://abc123.ngrok.io) y reemplaza en api/contact.js

## Paso 5: Probar el formulario
1. Ve a tu sitio en Vercel
2. Envía un mensaje desde el formulario
3. Revisa que llegue a tu servidor local

## URLs de ejemplo:
- ngrok URL: https://abc123.ngrok.io
- API endpoint: https://abc123.ngrok.io/api/contact

## Notas importantes:
- ngrok gratuito tiene límites de tiempo (8 horas)
- La URL cambia cada vez que reinicias ngrok
- Para producción, considera ngrok pago o Railway/Render
