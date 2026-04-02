# Nalam Soil Backend

A Node.js/Express backend API for soil nutrient analysis using TypeScript and SQLite.

## Features

- RESTful API for soil testing
- User authentication (registration/login) with SQLite database
- Nutrient analysis algorithms
- Crop-specific recommendations
- Input validation with Zod
- CORS enabled
- Password hashing with bcrypt

## Tech Stack

- Node.js
- Express.js
- TypeScript
- SQLite (better-sqlite3)
- Zod (validation)
- bcryptjs (password hashing)
- CORS

## Database

The application uses SQLite database (`nalam_soil.db`) with the following schema:

### Users Table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  mobileNumber TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  village TEXT NOT NULL,
  district TEXT NOT NULL,
  landholding REAL NOT NULL,
  unit TEXT NOT NULL,
  cropCategories TEXT NOT NULL,
  createdAt TEXT NOT NULL DEFAULT (datetime('now'))
);
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate to the backend directory:

   ```bash
   cd nalam_soil_backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on [http://localhost:3001](http://localhost:3001).

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server (requires build first)

## API Endpoints

### Authentication

#### POST /api/register

Register a new user.

**Request Body:**

```json
{
  "name": "John Doe",
  "mobileNumber": "9876543210",
  "password": "password123",
  "village": "Sample Village",
  "district": "Sample District",
  "landholding": 2.5,
  "unit": "acre",
  "cropCategories": ["Paddy", "Sorghum"]
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "mobileNumber": "9876543210",
    "village": "Sample Village",
    "district": "Sample District",
    "landholding": 2.5,
    "unit": "acre",
    "cropCategories": ["Paddy", "Sorghum"]
  }
}
```

**Error Response (409):**

```json
{
  "success": false,
  "error": "Mobile number already registered"
}
```

#### POST /api/login

Authenticate a user.

**Request Body:**

```json
{
  "mobileNumber": "9876543210",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "mobileNumber": "9876543210",
    "village": "Sample Village",
    "district": "Sample District",
    "landholding": 2.5,
    "unit": "acre",
    "cropCategories": ["Paddy", "Sorghum"]
  }
}
```

**Error Response (401):**

```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

### Soil Testing

#### POST /api/soil-test

Analyze soil nutrients for a specific crop.

**Request Body:**

```json
{
  "cropName": "Paddy",
  "soilType": "Red Sandstone",
  "variety": "Ponni",
  "dayAfterPlanting": 30,
  "landholdingOfCrop": 2.5,
  "unit": "acre"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "testId": "TEST-1234567890",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "cropName": "Paddy",
    "analysis": {
      "nitrogen": { "level": "Medium", "recommendation": "..." },
      "phosphorous": { "level": "Low", "recommendation": "..." },
      "potassium": { "level": "High", "recommendation": "..." },
      "overallRecommendation": "...",
      "estimatedYield": {
        "optimistic": 4500,
        "realistic": 3500,
        "conservative": 2500
      }
    }
  }
}
```

## Project Structure

```
src/
├── lib/           # Shared utilities and data
├── routes/        # API route handlers
└── index.ts       # Server entry point
```

## Supported Crops

- Paddy
- Sorghum
- Sugarcane
- Radish
- Tapioca

## Development

The server uses `ts-node-dev` for development with automatic restarts on file changes.
