# TOI Backend API

Production-ready NestJS starter kit with Prisma, JWT authentication, and Zod validation for blockchain cryptocurrency platform.

## 🚀 Features

- ✅ **NestJS** with TypeScript - Modular and scalable architecture.
- ✅ **Prisma ORM** - Type-safe database access with PostgreSQL.
- ✅ **JWT Authentication** - Secure Access & Refresh token rotation.
- ✅ **Role-Based Access Control (RBAC)** - Admin & Customer roles.
- ✅ **Zod Validation** - Schema validation for request DTOs.
- ✅ **Swagger API Documentation** - Auto-generated API docs.
- ✅ **Rate Limiting** - Protection against brute-force attacks using `throttler`.
- ✅ **External Integrations** - AWS S3, SendGrid/Mailtrap, Twilio support.

---

## 🛠 Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v22 or higher) (https://nodejs.org/en/download/)
- **npm** (comes with Node.js) (https://www.npmjs.com/get-npm)
- **PostgreSQL** (v17.* or higher) (https://www.postgresql.org/download/)
- **PGAdmin4** (v6 or higher) (https://www.pgadmin.org/download/)
- **Redis** (Required for caching & queues) (https://redis.io/download)


### 🐳 Redis Setup (Docker)

If you don't have Redis installed locally, you can run it using Docker:
1. Install Docker
2. Run the following command
```bash
docker compose up -d

```
Check running containers:
```bash
docker ps

```
Access pgAdmin Open browser:
http://localhost:5050

## Login

1. Email: admin@admin.com

2. Password: admin123

## Connect PostgreSQL in pgAdmin

1. Click Add New Server

2. General

- **Name:** Postgres Docker

3. Connection

- **Host name/address:** postgres

- **Port:** 5432

- **Username:** admin

- **Password:** admin123

- **Database:** app_db

4. Save ✔

5. ⚠️ Use postgres as hostname (Docker service name), not localhost.
---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   

3. **Configure Environment Variables**
   Copy the example environment file and update the values.
   ```bash
   cp .env.example .env
   ```

   **add DB URL in .env file**
   ```bash
   DATABASE_URL="postgresql://admin:admin123@localhost:5432/codeShaper_toi?schema=public"
   ```
   
   > **Note:** Update `DATABASE_URL`, `JWT_SECRET`, and `REDIS_URL` (if applicable) in `.env` to match your local setup.

4. **Database Setup**
   Run the following commands to initialize the database:
   ```bash

   # Run migrations
   npx prisma migrate deploy

   # Generate Prisma client
   npx prisma generate

   # Seed the database
   npm run seed
   ```

---

## 🏃 Running the App
### Project Build
```bash
npm run build

```

### Run Project in Development Mode
```bash
npm run start:dev
```
The server will start on `http://localhost:3000` (default port).

### Run Project in Debug Mode
```bash
npm run start:debug
```

### Production Build
```bash
npm run build
npm run start:prod
```

---

## 📩 Messaging Services

The application provides a unified messaging system for sending Emails and SMS. These services are provider-agnostic, allowing you to switch between different providers (e.g., Twilio for SMS, SendGrid/SMTP for Email) via configuration.

### 📧 Email Service (`MailService`)

Used for sending HTML or transactional emails.

**General Usage:**
```typescript
import { MailService } from './core/mail/mail.service';

constructor(private readonly mailService: MailService) {}

// Send a simple HTML email
await this.mailService.send({
  to: 'user@example.com',
  subject: 'Welcome!',
  html: '<h1>Welcome to TOI Platform</h1>',
});
```

**OTP Example:**
```typescript
// Send OTP using the common template
await this.mailService.sendOtpEmail(
  'user@example.com', 
  '123456', 
  'Verify your account', 
  'Your verification code is', 
  10 // expiry in minutes
);
```

### 📱 SMS Service (`SmsService`)

Used for sending text messages (SMS).

**General Usage:**
```typescript
import { SmsService } from './core/sms/sms.service';

constructor(private readonly smsService: SmsService) {}

// Send a simple text message
await this.smsService.send({
  to: '+1234567890',
  message: 'Hello from TOI Platform!',
});
```

**OTP Example:**
```typescript
// Send OTP message
await this.smsService.sendOtpSms(
  '+1234567890', 
  '123456', 
  'Your OTP code is', 
  10 // expiry in minutes
);
```

---

## 📚 API Documentation

The API comes with built-in Swagger documentation.

- **URL:** `http://localhost:3000/swagger`
- **JSON Spec:** `http://localhost:3000/swagger-json`

### Default Credentials (Seed Data)
| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@toi.com` | `password123` |
| **Member** | `member@toilabs.com` | `password123` |

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## 📂 Project Structure

```
src/
├── common/          # Shared utilities, decorators, guards, filters
├── config/          # Environment and application configuration
├── core/            # Core modules (Auth, Logger, Prisma, etc.)
├── modules/         # Feature modules (User, Admin, Transaction, etc.)
├── main.ts          # Application entry point
└── app.module.ts    # Root application module
```

## � Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.