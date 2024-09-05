# Beautiful Notes App

This is a secure and user-friendly note-taking application built with [Next.js](https://nextjs.org), [Prisma](https://www.prisma.io/), and [NextAuth.js](https://next-auth.js.org/). It allows users to create, read, update, and delete notes while ensuring data privacy through user authentication.

## Features

- User authentication
- Create, read, update, and delete notes
- Secure API routes
- Database integration with Prisma

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/yourusername/note-taking-app.git
   cd note-taking-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables: Create a .env file in the root directory and add the following:

```
NEXTAUTH_SECRET="anything"
GOOGLE_CLIENT_ID="google_Client_id"
GOOGLE_CLIENT_SECRET="Google_Client_secret"
DATABASE_URL="your_postgresql_connection_string"
NEXTAUTH_SECRET="your_nextauth_secret"
```

4. Set up the database:

```bash
npx prisma migrate dev
```

5. Run the development server:

```bash
npm run dev
```

6. Open http://localhost:3000 with your browser to see the application.

## API Routes

- **GET /api/note:** Fetch all notes for the authenticated user
- **POST /api/note:** Create a new note
- **PUT /api/note:** Update an existing note
- **DELETE /api/note:** Delete a note

## Authentication

This project uses NextAuth.js for authentication. You can customize the authentication providers in `src/lib/authOptions.ts.`
