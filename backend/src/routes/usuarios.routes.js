import { Router } from 'express'
import { authMiddleware, requireAdmin } from '../middleware/auth.middleware.js'
import { listarUsuarios, obtenerUsuario, actualizarUsuario } from '../controllers/usuarios.controller.js'

const router = Router()

// Solo admin
router.get('/', authMiddleware, requireAdmin, listarUsuarios)
router.get('/:id', authMiddleware, requireAdmin, obtenerUsuario)
router.put('/:id', authMiddleware, requireAdmin, actualizarUsuario)

export default router
