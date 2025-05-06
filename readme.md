# Movie Review System Backend

A not simple authentication system built with Node.js, Express, TypeScript, Prisma, and JWT.
![SHOWCASE](https://github.com/user-attachments/assets/8c8d0a23-9eee-4ac6-8215-7657f1759225)


## Features

- User registration and login
- JWT authentication
- Password hashing with bcrypt
- Prisma ORM with MongoDB
- Swagger API documentation
- Input validation using Zod

## Installation

### 1. **Using npm**

```bash
npm i
```

### 2. **Environment Setup**

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL="your_mongodb_connection_string"
JWT_SECRET="your_secret_key"
```

### 3. **Available Scripts**

| Command                  | Description                              |
|--------------------------|------------------------------------------|
| `npm run dev`            | Start dev server with file watching      |
| `npm run build`          | Compile TypeScript to JavaScript         |
| `npm start`              | Run the compiled app from `dist/` folder |
| `npm run prisma:generate`| Generate Prisma client                   |
| `npm run prisma:push`    | Run development migration                |
| `npm run seed`           | Seed database with fake data (Faker)     |

### 4. **Run the Project**

- To start the project in development mode:

  ```bash
  npm run dev
  ```

- To build and start the project:

  ```bash
  npm run build
  npm start
  ```

---

## Docker Setup

### 1. **Using Docker Compose**

- If you prefer to run the project with Docker, follow the steps below:

  1. Clone the repository:

     ```bash
     git clone -b NEW-schema_update https://github.com/inwchamp1337/mongodbprismajwtzodtypescript.git
     cd mongodbprismajwtzodtypescript
     ```

  2. Copy the `.env.example` file to `.env`:

     ```bash
     cp .env.example .env
     ```

  3. Update the `.env` file with your MongoDB connection string and JWT secret.

  4. Run Docker Compose to build and start the containers:

     ```bash
     docker-compose up --build
     ```

- This will run the project, and the app will be accessible at:

  ```
  http://localhost:3001
  ```

---

## API Docs

After running the app, access the Swagger documentation at:

```
http://localhost:3001/api-docs
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
