import { Router } from 'express'
import { authMiddleware, requireAdmin } from '../middleware/auth.middleware.js'
import { listarBienes, obtenerBien, crearBien, actualizarBien, eliminarBien } from '../controllers/bienes.controller.js'

const router = Router()

// Públicas
router.get('/', listarBienes)
router.get('/:id', obtenerBien)

// Protegidas - solo admin
router.post('/', authMiddleware, requireAdmin, crearBien)
router.put('/:id', authMiddleware, requireAdmin, actualizarBien)
router.delete('/:id', authMiddleware, requireAdmin, eliminarBien)

export default router
