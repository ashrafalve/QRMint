# QRMint Backend - SaaS Store Profiles & QR Platform

A scalable, production-ready NestJS backend for business/store owners to create digital profiles and generate dynamic QR codes.

## Tech Stack
- **Framework:** NestJS
- **ORM:** Prisma
- **Database:** SQLite (Initially), easily upgradeable to PostgreSQL
- **Auth:** JWT Authentication with Passport
- **Documentation:** Swagger (OpenAPI)
- **Validation:** Class-validator

## Features
- **User Authentication:** Register, Login, JWT Protected Routes.
- **Store Management:** Create, Update, Delete, and Get Stores.
- **Social Links:** Manage social media links for each store.
- **Dynamic QR System:** Generates QR codes for public store URLs.
- **File Upload:** Local storage for store logos.
- **Public API:** Fetch store details by slug.

## Project Structure
- `src/auth`: Authentication logic, JWT strategy, and guards.
- `src/users`: User management and Prisma interactions.
- `src/stores`: Core store profile management.
- `src/social-links`: Social media link management.
- `src/qr`: QR code generation service.
- `src/uploads`: Local file upload handling for logos.
- `src/common`: Shared decorators, filters, and utilities.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

> **Note for Prisma 7:** This project uses Prisma 7 which requires driver adapters for direct connections. For SQLite, `@prisma/adapter-better-sqlite3` and `better-sqlite3` are used and already configured in `src/prisma/prisma.service.ts`.

### 2. Configure Environment
Create a `.env` file in the `backend` folder (already created for you):
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

### 3. Database Migration
```bash
npx prisma migrate dev --name init
```

### 4. Run the Application
```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

### 5. Access Swagger Documentation
Once the server is running, visit:
`http://localhost:3001/api/docs`

## API Examples

### Authentication
- **POST** `/api/auth/register`: Create a new account.
- **POST** `/api/auth/login`: Login and receive a JWT token.

### Stores
- **POST** `/api/stores`: Create a store (Protected).
- **GET** `/api/stores/my-stores`: Get your stores (Protected).
- **GET** `/api/stores/:slug`: Get public store details (Public).
- **PATCH** `/api/stores/:id`: Update store (Protected).
- **DELETE** `/api/stores/:id`: Delete store (Protected).

### Social Links
- **POST** `/api/social-links/:storeId`: Add/Update social links (Protected).
- **GET** `/api/social-links/:storeId`: Get social links (Public).

### QR System
- **GET** `/api/qr/:slug`: Get QR code data URL for a store slug.

### Uploads
- **POST** `/api/uploads/logo/:storeId`: Upload logo for a store (Protected).

## Migrating to PostgreSQL
To upgrade to PostgreSQL:
1. Update `datasource provider` in `prisma/schema.prisma` from `sqlite` to `postgresql`.
2. Update `DATABASE_URL` in `.env` to your PostgreSQL connection string.
3. Run `npx prisma migrate dev` to create new migrations.

## License
MIT
