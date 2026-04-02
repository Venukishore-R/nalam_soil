# Nalam Soil Frontend

A React-based frontend application for soil nutrient analysis using TypeScript, Tailwind CSS, and Ant Design.

## Features

- User authentication (login/register)
- Soil nutrient testing (NPK analysis)
- Crop-specific recommendations
- Responsive design
- Real-time data visualization

## Tech Stack

- React 18
- TypeScript
- Vite
- Ant Design
- Tailwind CSS
- React Router
- Axios

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate to the frontend directory:

   ```bash
   cd nalam_soil_frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── lib/           # Utility functions and types
├── pages/         # Page components
├── App.tsx        # Main app component
└── main.tsx       # Entry point
```

## API Integration

The frontend communicates with the backend API at `http://localhost:3001/api`. Make sure the backend server is running.
