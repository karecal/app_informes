import bcrypt from 'bcrypt'
import { prisma } from '../src/config/db.js'

async function main() {
  console.log('🌱 Comenzando seed...')

  // Limpiar base de datos
  await prisma.materialInforme.deleteMany({})
  await prisma.informe.deleteMany({})
  await prisma.bien.deleteMany({})
  await prisma.usuario.deleteMany({})

  // Crear usuarios
  const admin = await prisma.usuario.create({
    data: {
      nombre: 'Administrador',
      email: 'admin@patrimonio.com',
      password: await bcrypt.hash('admin123', 10),
      rol: 'ADMIN'
    }
  })

  const restaurador1 = await prisma.usuario.create({
    data: {
      nombre: 'Juan Restaurador',
      email: 'juan@patrimonio.com',
      password: await bcrypt.hash('juan123', 10),
      rol: 'RESTAURADOR'
    }
  })

  const restaurador2 = await prisma.usuario.create({
    data: {
      nombre: 'María Conservadora',
      email: 'maria@patrimonio.com',
      password: await bcrypt.hash('maria123', 10),
      rol: 'RESTAURADOR'
    }
  })

  console.log('✅ Usuarios creados')

  // Crear bienes
  const bien1 = await prisma.bien.create({
    data: {
      nombre: 'Retablo de San Cristóbal',
      tipo: 'INMUEBLE',
      ubicacion: 'Iglesia de Santa María',
      descripcion: 'Retablo barroco del siglo XVII en estado de deterioro'
    }
  })

  const bien2 = await prisma.bien.create({
    data: {
      nombre: 'Ánfora romana',
      tipo: 'MUEBLE',
      ubicacion: 'Museo local',
      descripcion: 'Cerámica romana, siglo II d.C.'
    }
  })

  const bien3 = await prisma.bien.create({
    data: {
      nombre: 'Escultura de madera',
      tipo: 'MUEBLE',
      ubicacion: 'Convento de San Francisco',
      descripcion: 'Talla en madera policromada, época colonial'
    }
  })

  const bien4 = await prisma.bien.create({
    data: {
      nombre: 'Torre del Reloj Municipal',
      tipo: 'INMUEBLE',
      ubicacion: 'Plaza Mayor',
      descripcion: 'Torre de piedra del siglo XVIII con reloj original en funcionamiento'
    }
  })

  console.log('✅ Bienes creados')

  // ── INFORMES DEL BIEN 1: Retablo de San Cristóbal (3 informes) ──

  await prisma.informe.create({
    data: {
      titulo: 'Inspección inicial retablo',
      diagnostico: 'Presencia de grietas en la madera soporte y desprendimientos de la capa pictórica en zona superior izquierda',
      tratamiento: 'Fijación de urgencia de las zonas en peligro de pérdida',
      procedimientos: 'Aplicación de papel japonés con Paraloid B-72 al 3% en acetona',
      estado: 'FINALIZADO',
      fechaInicio: new Date('2023-03-10'),
      fechaFin: new Date('2023-03-20'),
      bienId: bien1.id,
      restauradorId: restaurador2.id,
      materiales: {
        create: [
          { nombre: 'Papel japonés', cantidad: '2m²', proveedor: 'Conservatex' },
          { nombre: 'Paraloid B-72', cantidad: '200ml', proveedor: 'Química Patrimonio' },
          { nombre: 'Acetona', cantidad: '500ml', proveedor: 'Química Patrimonio' }
        ]
      }
    }
  })

  await prisma.informe.create({
    data: {
      titulo: 'Restauración retablo — Fase 1: limpieza',
      diagnostico: 'Acumulación de polvo compactado, depósitos de cera de velas y barniz oxidado que oscurece los colores originales',
      tratamiento: 'Limpieza mecánica y química por capas con solventes controlados',
      procedimientos: 'Test de solubilidad, limpieza con hisopo, trabajo por secciones de 20x20cm',
      estado: 'FINALIZADO',
      fechaInicio: new Date('2023-09-01'),
      fechaFin: new Date('2023-11-30'),
      bienId: bien1.id,
      restauradorId: restaurador1.id,
      materiales: {
        create: [
          { nombre: 'Agua destilada', cantidad: '10L', proveedor: 'Química Patrimonio' },
          { nombre: 'White Spirit', cantidad: '1L', proveedor: 'Química Patrimonio' },
          { nombre: 'Hisopos de algodón', cantidad: '500u', proveedor: 'Material Médico SA' }
        ]
      }
    }
  })

  await prisma.informe.create({
    data: {
      titulo: 'Restauración retablo — Fase 2: reintegración',
      diagnostico: 'Lagunas pictóricas en zonas limpiadas, pérdidas de preparación en bordes de grietas',
      tratamiento: 'Estucado de lagunas y reintegración cromática con acuarelas',
      procedimientos: 'Aplicación de estuco al agua, nivelación, reintegración puntillista',
      estado: 'EN_CURSO',
      fechaInicio: new Date('2024-05-01'),
      bienId: bien1.id,
      restauradorId: restaurador1.id,
      materiales: {
        create: [
          { nombre: 'Estuco al agua', cantidad: '1kg', proveedor: 'Conservatex' },
          { nombre: 'Acuarelas Winsor & Newton', cantidad: '1 set', proveedor: 'Bellas Artes SA' },
          { nombre: 'Pinceles finos n°0-2', cantidad: '6u', proveedor: 'Bellas Artes SA' }
        ]
      }
    }
  })

  // ── INFORMES DEL BIEN 2: Ánfora romana (2 informes) ──

  await prisma.informe.create({
    data: {
      titulo: 'Análisis y consolidación ánfora',
      diagnostico: 'Fragmentada en 3 partes, superficie erosionada con depósitos calcáreos',
      tratamiento: 'Limpieza, consolidación de fragmentos y estabilización',
      procedimientos: 'Adhesión de fragmentos con resina epóxica reversible, limpieza con bisturí',
      estado: 'FINALIZADO',
      fechaInicio: new Date('2024-04-15'),
      fechaFin: new Date('2024-05-10'),
      bienId: bien2.id,
      restauradorId: restaurador2.id,
      materiales: {
        create: [
          { nombre: 'Resina epóxica', cantidad: '250ml', proveedor: 'Resinas Patrimonio' },
          { nombre: 'Gasa de poliéster', cantidad: '10m', proveedor: 'Textiles Conserv' },
          { nombre: 'Bisturís', cantidad: '10u', proveedor: 'Material Médico SA' }
        ]
      }
    }
  })

  await prisma.informe.create({
    data: {
      titulo: 'Revisión anual y mantenimiento ánfora',
      diagnostico: 'Estado estable tras restauración. Leve polvo superficial. Sin nuevas fisuras detectadas',
      tratamiento: 'Limpieza superficial preventiva y revisión de uniones',
      procedimientos: 'Limpieza con brocha suave y aspiración controlada, revisión visual de adhesivos',
      estado: 'FINALIZADO',
      fechaInicio: new Date('2025-04-15'),
      fechaFin: new Date('2025-04-17'),
      bienId: bien2.id,
      restauradorId: restaurador2.id,
      materiales: {
        create: [
          { nombre: 'Brocha de pelo suave', cantidad: '2u', proveedor: 'Bellas Artes SA' }
        ]
      }
    }
  })

  // ── INFORMES DEL BIEN 3: Escultura de madera (3 informes) ──

  await prisma.informe.create({
    data: {
      titulo: 'Evaluación inicial escultura',
      diagnostico: 'Pintura desconchada en extremidades, presencia de xilófagos activos en peana',
      tratamiento: 'Fumigación y consolidación de base pictórica',
      procedimientos: 'Anoxia controlada durante 21 días, inyección de Paraloid en galerías de insectos',
      estado: 'FINALIZADO',
      fechaInicio: new Date('2024-06-01'),
      fechaFin: new Date('2024-07-15'),
      bienId: bien3.id,
      restauradorId: restaurador1.id,
      materiales: {
        create: [
          { nombre: 'Bolsas anóxicas', cantidad: '3', proveedor: 'Conservatex' },
          { nombre: 'Absorbedores de oxígeno', cantidad: '10', proveedor: 'Conservatex' },
          { nombre: 'Paraloid B-72', cantidad: '100ml', proveedor: 'Química Patrimonio' }
        ]
      }
    }
  })

  await prisma.informe.create({
    data: {
      titulo: 'Consolidación policromía escultura',
      diagnostico: 'Tras fumigación, se confirma cese de actividad biológica. Preparación disgregada en zona dorsal',
      tratamiento: 'Consolidación de la preparación y fijación de la policromía',
      procedimientos: 'Inyección de adhesivo, presión suave con espátula caliente, protección superficial',
      estado: 'FINALIZADO',
      fechaInicio: new Date('2024-09-10'),
      fechaFin: new Date('2024-10-30'),
      bienId: bien3.id,
      restauradorId: restaurador2.id,
      materiales: {
        create: [
          { nombre: 'Primal AC-33', cantidad: '200ml', proveedor: 'Química Patrimonio' },
          { nombre: 'Jeringuillas 5ml', cantidad: '20u', proveedor: 'Material Médico SA' },
          { nombre: 'Espátula térmica', cantidad: '1u', proveedor: 'Herramientas Restauro' }
        ]
      }
    }
  })

  await prisma.informe.create({
    data: {
      titulo: 'Reintegración cromática escultura',
      diagnostico: 'Lagunas en manto y rostro tras consolidación. Dorado original parcialmente conservado',
      tratamiento: 'Reintegración pictórica y recuperación del dorado en zonas perdidas',
      procedimientos: 'Reintegración con acuarelas, dorado con pan de oro al mixtión',
      estado: 'PENDIENTE',
      fechaInicio: new Date('2025-02-01'),
      bienId: bien3.id,
      restauradorId: restaurador1.id,
      materiales: {
        create: [
          { nombre: 'Pan de oro 22k', cantidad: '5 libritos', proveedor: 'Oro y Arte SL' },
          { nombre: 'Mixtión al agua', cantidad: '100ml', proveedor: 'Bellas Artes SA' },
          { nombre: 'Acuarelas Winsor & Newton', cantidad: '1 set', proveedor: 'Bellas Artes SA' }
        ]
      }
    }
  })

  // ── INFORMES DEL BIEN 4: Torre del Reloj (2 informes) ──

  await prisma.informe.create({
    data: {
      titulo: 'Diagnóstico estructural Torre del Reloj',
      diagnostico: 'Fisuras en juntas de mortero en cara norte, humedad por filtración en planta baja, mecanismo de reloj con piezas oxidadas',
      tratamiento: 'Rejuntado de fisuras, impermeabilización y limpieza del mecanismo',
      procedimientos: 'Extracción de mortero deteriorado, análisis de sales, limpieza mecánica del reloj',
      estado: 'FINALIZADO',
      fechaInicio: new Date('2023-11-01'),
      fechaFin: new Date('2023-12-15'),
      bienId: bien4.id,
      restauradorId: restaurador2.id,
      materiales: {
        create: [
          { nombre: 'Mortero de cal hidráulica', cantidad: '50kg', proveedor: 'Materiales Históricos SL' },
          { nombre: 'Consolidante de piedra', cantidad: '5L', proveedor: 'Química Patrimonio' },
          { nombre: 'Aceite de relojero', cantidad: '50ml', proveedor: 'Relojería Técnica' }
        ]
      }
    }
  })

  await prisma.informe.create({
    data: {
      titulo: 'Intervención fachada norte Torre',
      diagnostico: 'Concluido el diagnóstico, se procede a la intervención completa de la fachada norte con mayor deterioro',
      tratamiento: 'Limpieza de piedra, rejuntado y tratamiento hidrofugante final',
      procedimientos: 'Proyección de agua a baja presión, aplicación de biocida, rejuntado, hidrofugante',
      estado: 'EN_CURSO',
      fechaInicio: new Date('2025-03-01'),
      bienId: bien4.id,
      restauradorId: restaurador1.id,
      materiales: {
        create: [
          { nombre: 'Biocida Preventol', cantidad: '2L', proveedor: 'Química Patrimonio' },
          { nombre: 'Hidrofugante Siloxano', cantidad: '10L', proveedor: 'Química Patrimonio' },
          { nombre: 'Mortero de cal NHL 3.5', cantidad: '100kg', proveedor: 'Materiales Históricos SL' }
        ]
      }
    }
  })

  console.log('✅ Informes creados')
  console.log(`
📊 Datos de seed:
- 1 Admin: admin@patrimonio.com / admin123
- 2 Restauradores: juan@patrimonio.com / juan123 · maria@patrimonio.com / maria123
- 4 Bienes (2 muebles, 2 inmuebles)
- 10 Informes con materiales reales de restauración

Listo para desarrollar! ✨
  `)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())