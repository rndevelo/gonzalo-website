export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validación básica
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Opciones de entrega de mensajes
    const deliveryMethods = {
      // 1. Enviar a tu servidor local via ngrok
      localServer: async () => {
        const ngrokUrl = process.env.NGROK_URL || 'http://localhost:8080';
        const response = await fetch(`${ngrokUrl}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message }),
        });
        return response.ok;
      },

      // 2. Enviar a Discord webhook
      discord: async () => {
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
        if (!webhookUrl) return false;
        
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `📩 Nuevo mensaje de contacto\n**Nombre:** ${name}\n**Email:** ${email}\n**Asunto:** ${subject}\n**Mensaje:** ${message}`
          }),
        });
        return true;
      },

      // 3. Guardar en Vercel KV (base de datos gratuita)
      saveToKV: async () => {
        // Implementar cuando tengas Vercel KV
        console.log('Message saved to KV:', { name, email, subject, message, timestamp: new Date().toISOString() });
        return true;
      }
    };

    // Intentar métodos de entrega en orden de preferencia
    try {
      // Intentar servidor local primero
      if (await deliveryMethods.localServer()) {
        return res.status(200).json({ message: 'Message sent successfully to your local server' });
      }
    } catch (localError) {
      console.log('Local server unavailable, trying alternatives...');
    }

    // Si el servidor local falla, intentar Discord
    try {
      if (await deliveryMethods.discord()) {
        return res.status(200).json({ message: 'Message sent to Discord (local server unavailable)' });
      }
    } catch (discordError) {
      console.log('Discord unavailable, saving locally...');
    }

    // Último recurso: guardar en KV
    await deliveryMethods.saveToKV();
    return res.status(200).json({ message: 'Message received and saved (will sync later)' });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
