export const errorMiddleware = (err, req, res, next) => {
  console.error('Error:', err)

  // Errores conocidos
  if (err.message.includes('Unique constraint failed')) {
    return res.status(409).json({ error: 'El email ya existe' })
  }

  if (err.message === 'Credenciales inválidas') {
    return res.status(401).json({ error: err.message })
  }

  if (err.message === 'Usuario no encontrado') {
    return res.status(404).json({ error: err.message })
  }

  // Error genérico
  res.status(err.statusCode || 500).json({
    error: err.message || 'Error interno del servidor'
  })
}
