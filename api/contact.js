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

    // Aquí puedes agregar tu lógica para:
    // 1. Enviar a tu servidor local
    // 2. Guardar en base de datos
    // 3. Enviar email
    // 4. Enviar a Discord/Telegram

    // Ejemplo: Enviar a tu servidor local (necesitarás configurar ngrok o similar)
    try {
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });
      
      if (response.ok) {
        return res.status(200).json({ message: 'Message sent successfully' });
      } else {
        throw new Error('Failed to send to local server');
      }
    } catch (localServerError) {
      // Si el servidor local no está disponible, 
      // puedes guardar en un archivo o enviar por email
      console.log('Local server unavailable, saving message:', { name, email, subject, message });
      
      // Opción 1: Guardar en Vercel KV (base de datos gratuita)
      // Opción 2: Enviar email con Resend
      // Opción 3: Enviar a Discord webhook
      
      return res.status(200).json({ message: 'Message received (local server unavailable)' });
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
