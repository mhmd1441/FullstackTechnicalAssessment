# Client Requests Dashboard

A small internal dashboard for creating, viewing, filtering, and progressing client requests through `New`, `In Progress`, and `Done`.

## Tech stack

- Frontend: React, Vite, React Router
- Backend: ASP.NET Core 8 REST API
- Database: PostgreSQL with Entity Framework Core

## Project structure

```text
Frontend/                     React application
Backend/ClientRequests/       ASP.NET Core API and EF Core migrations
```

## Prerequisites

- .NET 8 SDK
- Node.js and npm
- PostgreSQL

## Run the backend

1. In a terminal, move to the API project:

   ```bash
   cd Backend/ClientRequests
   ```

2. Restore dependencies:

   ```bash
   dotnet restore
   ```

3. Configure your local PostgreSQL connection string with User Secrets:

   ```bash
   dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=ClientRequestsDb;Username=postgres;Password=YOUR_PASSWORD"
   ```

4. Apply the included database migrations:

   ```bash
   dotnet ef database update
   ```

5. Start the API:

   ```bash
   dotnet run
   ```

The API is available at `http://localhost:5148`. Swagger is available at `http://localhost:5148/swagger` while running in Development.

## Run the frontend

1. In a second terminal, move to the frontend:

   ```bash
   cd Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env`. Its local value should be:

   ```env
   VITE_API_URL=http://localhost:5148
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

Open `http://localhost:5173` in your browser.

## Demo login

The login is mock authentication for this technical assessment only.

- Email: `najahakworld@gmail.com`
- Password: `najah123`

## API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/requests` | Fetch paginated client requests; supports `page`, `pageSize`, and `status` query parameters. |
| `POST` | `/api/requests` | Create a client request. |
| `PATCH` | `/api/requests/{id}/status` | Move a request from `New` to `InProgress`, or from `InProgress` to `Done`. |

## Checks

```bash
cd Frontend
npm run lint
npm run build
```

```bash
cd Backend/ClientRequests
dotnet build
```

