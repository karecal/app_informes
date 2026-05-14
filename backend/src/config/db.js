import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

// Manejo de desconexión
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
