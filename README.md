# Patrimonio Info

Aplicación web para la gestión de informes de conservación-restauración de bienes patrimoniales. Desarrollada como proyecto final del Bootcamp de Desarrollo Web Full-stack Ironhack-FULP.

## Stack tecnológico

**Frontend**

- React 18 + Vite
- React Router v7
- Context API (AuthContext + PatrimonioContext)
- CSS Modules
- Vitest + @testing-library/react (tests)

**Backend**

- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT para autenticación
- Roles: `ADMIN` y `RESTAURADOR`

## Estructura del proyecto

```
app_informes/
├── frontend/        # React + Vite
├── backend/         # Express + Prisma
└── README.md
```

## Instalación local

### Requisitos previos

- Node.js 18+
- PostgreSQL corriendo en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/karecal/app_informes
cd app_informes
```

### 2. Configurar el backend

```bash
cd backend
npm install
```

Copia `.env.example` a `.env` y rellena los valores:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_db"
PORT=3000
JWT_SECRET=tu_clave_secreta_aqui
JWT_EXPIRES_IN=7d
```

Ejecuta la migración y el seed:

```bash
npx prisma migrate dev --name init
npm run seed
```

Arranca el servidor:

```bash
npm run dev
```

El backend corre en `http://localhost:3000/api`

### 3. Configurar el frontend

```bash
cd frontend
npm install
```

Copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:3000/api
```

Arranca el frontend:

```bash
npm run dev
```

El frontend corre en `http://localhost:5173`

### 4. Ejecutar los tests

```bash
cd frontend
npm test
```

## Usuarios de prueba (seed)

| Rol         | Email                | Contraseña |
| ----------- | -------------------- | ---------- |
| Admin       | admin@patrimonio.com | admin123   |
| Restaurador | juan@patrimonio.com  | juan123    |
| Restaurador | maria@patrimonio.com | maria123   |

## Modelo de datos

- **Usuario** — autenticación y roles (`ADMIN` / `RESTAURADOR`)
- **Bien** — bien patrimonial con tipo, municipio, tipo de patrimonio, estilo, ubicación e imagen
- **Informe** — informe de conservación-restauración asociado a un bien y un restaurador
- **MaterialInforme** — materiales utilizados en cada intervención

## Endpoints principales

| Método | Endpoint              | Descripción                         | Auth           |
| ------ | --------------------- | ----------------------------------- | -------------- |
| POST   | `/api/auth/register`  | Registro de usuario                 | No             |
| POST   | `/api/auth/login`     | Login, devuelve JWT                 | No             |
| GET    | `/api/bienes`         | Listar bienes (con filtros y paginación) | No        |
| GET    | `/api/bienes/:id`     | Detalle de bien con sus informes    | No             |
| POST   | `/api/bienes`         | Crear bien patrimonial              | Solo admin     |
| PUT    | `/api/bienes/:id`     | Actualizar bien patrimonial         | Solo admin     |
| DELETE | `/api/bienes/:id`     | Eliminar bien patrimonial           | Solo admin     |
| GET    | `/api/informes`       | Listar informes                     | Sí             |
| POST   | `/api/informes`       | Crear informe                       | Sí             |
| PUT    | `/api/informes/:id`   | Actualizar informe                  | Propietario o admin |
| DELETE | `/api/informes/:id`   | Eliminar informe                    | Propietario o admin |
| GET    | `/api/usuarios`       | Listar usuarios                     | Solo admin     |

## Páginas

| Ruta                  | Descripción                              | Acceso          |
| --------------------- | ---------------------------------------- | --------------- |
| `/`                   | Listado de bienes patrimoniales          | Público         |
| `/bien/:id`           | Detalle del bien con sus informes        | Público         |
| `/bien/nuevo`         | Formulario para crear un bien            | Solo admin      |
| `/bien/:id/editar`    | Formulario para editar un bien           | Solo admin      |
| `/informe/nuevo`      | Formulario para crear un informe         | Autenticado     |
| `/informe/:id/editar` | Formulario para editar un informe        | Propietario o admin |
| `/login`              | Inicio de sesión                         | Público         |
| `/about`              | Sobre el proyecto                        | Público         |
| `/faq`                | Preguntas frecuentes                     | Público         |
| `/contact`            | Contacto                                 | Público         |

## Funcionalidades principales

- Listado de bienes con filtros por nombre, municipio, tipo de bien, tipo de patrimonio, estilo y fecha
- Paginación (30 bienes por página)
- Detalle de bien con imagen, descripción y listado de informes de conservación
- CRUD completo de bienes (admin) e informes (restaurador sobre los propios, admin sobre todos)
- Autenticación JWT con rutas protegidas por rol
- Dropdown personalizado con estilos propios (sin select nativo)
- Tests con Vitest y Testing Library (15 tests)

## Estado del proyecto

- [x] Backend completo (Express + PostgreSQL + Prisma)
- [x] Autenticación JWT con roles
- [x] CRUD de bienes e informes
- [x] Frontend conectado a la API
- [x] Listado y detalle de bienes
- [x] Formularios de creación y edición
- [x] Login y registro en el frontend
- [x] Rutas protegidas por rol
- [x] Filtros y paginación
- [x] Tests (15 tests pasando)
- [ ] Deploy en producción

## Autora

**Denise Echegaray** — [@karecal](https://github.com/karecal)
