# Boda José & Daiana

Sistema de invitaciones digitales personalizadas para la boda de **José y Daiana** — 14 de Noviembre, Puebla.

Cada invitado recibe un enlace único `/i/:token` con su invitación personalizada y puede confirmar asistencia (RSVP) directamente desde ahí.

---

## Arquitectura general

```
Invitado
   │
   │  https://boda.vercel.app/i/:token
   ▼
┌─────────────────────┐        ┌──────────────────────┐
│   Frontend (Vercel) │ ──────▶│  Backend (Railway)   │
│   Next.js App       │  REST  │  Express API         │
└─────────────────────┘        └──────────┬───────────┘
                                           │  Supabase SDK
                                           ▼
                               ┌──────────────────────┐
                               │  Supabase (PostgreSQL)│
                               │  Tabla: Invitados-Boda│
                               └──────────────────────┘
```

El frontend consume la API del backend para dos operaciones: obtener los datos del invitado por token y enviar el RSVP. Toda la lógica de negocio y el acceso a base de datos vive en el backend.

---

## Por qué Vercel para el frontend

**Vercel** es la plataforma oficial de Next.js, creada por el mismo equipo. Se eligió por:

- **Deploy automático desde GitHub** — cada push a `main` despliega sin configuración adicional.
- **Edge Network global** — sirve el sitio desde nodos cercanos al usuario, minimizando la latencia.
- **Optimización nativa de Next.js** — maneja automáticamente SSR, SSG, caché de assets estáticos y optimización de imágenes (`next/image`).
- **Plan gratuito** suficiente para el volumen de tráfico de una boda.
- **Variables de entorno** gestionadas desde el dashboard, sin exponer credenciales en el código.

---

## Por qué Railway para el backend

**Railway** es una plataforma PaaS (Platform as a Service) que ejecuta contenedores Node.js. Se eligió por:

- **Deploy desde GitHub sin Dockerfile** — Railway detecta el proyecto Node.js y lo construye con Nixpacks automáticamente.
- **Variables de entorno seguras** — `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` y `ALLOWED_ORIGIN` se configuran en el dashboard, nunca en el código.
- **Puerto dinámico** — Railway asigna `PORT` automáticamente; el servidor lo lee con `process.env.PORT`.
- **Restart automático** — configurado en `railway.toml` con `restartPolicyType = "ON_FAILURE"` para recuperarse de errores.
- **Dominio HTTPS incluido** — Railway provee un subdominio `.up.railway.app` con SSL sin configuración adicional.

---

## Base de datos — Supabase

Supabase provee una base de datos **PostgreSQL** administrada en la nube. Se accede desde el backend usando el cliente oficial `@supabase/supabase-js` con la `SERVICE_ROLE_KEY` (acceso total, solo desde el servidor, nunca expuesto al cliente).

### Tabla: `Invitados-Boda`

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `integer` | Clave primaria autoincremental |
| `token` | `text` (único) | UUID único por familia — forma la URL `/i/:token` |
| `nombreFamilia` | `text` | Nombre que aparece en la invitación |
| `pasesAsignados` | `integer` | Número máximo de asistentes que puede confirmar esa familia |
| `pasesConfirmados` | `integer` | Número de asistentes confirmados (0 si declinó) |
| `statusRSVP` | `text` | Estado: `pendiente` / `confirmado` / `declinado` |
| `mensajeParanovios` | `text` | Mensaje opcional que deja el invitado al confirmar |
| `respondedAt` | `timestamptz` | Fecha/hora de la última respuesta |
| `created_at` | `timestamptz` | Fecha de creación del registro |

### Flujo de datos

1. Se crea un registro por familia en Supabase con token único y pases asignados.
2. El invitado abre `/i/:token` → el frontend llama `GET /guest/:token` → el backend devuelve los datos del invitado.
3. El invitado confirma o declina → el frontend llama `POST /rsvp` → el backend valida y actualiza el registro (la última respuesta siempre sobreescribe la anterior).

### Reglas de negocio del RSVP

- `pasesConfirmados` debe ser entre 1 y `pasesAsignados` al confirmar.
- Al declinar, `pasesConfirmados` se guarda como 0.
- El RSVP puede modificarse: la última respuesta gana.

---

## Estructura del código

