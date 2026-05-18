# Patrimonio Info

Aplicación web para la gestión de informes de conservación-restauración de bienes patrimoniales. Desarrollada como proyecto final del Bootcamp de Desarrollo Web Full-stack Ironhack-FULP.

## Demo en producción

- **Frontend:** https://app-informes-kappa.vercel.app
- **Backend API:** https://appinformes-production.up.railway.app/api

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

**Deploy**

- Frontend: Vercel
- Backend + base de datos: Railway

## Estructura del proyecto

```
app_informes/
├── README.md
├── backend/
│   ├── index.js                  # Entrada del servidor
│   ├── .env.example
│   ├── prisma/
│   │   ├── schema.prisma         # Modelos de datos
│   │   └── seed.js               # Datos de ejemplo
│   └── src/
│       ├── app.js                # Configuración Express
│       ├── config/
│       │   ├── db.js             # Cliente Prisma
│       │   └── email.js          # Configuración nodemailer
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── bienes.controller.js
│       │   ├── informes.controller.js
│       │   └── usuarios.controller.js
│       ├── middleware/
│       │   ├── auth.middleware.js    # Verificación JWT y roles
│       │   └── error.middleware.js
│       └── routes/
│           ├── auth.routes.js
│           ├── bienes.routes.js
│           ├── informes.routes.js
│           └── usuarios.routes.js
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── .env.example
    └── src/
        ├── main.jsx
        ├── App.jsx               # Rutas y providers
        ├── index.css             # Estilos globales
        ├── context/
        │   ├── AuthContext.jsx   # Sesión y usuario actual
        │   └── PatrimonioContext.jsx  # Bienes, filtros y paginación
        ├── hooks/
        │   ├── useAuth.js
        │   ├── usePatrimonio.js
        │   └── useDebounce.js
        ├── components/
        │   ├── Navbar/
        │   ├── Footer/           # Incluye paginación y mapa
        │   ├── BienCard/         # Tarjeta de bien en el listado
        │   ├── BienSearchBar/    # Filtros del listado
        │   ├── CustomSelect/     # Dropdown personalizado
        │   ├── Pagination/
        │   ├── LoadingSpinner/
        │   ├── ScrollToTop/
        │   └── ProtectedRoute.jsx
        ├── pages/
        │   ├── HomePage/         # Listado con filtros
        │   ├── BienDetailPage/   # Ficha del bien con informes
        │   ├── BienFormPage/     # Crear bien (admin)
        │   ├── BienEditPage/     # Editar bien (admin)
        │   ├── InformeFormPage/  # Crear informe
        │   ├── InformeEditPage/  # Editar informe
        │   ├── LoginPage/
        │   ├── AboutPage/
        │   ├── FaqPage/
        │   ├── ContactPage/
        │   └── NotFoundPage/
        └── tests/
            ├── setup.js
            ├── BienCard.test.jsx
            ├── CustomSelect.test.jsx
            └── Pagination.test.jsx
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

| Método | Endpoint             | Descripción                              | Auth                |
| ------ | -------------------- | ---------------------------------------- | ------------------- |
| POST   | `/api/auth/register` | Registro de usuario                      | No                  |
| POST   | `/api/auth/login`    | Login, devuelve JWT                      | No                  |
| GET    | `/api/bienes`        | Listar bienes (con filtros y paginación) | No                  |
| GET    | `/api/bienes/:id`    | Detalle de bien con sus informes         | No                  |
| POST   | `/api/bienes`        | Crear bien patrimonial                   | Solo admin          |
| PUT    | `/api/bienes/:id`    | Actualizar bien patrimonial              | Solo admin          |
| DELETE | `/api/bienes/:id`    | Eliminar bien patrimonial                | Solo admin          |
| GET    | `/api/informes`      | Listar informes                          | Sí                  |
| POST   | `/api/informes`      | Crear informe                            | Sí                  |
| PUT    | `/api/informes/:id`  | Actualizar informe                       | Propietario o admin |
| DELETE | `/api/informes/:id`  | Eliminar informe                         | Propietario o admin |
| GET    | `/api/usuarios`      | Listar usuarios                          | Solo admin          |

## Páginas

| Ruta                  | Descripción                       | Acceso              |
| --------------------- | --------------------------------- | ------------------- |
| `/`                   | Listado de bienes patrimoniales   | Público             |
| `/bien/:id`           | Detalle del bien con sus informes | Público             |
| `/bien/nuevo`         | Formulario para crear un bien     | Solo admin          |
| `/bien/:id/editar`    | Formulario para editar un bien    | Solo admin          |
| `/informe/nuevo`      | Formulario para crear un informe  | Autenticado         |
| `/informe/:id/editar` | Formulario para editar un informe | Propietario o admin |
| `/login`              | Inicio de sesión                  | Público             |
| `/about`              | Sobre el proyecto                 | Público             |
| `/faq`                | Preguntas frecuentes              | Público             |
| `/contact`            | Contacto                          | Público             |

## Funcionalidades principales

- Listado de bienes con filtros por nombre, municipio, tipo de bien, tipo de patrimonio, estilo y fecha
- Paginación (30 bienes por página)
- Detalle de bien con imagen, descripción y listado de informes de conservación
- CRUD completo de bienes (admin) e informes (restaurador sobre los propios, admin sobre todos)
- Autenticación JWT con rutas protegidas por rol
- Dropdown personalizado con estilos propios (sin select nativo)
- Tests con Vitest y Testing Library (15 tests)

## Uso de inteligencia artificial

Durante el desarrollo se utilizó **Claude** (Anthropic) como asistente de IA. Su uso se centró en:

- Resolución de bugs puntuales (permisos por rol, navegación con el historial del navegador, overflow en grids CSS)
- Implementación de componentes específicos (CustomSelect, paginación en footer)
- Correcciones de estilos y migración de tema oscuro a claro
- Configuración del entorno de tests (Vitest + Testing Library) y escritura de los casos de prueba
- Revisión y actualización de documentación (README)

En todos los casos la dirección, las decisiones de diseño y la revisión del resultado corrieron a cargo de la desarrolladora.

## Tiempos de desarrollo

Estimación basada en una dedicación de 6 horas diarias durante 5 días (30 horas totales).

| Bloque de trabajo                                              | Estimado | Real     |
| -------------------------------------------------------------- | -------- | -------- |
| Día 1 — Setup del proyecto, modelos Prisma y seed inicial      | 8 h      | 6 h      |
| Día 2 — Backend: auth JWT, endpoints CRUD bienes e informes    | 7 h      | 6 h      |
| Día 3 — Frontend: estructura, rutas, contextos y listado home  | 8 h      | 6 h      |
| Día 4 — Frontend: detalle de bien, formularios crear/editar    | 8 h      | 6 h      |
| Día 5 — Estilos y tema, componente CustomSelect, tests, deploy | 6 h      | 6 h      |
| **Total**                                                      | **37 h** | **30 h** |

**Desviaciones destacadas:**

- Los días 1 al 4 resultaron más ágiles de lo previsto gracias a la familiaridad con el stack, a la reutilización del proyecto anterior y a las decisiones de diseño tomadas desde el inicio.
- El día 5 se ajustó exactamente al tiempo estimado al acotar el alcance de los estilos y los tests.

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
- [x] Deploy en producción (Vercel + Railway)

## Autora

**Denise Echegaray** — [@karecal](https://github.com/karecal)
