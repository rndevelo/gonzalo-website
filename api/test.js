export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Datos de prueba para el proyecto
  const testData = {
    message: '¡API funcionando correctamente!',
    timestamp: new Date().toISOString(),
    project: {
      name: 'Gonzalo Website',
      status: 'Active',
      version: '1.0.0'
    },
    sampleData: {
      projects: [
        {
          id: 1,
          title: 'Proyecto Android',
          description: 'App móvil con Kotlin',
          tech: ['Kotlin', 'Jetpack Compose', 'Clean Architecture']
        },
        {
          id: 2,
          title: 'Website Personal',
          description: 'Portfolio con frontend y backend',
          tech: ['HTML', 'CSS', 'JavaScript', 'Ktor']
        }
      ],
      skills: [
        { name: 'Kotlin', level: 'Advanced' },
        { name: 'Android', level: 'Advanced' },
        { name: 'JavaScript', level: 'Intermediate' }
      ]
    }
  };

  return res.status(200).json(testData);
}