```
boda-JoseyDaiana/
│
├── frontend/                          → Next.js App Router
│   ├── app/
│   │   ├── layout.tsx                 → Layout raíz (fuentes, metadata global)
│   │   ├── page.tsx                   → Página de inicio (redirección)
│   │   ├── not-found.tsx              → Página 404 personalizada
│   │   └── i/[token]/
│   │       ├── page.tsx               → Página principal de la invitación
│   │       └── loading.tsx            → Skeleton de carga
│   │
│   ├── components/
│   │   ├── invitation/
│   │   │   ├── layouts/
│   │   │   │   ├── MobileInvitation.tsx   → Layout completo móvil (con intro video)
│   │   │   │   └── DesktopInvitation.tsx  → Layout completo desktop
│   │   │   └── sections/
│   │   │       ├── IntroVideo.tsx         → Video de apertura (móvil)
│   │   │       ├── HeroSection.tsx        → Nombre de la familia + pases
│   │   │       ├── NosotrosSection.tsx    → Historia de la pareja
│   │   │       ├── DetallesEventoSection.tsx → Fecha, hora y lugar
│   │   │       ├── ItinerarioSection.tsx  → Cronograma del día
│   │   │       ├── CodigoVestimentaSection.tsx → Dress code
│   │   │       ├── MesaRegalosSection.tsx → Mesa de regalos
│   │   │       ├── HospedajeSection.tsx   → Hoteles sugeridos
│   │   │       ├── MaquillajeSugerenciaSection.tsx → Sugerencia de maquillaje
│   │   │       ├── GaleriaSection.tsx     → Galería con card stack + modal (móvil)
│   │   │       ├── CountdownSection.tsx   → Cuenta regresiva
│   │   │       ├── RSVPSection.tsx        → Formulario de confirmación (móvil)
│   │   │       └── desktop/               → Versiones desktop de cada sección
│   │   │           ├── HeroSectionDesktop.tsx
│   │   │           ├── NosotrosSectionDesktop.tsx
│   │   │           ├── DetallesEventoSectionDesktop.tsx
│   │   │           ├── ItinerarioSectionDesktop.tsx
│   │   │           ├── CodigoVestimentaSectionDesktop.tsx
│   │   │           ├── MesaRegalosSectionDesktop.tsx
│   │   │           ├── HospedajeSectionDesktop.tsx
│   │   │           ├── MaquillajeSugerenciaSectionDesktop.tsx
│   │   │           ├── GaleriaSectionDesktop.tsx
│   │   │           ├── CountdownSectionDesktop.tsx
│   │   │           └── RSVPSectionDesktop.tsx
│   │   └── ui/
│   │       ├── MusicPlayer.tsx        → Reproductor de música flotante
│   │       ├── TopNavBar.tsx          → Navbar hamburguesa (móvil)
│   │       ├── DesktopNavBar.tsx      → Navbar lateral (desktop)
│   │       └── SectionSeparator.tsx   → Separador decorativo entre secciones
│   │
│   ├── hooks/
│   │   └── useInView.ts               → Hook para animaciones on-scroll
│   ├── lib/
│   │   ├── api.ts                     → Cliente HTTP hacia el backend
│   │   └── utils.ts                   → Utilidades generales
│   ├── services/
│   │   └── guestService.ts            → Lógica de llamadas al backend
│   ├── types/
│   │   └── index.ts                   → Tipos TypeScript compartidos (Guest, etc.)
│   └── public/assets/
│       ├── music/                     → Canción de fondo
│       ├── video/                     → Video de intro (envelopeVideo.mp4)
│       ├── fotografiasGaleria/        → Fotos del save the date
│       ├── photos/                    → Fotos adicionales
│       ├── componentes/               → Assets decorativos (flores, separadores)
│       └── textures/                  → Textura de fondo
│
├── backend/                           → Express API (Node.js + TypeScript)
│   ├── src/
│   │   ├── index.ts                   → Entry point, Express app, CORS, rutas
│   │   ├── config/
│   │   │   └── supabase.ts            → Cliente Supabase (service role)
│   │   ├── routes/
│   │   │   ├── guest.routes.ts        → GET /guest/:token
│   │   │   └── rsvp.routes.ts         → POST /rsvp
│   │   ├── controllers/
│   │   │   ├── guest.controller.ts    → Maneja request/response de invitados
│   │   │   └── rsvp.controller.ts     → Maneja request/response de RSVP
│   │   ├── services/
│   │   │   ├── guest.service.ts       → Consulta invitado por token en Supabase
│   │   │   └── rsvp.service.ts        → Valida y actualiza RSVP en Supabase
│   │   ├── middleware/
│   │   │   └── errorHandler.ts        → Manejo centralizado de errores
│   │   └── types/
│   │       └── index.ts               → Tipos TypeScript del dominio
│   ├── railway.toml                   → Configuración de deploy en Railway
│   └── package.json
│
├── vercel.json                        → Configuración de deploy en Vercel
└── README.md
```

---

## API Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/health` | Health check del servidor |
| `GET` | `/guest/:token` | Devuelve los datos del invitado por token |
| `POST` | `/rsvp` | Envía o actualiza la confirmación de asistencia |

### `POST /rsvp` — body esperado

```json
{
  "token": "uuid-del-invitado",
  "status": "confirmado",
  "pasesConfirmados": 2,
  "mensajeParanovios": "Mensaje opcional"
}
```

---

## Desarrollo local

```bash
# Backend (Terminal 1)
cd backend
cp .env.example .env       # llenar con credenciales reales
npm install
npm run dev                # → http://localhost:4000

# Frontend (Terminal 2)
cd frontend
cp .env.example .env.local
npm install
npm run dev                # → http://localhost:3000
```

## Variables de entorno

### Backend (`backend/.env`)
```
PORT=4000
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ALLOWED_ORIGIN=http://localhost:3000
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend framework | Next.js (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| Backend | Node.js + Express |
| Base de datos | Supabase (PostgreSQL) |
| Hosting frontend | Vercel |
| Hosting backend | Railway |
