import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import bienesRoutes from './routes/bienes.routes.js'
import informesRoutes from './routes/informes.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'
import { errorMiddleware } from './middleware/error.middleware.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/bienes', bienesRoutes)
app.use('/api/informes', informesRoutes)
app.use('/api/usuarios', usuariosRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

// 404 - Rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

// Error handler
app.use(errorMiddleware)

export default app
