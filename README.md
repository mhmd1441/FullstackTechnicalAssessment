# \## Setup

# 

# \### Prerequisites

# 

# Make sure you have:

# 

# \- .NET 8 SDK

# \- Node.js and npm

# \- PostgreSQL

# 

# \### Backend

# 

# Go to the backend project:

# 

# &#x20;   cd Backend/ClientRequests

# 

# Restore the dependencies:

# 

# &#x20;   dotnet restore

# 

# Configure the PostgreSQL connection string using .NET User Secrets:

# 

# &#x20;   dotnet user-secrets init

# &#x20;   dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=ClientRequestsDb;Username=postgres;Password=YOUR\_PASSWORD"

# 

# Create/update the database using the included EF Core migrations:

# 

# &#x20;   dotnet ef database update

# 

# Run the API:

# 

# &#x20;   dotnet run

# 

# The API runs locally at:

# 

# &#x20;   http://localhost:5148

# 

# Swagger is available at:

# 

# &#x20;   http://localhost:5148/swagger

# 

# \### Frontend

# 

# Go to the frontend:

# 

# &#x20;   cd Frontend

# 

# Install dependencies:

# 

# &#x20;   npm install

# 

# Create a `.env` file based on `.env.example`:

# 

# &#x20;   VITE\_API\_URL=http://localhost:5148

# 

# Start React:

# 

# &#x20;   npm run dev

# 

# Open:

# 

# &#x20;   http://localhost:5173

