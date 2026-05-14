import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { listarInformes, obtenerInforme, crearInforme, actualizarInforme, eliminarInforme } from '../controllers/informes.controller.js'

const router = Router()

// Todas protegidas
router.get('/', authMiddleware, listarInformes)
router.get('/:id', authMiddleware, obtenerInforme)
router.post('/', authMiddleware, crearInforme)
router.put('/:id', authMiddleware, actualizarInforme)
router.delete('/:id', authMiddleware, eliminarInforme)

export default router
