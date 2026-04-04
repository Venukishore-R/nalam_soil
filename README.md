# Nalam Soil

A comprehensive soil nutrient analysis application for farmers, built with React and Node.js.

## Project Structure

This repository contains two main applications:

- `nalam_soil_frontend/` - React frontend application
- `nalam_soil_backend/` - Node.js/Express backend API

## Features

- **User Authentication**: Secure login and registration system
- **Soil Testing**: NPK (Nitrogen, Phosphorous, Potassium) analysis
- **Crop-Specific Recommendations**: Tailored advice based on crop type and growth stage
- **Yield Estimation**: Predictive analytics for crop yields
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend

- React 18 with TypeScript
- Ant Design UI components
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

### Backend

- Node.js with Express
- TypeScript
- SQLite database for user data
- bcryptjs for password hashing
- Zod for validation
- CORS enabled

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nalam-soil
   ```

2. **Setup Backend**

   ```bash
   cd nalam_soil_backend
   npm install
   npm run dev
   ```

   Backend will run on http://localhost:6001

3. **Setup Frontend** (in a new terminal)

   ```bash
   cd nalam_soil_frontend
   npm install
   npm run dev
   ```

   Frontend will run on http://localhost:5173

4. **Access the Application**
   Open http://localhost:5173 in your browser

## API Documentation

The backend provides RESTful APIs for soil analysis. See `nalam_soil_backend/README.md` for detailed API documentation.

## Supported Crops

- Paddy (Rice)
- Sorghum
- Sugarcane
- Radish
- Tapioca

## Development

- Frontend uses Vite for fast development
- Backend uses ts-node-dev for hot reloading
- Both applications include TypeScript for type safety

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
