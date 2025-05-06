# Auth System

A simple authentication system built with Node.js, Express, TypeScript, Prisma, and JWT.

## Features

- User registration and login
- JWT authentication
- Password hashing with bcrypt
- Prisma ORM with MongoDB
- Swagger API documentation
- Input validation using Zod

## Installation

```bash
npm i
```

## Environment Setup

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="your_mongodb_connection_string"
JWT_SECRET="your_secret_key"
```

## Scripts

| Command                  | Description                              |
|--------------------------|------------------------------------------|
| `npm run dev`            | Start dev server with file watching      |
| `npm run build`          | Compile TypeScript to JavaScript         |
| `npm start`              | Run the compiled app from `dist/` folder |
| `npm run prisma:generate`| Generate Prisma client                   |
| `npm run prisma:migrate` | Run development migration                |
| `npm run seed`           | Seed database with fake data (Faker)     |

## API Docs

After running the app, access the Swagger documentation at:

```
http://localhost:3000/api-docs
```

## Tech Stack

- Node.js
- Express
- TypeScript
- Prisma
- MongoDB
- JWT
- Zod
- Swagger
