# Patrimonio Info

Aplicación web para la gestión de informes de conservación-restauración de bienes patrimoniales. Desarrollada como proyecto de uso para la gestión del patrimonio cultural con motivo del Bootcamp de Desarrollo Web Full-stack Ironhack-FULP.

## 🚀 Stack tecnológico

**Frontend**

- React 18 + Vite
- React Router v6
- Context API (AuthContext + PatrimonioContext)
- CSS Modules

**Backend**

- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT para autenticación
- Roles: `ADMIN` y `RESTAURADOR`

## 📁 Estructura del proyecto

```
app_informes/
├── frontend/        # React + Vite
├── backend/         # Express + Prisma
├── README.md
└── spec.md
```

## ⚙️ Instalación local

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

Crea un archivo `.env` en `/backend`:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/ars_patrimonio_db"
JWT_SECRET="tu_clave_secreta"
PORT=3000
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

Crea un archivo `.env` en `/frontend`:

```env
VITE_API_URL=http://localhost:3000/api
```

Arranca el frontend:

```bash
npm run dev
```

El frontend corre en `http://localhost:5173`

## 👤 Usuarios de prueba

| Rol         | Email                | Contraseña |
| ----------- | -------------------- | ---------- |
| Admin       | admin@patrimonio.com | admin123   |
| Restaurador | juan@patrimonio.com  | juan123    |
| Restaurador | maria@patrimonio.com | maria123   |

## 🗄️ Modelo de datos

- **Usuario** — autenticación y roles (ADMIN / RESTAURADOR)
- **Bien** — bien patrimonial mueble o inmueble
- **Informe** — informe de conservación-restauración asociado a un bien y un restaurador
- **MaterialInforme** — materiales utilizados en cada intervención

## 📡 Endpoints principales

| Método | Endpoint             | Descripción                  | Auth       |
| ------ | -------------------- | ---------------------------- | ---------- |
| POST   | `/api/auth/register` | Registro de usuario          | No         |
| POST   | `/api/auth/login`    | Login, devuelve JWT          | No         |
| GET    | `/api/bienes`        | Listar bienes                | Sí         |
| GET    | `/api/bienes/:id`    | Detalle de bien con informes | Sí         |
| POST   | `/api/informes`      | Crear informe                | Sí         |
| PUT    | `/api/informes/:id`  | Actualizar informe           | Sí         |
| DELETE | `/api/informes/:id`  | Eliminar informe             | Sí         |
| GET    | `/api/usuarios`      | Listar usuarios              | Solo admin |

## 📄 Páginas

| Ruta             | Descripción                       |
| ---------------- | --------------------------------- |
| `/`              | Listado de bienes patrimoniales   |
| `/bien/:id`      | Detalle del bien con sus informes |
| `/informe/nuevo` | Formulario para crear un informe  |
| `/login`         | Inicio de sesión                  |
| `/about`         | Sobre el proyecto                 |
| `/contact`       | Contacto                          |

## 🌐 Deploy

> Próximamente — Backend en Railway, Frontend en Vercel

## 📌 Estado del proyecto

- [x] Backend completo (Express + PostgreSQL + Prisma)
- [x] Autenticación JWT con roles
- [x] CRUD de bienes e informes
- [x] Frontend conectado a la API propia
- [x] Listado y detalle de bienes
- [x] Formulario de nuevo informe
- [ ] Login en el frontend
- [ ] Rutas protegidas
- [ ] Tests (8 mínimo)
- [ ] Deploy en producción

## 👩‍💻 Autora

**Denise Echegaray** — [@karecal](https://github.com/karecal)
