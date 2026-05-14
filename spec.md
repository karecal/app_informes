# Especificación del Proyecto: Ars Patrimonio

## Resumen del proyecto

**Ars Patrimonio** es una aplicación web full-stack para gestionar informes de conservación-restauración de bienes patrimoniales. Restauradores y administradores pueden registrar tratamientos, procedimientos, materiales usados y estado de los bienes, accediendo a un historial completo e integrado.

Caso de uso real: gestión interna de bienes del patrimonio cultural en una isla, con posterior reutilización profesional.

---

## Contexto educativo

Este proyecto es el **midterm (proyecto 2) del bootcamp**, que integra:
- Frontend React adaptado del proyecto 1 (Ars Harvard)
- Backend Express + PostgreSQL + Prisma nuevo
- Auth JWT con roles (Restaurador | Admin)
- 8+ tests (Vitest + Jest)
- Deploy full-stack (Vercel + Railway)

---

## Funcionalidades

### Autenticación
- POST /auth/register — Registro de usuarios
- POST /auth/login — Login con JWT
- Roles: `restaurador` | `admin`

### Gestión de Bienes Patrimoniales
- GET /bienes — Listado paginado de bienes
- GET /bienes/:id — Detalle de un bien + informes asociados
- POST /bienes — Crear bien (solo admin)
- PUT /bienes/:id — Actualizar bien
- DELETE /bienes/:id — Eliminar bien (solo admin)

### Gestión de Informes
- GET /informes — Listado de informes (filtrado por rol)
- GET /informes/:id — Detalle del informe
- POST /informes — Crear informe (restaurador)
- PUT /informes/:id — Editar informe (propietario o admin)
- DELETE /informes/:id — Eliminar informe (admin)

### Gestión de Usuarios (Admin only)
- GET /usuarios — Listado de usuarios
- GET /usuarios/:id — Perfil del usuario
- PUT /usuarios/:id — Actualizar datos del usuario

### Búsqueda y Filtrado
- Búsqueda de bienes por nombre/descripción
- Filtro por tipo (MUEBLE | INMUEBLE)
- Filtro de informes por estado (EN_CURSO | FINALIZADO | PENDIENTE)
- Filtro por restaurador (admin)

### Experiencia de usuario
- Diseño responsive (reutilizado de Ars Harvard)
- Skeleton loaders
- Gestión centralizada de errores
- Rutas protegidas por auth
- Dashboard admin

---

## Stack técnico

### Frontend
- React 18 + Vite
- React Router DOM
- Context API (AuthContext + PatrimonioContext)
- CSS Modules + CSS global
- Vitest + React Testing Library

### Backend
- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT para auth
- Validaciones centralizadas
- Jest para tests

### Deploy
- Frontend → Vercel
- Backend → Railway (+ PostgreSQL)
- Variables de entorno

---

## Modelos de datos (Prisma Schema)

```
ars-harvard/
├── public/
│ ├── favicon.svg
│ └── icons.svg
├── src/
│ ├── assets/
│ ├── components/
│ │ ├── ArtworkCard/
│ │ ├── Footer/
│ │ ├── LoadingSpinner/
│ │ ├── Modal/
│ │ ├── Navbar/
│ │ ├── ScrollToTop/
│ │ └── SearchBar/
│ ├── context/
│ │ └── ArtContext.jsx
│ ├── hooks/
│ │ ├── useArtworks.js
│ │ ├── useClock.js
│ │ └── useDebounce.js
│ ├── pages/
│ │ ├── AboutPage/
│ │ ├── ArtworkDetailPage/
│ │ ├── ContactPage/
│ │ ├── FaqPage/
│ │ ├── HomePage/
│ │ ├── LoginPage/
│ │ ├── NewsletterPage/
│ │ ├── NotFoundPage/
│ │ └── TeamPage/
│ ├── tests/
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
```

---

## UI/UX planteados

La interfaz sigue una línea visual inspirada en museos y catálogos artísticos:

- Estética minimalista y elegante.
- Tipografía serif para reforzar el carácter cultural.
- Uso predominante de blanco, negro y grises.
- Navegación intuitiva.
- Diseño adaptativo para escritorio, tablet y móvil.
- Interacciones suaves y accesibles.

---

## Gestión del estado

La aplicación utiliza Context API para centralizar:

- Obras obtenidas desde la API.
- Filtros activos.
- Paginación.
- Estado de carga y errores.
- Favoritos del usuario.

---

## Integración con API

Se utiliza la API oficial de Harvard Art Museums:

- Endpoint principal: /object
- Autenticación mediante API Key.
- Variables de entorno gestionadas con Vite.

---

## Testing

Se han implementado pruebas unitarias con:

- Vitest
- React Testing Library

Cobertura actual:

- Componente ArtworkCard.
- Componente SearchBar.

---

## Rendimiento

- Optimización de búsquedas mediante debounce y Enter.
- Minimización de peticiones innecesarias.
- Memoización con useMemo.

---

## Deploy

La aplicación está desplegada en Vercel y conectada al repositorio de GitHub.

---

## Autoría

Proyecto desarrollado como práctica del módulo de React del bootcamp Full Stack Developer.
