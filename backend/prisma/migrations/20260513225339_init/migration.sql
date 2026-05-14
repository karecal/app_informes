-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'RESTAURADOR');

-- CreateEnum
CREATE TYPE "TipoBien" AS ENUM ('MUEBLE', 'INMUEBLE');

-- CreateEnum
CREATE TYPE "Estado" AS ENUM ('EN_CURSO', 'FINALIZADO', 'PENDIENTE');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'RESTAURADOR',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bienes" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "tipo" "TipoBien" NOT NULL,
    "ubicacion" VARCHAR(255) NOT NULL,
    "descripcion" TEXT,
    "imagen" TEXT,
    "fechaIngreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bienes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "informes" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "tratamiento" TEXT NOT NULL,
    "procedimientos" TEXT NOT NULL,
    "estado" "Estado" NOT NULL DEFAULT 'EN_CURSO',
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3),
    "notas" TEXT,
    "bienId" INTEGER NOT NULL,
    "restauradorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "informes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materiales_informe" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "cantidad" VARCHAR(100) NOT NULL,
    "proveedor" VARCHAR(255),
    "informeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "materiales_informe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "informes" ADD CONSTRAINT "informes_bienId_fkey" FOREIGN KEY ("bienId") REFERENCES "bienes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "informes" ADD CONSTRAINT "informes_restauradorId_fkey" FOREIGN KEY ("restauradorId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materiales_informe" ADD CONSTRAINT "materiales_informe_informeId_fkey" FOREIGN KEY ("informeId") REFERENCES "informes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
