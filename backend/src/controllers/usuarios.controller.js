import { prisma } from '../config/db.js'

// GET /api/usuarios
export const listarUsuarios = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const [usuarios, total] = await Promise.all([
      prisma.usuario.findMany({
        skip,
        take: Number(limit),
        select: { id: true, nombre: true, email: true, rol: true, activo: true, createdAt: true },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.usuario.count()
    ])

    res.json({
      data: usuarios,
      total,
      pagina: Number(page),
      totalPaginas: Math.ceil(total / Number(limit))
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/usuarios/:id
export const obtenerUsuario = async (req, res, next) => {
  try {
    const { id } = req.params

    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
      select: { id: true, nombre: true, email: true, rol: true, activo: true, createdAt: true }
    })

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    res.json(usuario)
  } catch (err) {
    next(err)
  }
}

// PUT /api/usuarios/:id (actualizar nombre/estado)
export const actualizarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params
    const { nombre, activo } = req.body

    const usuario = await prisma.usuario.findUnique({ where: { id: Number(id) } })
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const actualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { nombre, activo },
      select: { id: true, nombre: true, email: true, rol: true, activo: true }
    })

    res.json(actualizado)
  } catch (err) {
    next(err)
  }
}
