# RentEase 🛋️

![CI/CD](https://github.com/Jayeeeesh/RentEase/actions/workflows/ci.yml/badge.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)

A production-grade furniture & appliance rental platform built with the MERN stack — featuring JWT authentication, Docker containerization, CI/CD pipeline, and automated testing.

**Live Demo:** [rentease.vercel.app](https://rentease.vercel.app) | **API:** [rentease-backend-rmaa.onrender.com](https://rentease-backend-rmaa.onrender.com/api/docs)

---

## Architecture

```
RentEase/
├── client/                  # React frontend (Vite + Redux Toolkit + Tailwind CSS)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level pages
│   │   ├── store/           # Redux slices
│   │   ├── hooks/           # Custom hooks
│   │   └── utils/           # Axios interceptor, helpers
│   ├── Dockerfile           # Multi-stage nginx build
│   └── nginx.conf           # Production nginx config
│
├── server/                  # Express REST API
│   ├── src/
│   │   ├── modules/         # auth, products, orders, rentals, maintenance, users
│   │   ├── middleware/       # auth, validation, error handling
│   │   ├── models/          # Mongoose schemas
│   │   ├── config/          # env, swagger
│   │   └── utils/           # ApiError, ApiResponse, asyncHandler
│   ├── Dockerfile           # Multi-stage production build
│   └── __tests__/           # Jest + Supertest tests
│
├── docker-compose.yml       # Base config
├── docker-compose.dev.yml   # Dev environment
└── docker-compose.prod.yml  # Production environment
```

---

## Tech Stack

| Layer      | Technology                                                   |
| ---------- | ------------------------------------------------------------ |
| Frontend   | React 19, Vite, Redux Toolkit, Tailwind CSS v4, React Router |
| Backend    | Node.js, Express 5, MongoDB/Mongoose                         |
| Auth       | JWT (access + refresh tokens), HttpOnly cookies              |
| Validation | Joi                                                          |
| Testing    | Jest, Supertest, MongoDB Memory Server                       |
| DevOps     | Docker, docker-compose, GitHub Actions CI/CD                 |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas           |

---

## Features

| Feature                                         | Status |
| ----------------------------------------------- | ------ |
| Browse products (category, city, pagination)    | ✅     |
| Product detail + rental request                 | ✅     |
| User auth (register, login, logout)             | ✅     |
| JWT refresh token rotation                      | ✅     |
| My Rentals (list, cancel pending)               | ✅     |
| My Orders (list, cancel pending)                | ✅     |
| Profile (edit info, address, password)          | ✅     |
| Admin dashboard (products, orders, maintenance) | ✅     |
| Maintenance requests                            | ✅     |
| Swagger API docs                                | ✅     |

---

## Quick Start

### Option 1 — Docker (Recommended)

```bash
git clone https://github.com/Jayeeeesh/RentEase.git
cd RentEase
cp server/.env.example server/.env   # fill in your secrets
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/api/docs

### Option 2 — Manual Setup

**Backend:**

```bash
cd server
cp .env.example .env
npm install
npm run dev   # http://localhost:8000
```

**Frontend:**

```bash
cd client
cp .env.example .env
npm install
npm run dev   # http://localhost:5173
```

---

## Testing

```bash
cd server
npm test
```

- **Framework:** Jest + Supertest
- **Coverage:** 60%+
- **DB:** MongoDB Memory Server (no real DB needed)

---

## CI/CD Pipeline

Every push to `main` triggers:

1. **Test job** — install deps → run tests → upload coverage report
2. **Docker job** — build backend image → build frontend image (only if tests pass)

---

## Environment Variables

```env
PORT=8000
NODE_ENV=development
MONGO_URI=mongodb+srv://...
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
CLIENT_URL=http://localhost:5173
```

---

## API Reference

- Base URL: `http://localhost:8000/api/v1`
- Swagger docs: `http://localhost:8000/api/docs`

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| POST   | /auth/register | Register user  |
| POST   | /auth/login    | Login          |
| POST   | /auth/logout   | Logout         |
| GET    | /products      | List products  |
| GET    | /products/:id  | Product detail |
| POST   | /orders        | Create order   |
| GET    | /orders        | My orders      |
| GET    | /rentals       | My rentals     |
| POST   | /maintenance   | Create request |

---

## Health Check

```bash
curl http://localhost:8000/health
```

```json
{
  "success": true,
  "application": "RentEase API",
  "status": "UP",
  "environment": "development",
  "uptime": { "seconds": 42 },
  "timestamp": "2026-07-04T00:00:00.000Z"
}
```
