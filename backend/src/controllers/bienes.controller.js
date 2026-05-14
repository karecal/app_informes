import { prisma } from '../config/db.js'

// GET /api/bienes - Listar con paginación
export const listarBienes = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, tipo } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const where = {}
    if (search) {
      where.OR = [
        { nombre: { contains: search, mode: 'insensitive' } },
        { descripcion: { contains: search, mode: 'insensitive' } }
      ]
    }
    if (tipo && ['MUEBLE', 'INMUEBLE'].includes(tipo)) {
      where.tipo = tipo
    }

    const [bienes, total] = await Promise.all([
      prisma.bien.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { informes: true } } }
      }),
      prisma.bien.count({ where })
    ])

    res.json({
      data: bienes,
      total,
      pagina: Number(page),
      totalPaginas: Math.ceil(total / Number(limit))
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/bienes/:id - Detalle con informes
export const obtenerBien = async (req, res, next) => {
  try {
    const { id } = req.params

    const bien = await prisma.bien.findUnique({
      where: { id: Number(id) },
      include: {
        informes: {
          include: { restaurador: { select: { nombre: true, email: true } }, materiales: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!bien) {
      return res.status(404).json({ error: 'Bien no encontrado' })
    }

    res.json(bien)
  } catch (err) {
    next(err)
  }
}

// POST /api/bienes - Crear (solo admin)
export const crearBien = async (req, res, next) => {
  try {
    const { nombre, tipo, ubicacion, descripcion, imagen } = req.body

    if (!nombre || !tipo || !ubicacion) {
      return res.status(400).json({ error: 'Nombre, tipo y ubicación son obligatorios' })
    }

    if (!['MUEBLE', 'INMUEBLE'].includes(tipo)) {
      return res.status(400).json({ error: 'Tipo debe ser MUEBLE o INMUEBLE' })
    }

    const bien = await prisma.bien.create({
      data: { nombre, tipo, ubicacion, descripcion, imagen }
    })

    res.status(201).json(bien)
  } catch (err) {
    next(err)
  }
}

// PUT /api/bienes/:id - Actualizar (solo admin)
export const actualizarBien = async (req, res, next) => {
  try {
    const { id } = req.params
    const { nombre, tipo, ubicacion, descripcion, imagen } = req.body

    const bien = await prisma.bien.findUnique({ where: { id: Number(id) } })
    if (!bien) {
      return res.status(404).json({ error: 'Bien no encontrado' })
    }

    const actualizado = await prisma.bien.update({
      where: { id: Number(id) },
      data: { nombre, tipo, ubicacion, descripcion, imagen }
    })

    res.json(actualizado)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/bienes/:id - Eliminar (solo admin)
export const eliminarBien = async (req, res, next) => {
  try {
    const { id } = req.params

    const bien = await prisma.bien.findUnique({ where: { id: Number(id) } })
    if (!bien) {
      return res.status(404).json({ error: 'Bien no encontrado' })
    }

    await prisma.bien.delete({ where: { id: Number(id) } })

    res.json({ ok: true, mensaje: 'Bien eliminado' })
  } catch (err) {
    next(err)
  }
}
