# Todo-App-Valkey

A high-performance RESTful API for task management built with Bun, Elysia, and Valkey. This application provides user authentication and CRUD operations for tasks with a focus on speed and efficiency.

## [Test It Here!](https://app.52.91.53.197.nip.io/)

## Tech Stack

- **Runtime**: Bun 1.3.5+ [1](#0-0) 
- **Web Framework**: Elysia 1.4.19 [2](#0-1) 
- **Authentication**: @elysiajs/jwt 1.4.0 [3](#0-2) 
- **Database**: Valkey (Redis-compatible) [4](#0-3) 
- **Database Client**: ioredis 5.8.2 [5](#0-4) 
- **Language**: TypeScript 5.9.3 [6](#0-5) 

## Project Structure

```
todo-cache/
├── packages/
│   └── backend/
│       └── src/
│           ├── database/
│           │   └── connection.ts
│           ├── routes/
│           │   ├── auth.ts
│           │   └── tasks.ts
│           ├── types/
│           │   ├── task.ts
│           │   └── user.ts
│           └── index.ts
├── obsidian-notes/
├── bun.lock
├── package.json
├── tsconfig.json
└── README.md
``` [7](#0-6) 

## Getting Started

### Prerequisites

- Bun runtime installed
- Valkey/Redis server running

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```

### Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL=your-db-url
JWT_SECRET=your-secret-key
PORT=your-port
NODE_ENV=development
``` [8](#0-7) [9](#0-8) 

### Running the Application

```bash
bun run packages/backend/src/index.ts
```

The server will start on the port specified in the `PORT` environment variable.

## API Endpoints

### Authentication

- `POST /sign-up` - Register a new user
- `POST /sign-in` - Authenticate user and receive JWT
- `GET /profile` - Get current user profile

### Tasks

- `GET /tasks` - Get all tasks for authenticated user
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update an existing task
- `DELETE /tasks/:id` - Delete a task

## Architecture Overview

The application follows a three-tier architecture:

1. **HTTP Layer**: Elysia web server handling HTTP requests
2. **Application Layer**: Route handlers and business logic
3. **Data Layer**: Valkey key-value storage

### Key Components

- **Entry Point**: `packages/backend/src/index.ts` - Server initialization and route registration [10](#0-9) 
- **Authentication**: `packages/backend/src/routes/auth.ts` - User registration and login
- **Task Management**: `packages/backend/src/routes/tasks.ts` - CRUD operations for tasks
- **Database Connection**: `packages/backend/src/database/connection.ts` - Valkey client singleton

### Data Models

#### Task
```typescript
interface Task {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  createdAt: number;
  userId: string;
}
``` [11](#0-10) 

## Security Features

- JWT-based authentication with HTTP-only cookies
- Password hashing using Bun's native password API
- Task ownership verification for CRUD operations
- Secure cookie configuration for production environments

## Development

The project uses TypeScript for type safety and includes development dependencies for Bun type definitions.

## Notes

This README provides an overview of the Todo-App-Valkey backend API. The application is designed to be stateless at the application layer, with all persistent data stored in Valkey. The architecture prioritizes performance and simplicity while maintaining security best practices.

Wiki pages you might want to explore:
- [Architecture (Pedrohmac07/Todo-App-Valkey)](/wiki/Pedrohmac07/Todo-App-Valkey#3)
- [High-Level System Design (Pedrohmac07/Todo-App-Valkey)](/wiki/Pedrohmac07/Todo-App-Valkey#3.1)

### Citations

**File:** bun.lock (L16-16)
```text
        "typescript": "^5",
```

**File:** bun.lock (L23-23)
```text
    "@elysiajs/jwt": ["@elysiajs/jwt@1.4.0", "", { "dependencies": { "jose": "^6.0.11" }, "peerDependencies": { "elysia": ">= 1.4.0" } }, "sha512-Z0PvZhQxdDeKZ8HslXzDoXXD83NKExNPmoiAPki3nI2Xvh5wtUrBH+zWOD17yP14IbRo8fxGj3L25MRCAPsgPA=="],
```

**File:** bun.lock (L33-37)
```text
    "@types/bun": ["@types/bun@1.3.5", "", { "dependencies": { "bun-types": "1.3.5" } }, "sha512-RnygCqNrd3srIPEWBd5LFeUYG7plCoH2Yw9WaZGyNmdTEei+gWaHqydbaIRkIkcbXwhBT94q78QljxN0Sk838w=="],

    "@types/node": ["@types/node@25.0.3", "", { "dependencies": { "undici-types": "~7.16.0" } }, "sha512-W609buLVRVmeW693xKfzHeIV6nJGGz98uCPfeXI1ELMLXVeKYZ9m15fAMSaUPBHYLGFsVRcMmSCksQOrZV9BYA=="],

    "bun-types": ["bun-types@1.3.5", "", { "dependencies": { "@types/node": "*" } }, "sha512-inmAYe2PFLs0SUbFOWSVD24sg1jFlMPxOjOSSCYqUgn4Hsc3rDc7dFvfVYjFPNHtov6kgUeulV4SxbuIV/stPw=="],
```

**File:** bun.lock (L47-47)
```text
    "elysia": ["elysia@1.4.19", "", { "dependencies": { "cookie": "^1.1.1", "exact-mirror": "0.2.5", "fast-decode-uri-component": "^1.0.1", "memoirist": "^0.4.0" }, "peerDependencies": { "@sinclair/typebox": ">= 0.34.0 < 1", "@types/bun": ">= 1.2.0", "file-type": ">= 20.0.0", "openapi-types": ">= 12.0.0", "typescript": ">= 5.0.0" }, "optionalPeers": ["@types/bun", "typescript"] }, "sha512-DZb9y8FnWyX5IuqY44SvqAV0DjJ15NeCWHrLdgXrKgTPDPsl3VNwWHqrEr9bmnOCpg1vh6QUvAX/tcxNj88jLA=="],
```

**File:** bun.lock (L57-57)
```text
    "ioredis": ["ioredis@5.8.2", "", { "dependencies": { "@ioredis/commands": "1.4.0", "cluster-key-slot": "^1.1.0", "debug": "^4.3.4", "denque": "^2.1.0", "lodash.defaults": "^4.2.0", "lodash.isarguments": "^3.1.0", "redis-errors": "^1.2.0", "redis-parser": "^3.0.0", "standard-as-callback": "^2.1.0" } }, "sha512-C6uC+kleiIMmjViJINWk80sOQw5lEzse1ZmvD+S/s8p8CWapftSaC+kocGTx6xrbrJ4WmYQGC08ffHLr6ToR6Q=="],
```

**File:** packages/backend/src/database/connection.ts (L1-3)
```typescript
import Redis from 'ioredis'

export const db = new Redis(process.env.DATABASE_URL || '');
```

**File:** obsidian-notes/Segunda etapa Infraestrutura e Ambiente.md (L32-46)
```markdown
> > [!folder-2]- packages
> > > [!folder-1]- backend
> > > > [!folder-2]- src
> > > > > [!folder-1]- database
> > > > > 📄 connection.ts
> > > > 
> > > > > [!folder-1]- routes
> > > > > 📄 auth.ts
> > > > > 📄 tasks.ts
> > > > 
> > > > > [!folder-1]- types
> > > > > 📄 task.ts
> > > > > 📄 user.ts
> > > > 
> > > > 📄 index.ts
```

**File:** packages/backend/src/index.ts (L1-13)
```typescript
import { Elysia } from 'elysia';
import { authRoutes } from './routes/auth.ts';
import { tasksRoutes } from './routes/tasks.ts';

const app = new Elysia()
  .get('/', () => 'API cache running!')

  .use(authRoutes)
  .use(tasksRoutes)

  .listen(process.env.PORT || '')

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
```

**File:** packages/backend/src/types/task.ts (L1-8)
```typescript
export interface Task {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  createdAt: number;
  userId: string;
}
```
