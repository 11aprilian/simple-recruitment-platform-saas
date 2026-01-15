# Recruitment Platform SaaS

Backend REST API untuk sistem rekrutmen berbasis **multi-tenant** dengan **RBAC (Role-Based Access Control)**.

Dibangun menggunakan:

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- JWT Authentication

---

## Fitur Utama

- Authentication & Authorization (JWT)
- Role-Based Access Control (ADMIN & RECRUITER)
- Multi-Tenant (data antar company terisolasi)
- CRUD User (ADMIN only)
- CRUD Position
- Applicant Management (Public Apply & Internal Review)
- Pagination (User, Position, Applicant)

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize
- **Database**: PostgreSQL
- **Auth**: JSON Web Token (JWT)

---

## ⚙️ Setup Instructions

### Clone Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### Install Dependencies

```bash
npm install
```

### Setup Environment Variables

```bash
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=recruitment_db
DB_USER=postgres
DB_PASS=<your_password>
DB_DIALECT=postgres

JWT_SECRET=<your_magic_word>
```

### Setup Database

```bash
CREATE DATABASE recruitment_db;
```

Project ini tidak menggunakan migration.
Struktur tabel akan dibuat otomatis menggunakan Sequelize sync() saat aplikasi dijalankan pertama kali.

## ▶️ How to Run

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run start
```

Saat server pertama kali dijalankan, Sequelize akan otomatis melakukan:

```bash
sequelize.sync()
```

Server berjalan di:

```bash
http://localhost:3000
```

## 🔐 Authentication

Gunakan JWT Token pada header request:

```bash
Authorization: Bearer <token>
```

Token berisi:

- userId
- role
- companyId

## 📌 API Endpoints

### 🔑 Auth

| Method | Endpoint             | Keterangan               |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/auth/register` | Register admin & Company |
| POST   | `/api/auth/login`    | Login user               |

### 👥 User Management (ADMIN only)

| Method | Endpoint         | Keterangan              |
| ------ | ---------------- | ----------------------- |
| POST   | `/api/users`     | Create user             |
| GET    | `/api/users`     | List users (pagination) |
| GET    | `/api/users/:id` | Detail user             |
| PUT    | `/api/users/:id` | Update user             |
| DELETE | `/api/users/:id` | Delete user             |

### 📄 Position Management

| Method | Endpoint             | Keterangan                  |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/positions`     | Create position             |
| GET    | `/api/positions`     | List positions (pagination) |
| GET    | `/api/positions/:id` | Detail position             |
| PUT    | `/api/positions/:id` | Update position             |
| DELETE | `/api/positions/:id` | Delete position             |

### 🧑‍💼 Applicant Management

Public
| Method | Endpoint | Keterangan |
| ------ | ----------------- | --------------- |
| POST | `/api/applicants` | Apply ke posisi |

Private
| Method | Endpoint | Keterangan |
| ------ | ---------------------------- | ---------------------------- |
| GET | `/api/applicants` | List applicants (pagination) |
| GET | `/api/applicants/:id` | Detail applicant |
| PATCH | `/api/applicants/:id/status` | Update status |
| PATCH | `/api/applicants/:id/notes` | Update notes |
| DELETE | `/api/applicants/:id` | Delete applicant |

### 🔢 Pagination

Gunakan query parameter

```bash
?page=1&limit=10
```

Response

```bash
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "totalItems": 100,
    "totalPages": 10
  }
}
```
