import { prisma } from '../config/db.js'

const TIPOS_VALIDOS = ['MUEBLE', 'INMUEBLE', 'INMATERIAL']
const TIPOS_PATRIMONIO_VALIDOS = ['ARQUEOLOGICO', 'ARQUITECTONICO', 'ARTISTICO', 'DOCUMENTAL', 'ETNOGRAFICO', 'INDUSTRIAL', 'MUSICAL']
const ESTILOS_VALIDOS = ['ACADEMICISMO', 'BARROCO', 'CLASICISMO', 'ECLECTICISMO', 'FLAMENCO', 'GOTICO', 'INDIGENISMO', 'MODERNISMO', 'MUDEJAR', 'NEOCANARIO', 'NEOCLASICO', 'NEOGÓTICO', 'RACIONALISMO', 'RENACIMIENTO', 'ROMANTICISMO', 'TRADICIONAL_POPULAR']

// GET /api/bienes
export const listarBienes = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, tipo, municipio, tipoPatrimonio, estilo, anioDesde, anioHasta } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const where = {}

    if (search) {
      where.OR = [
        { nombre: { contains: search, mode: 'insensitive' } },
        { descripcion: { contains: search, mode: 'insensitive' } }
      ]
    }
    if (tipo && TIPOS_VALIDOS.includes(tipo)) where.tipo = tipo
    if (municipio) where.municipio = { contains: municipio, mode: 'insensitive' }
    if (tipoPatrimonio && TIPOS_PATRIMONIO_VALIDOS.includes(tipoPatrimonio)) where.tipoPatrimonio = tipoPatrimonio
    if (estilo && ESTILOS_VALIDOS.includes(estilo)) where.estilo = estilo
   if (anioDesde || anioHasta) {
  const desdeValido = anioDesde && anioDesde.length === 4
  const hastaValido = anioHasta && anioHasta.length === 4
  
  if (desdeValido || hastaValido) {
    where.informes = {
      some: {
        fechaInicio: {
          ...(desdeValido && { gte: new Date(`${anioDesde}-01-01`) }),
          ...(hastaValido && { lte: new Date(`${anioHasta}-12-31`) })
        }
      }
    }
  }
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

// GET /api/bienes/:id
export const obtenerBien = async (req, res, next) => {
  try {
    const { id } = req.params

    const bien = await prisma.bien.findUnique({
      where: { id: Number(id) },
      include: {
        informes: {
          include: { restaurador: { select: { id: true, nombre: true, email: true } }, materiales: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!bien) return res.status(404).json({ error: 'Bien no encontrado' })

    res.json(bien)
  } catch (err) {
    next(err)
  }
}

// POST /api/bienes
export const crearBien = async (req, res, next) => {
  try {
    const { nombre, tipo, municipio, tipoPatrimonio, estilo, ubicacion, descripcion, imagen } = req.body

    if (!nombre || !tipo || !ubicacion) {
      return res.status(400).json({ error: 'Nombre, tipo y ubicación son obligatorios' })
    }
    if (!TIPOS_VALIDOS.includes(tipo)) {
      return res.status(400).json({ error: 'Tipo no válido' })
    }

    const bien = await prisma.bien.create({
      data: { nombre, tipo, municipio, tipoPatrimonio, estilo, ubicacion, descripcion, imagen }
    })

    res.status(201).json(bien)
  } catch (err) {
    next(err)
  }
}

// PUT /api/bienes/:id
export const actualizarBien = async (req, res, next) => {
  try {
    const { id } = req.params
    const { nombre, tipo, municipio, tipoPatrimonio, estilo, ubicacion, descripcion, imagen } = req.body

    const bien = await prisma.bien.findUnique({ where: { id: Number(id) } })
    if (!bien) return res.status(404).json({ error: 'Bien no encontrado' })

    const actualizado = await prisma.bien.update({
      where: { id: Number(id) },
      data: { nombre, tipo, municipio, tipoPatrimonio, estilo, ubicacion, descripcion, imagen }
    })

    res.json(actualizado)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/bienes/:id
export const eliminarBien = async (req, res, next) => {
  try {
    const { id } = req.params

    const bien = await prisma.bien.findUnique({ where: { id: Number(id) } })
    if (!bien) return res.status(404).json({ error: 'Bien no encontrado' })

    await prisma.bien.delete({ where: { id: Number(id) } })

    res.json({ ok: true, mensaje: 'Bien eliminado' })
  } catch (err) {
    next(err)
  }
}