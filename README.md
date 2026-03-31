# Boda José & Daiana 💍

Sistema de invitaciones personalizadas para la boda de **José y Daiana** — 14 de Noviembre, Puebla.

Cada invitado recibe un enlace único `/i/:token` con su invitación personalizada y puede confirmar asistencia desde ahí.

---

## Estructura del proyecto

```
boda-JoseyDaiana/
├── frontend/   → Next.js app (invitación + RSVP)
└── backend/    → Express API + Supabase
```

## Frontend

Aplicación Next.js con App Router, TypeScript y Tailwind.

- **Framework:** Next.js 16 (App Router)
- **Estilos:** Tailwind CSS v4
- **Fuentes:** Cormorant Garamond + Lato
- **Deploy:** Vercel

Ver [`frontend/`](./frontend) para más detalle.

## Backend

API REST con Express que conecta con Supabase.

- **Runtime:** Node.js + Express 5
- **Base de datos:** Supabase (PostgreSQL)
- **Validación:** Zod
- **Deploy:** Railway

Ver [`backend/`](./backend) para más detalle.

---

## Desarrollo local

```bash
# Backend (Terminal 1)
cd backend
cp .env.example .env   # llenar con credenciales de Supabase
npm run dev            # → http://localhost:4000

# Frontend (Terminal 2)
cd frontend
cp .env.example .env.local
npm run dev            # → http://localhost:3000
```

## Variables de entorno

### Backend (`backend/.env`)
```
PORT=4000
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
ALLOWED_ORIGIN=http://localhost:3000
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```
