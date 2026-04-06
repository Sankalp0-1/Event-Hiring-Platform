# Event Hiring Platform

A full-stack requirement posting platform built for the GoPratle assignment.

## Tech Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas + Mongoose

## Features

- 4-step multi-form flow for posting event requirements
- Category-specific fields for Planner, Performer, and Crew
- Data saved to separate MongoDB collections per category
- Clean REST API with validation
- Success screen with auto-redirect

## Getting Started

### Backend Setup
```bash
cd backend
npm install
# Create .env file with:
# MONGODB_URI=your_mongodb_connection_string
# FRONTEND_URL=http://localhost:3000
# PORT=5000
node server.js
```

### Frontend Setup
```bash
cd frontend
npm install
# Create .env.local file with:
# NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/requirements` | Save a new requirement |
| GET | `/api/requirements?category=planner` | Get requirements by category |

## Form Flow

1. **Step 1 — Event Basics:** Event name, type, date range, location, venue, category selection
2. **Step 2 — Category Details:** Adapts based on Planner / Performer / Crew selection
3. **Step 3 — Preferences:** Additional preferences per category
4. **Step 4 — Review & Submit:** Preview all data before final submission

## MongoDB Collections

Data is stored in **separate collections** based on category:
- `planners` — Event planner requirements
- `performers` — Performer requirements  
- `crews` — Crew requirements

## Live Demo

- **Frontend:** [https://event-hiring-platform.vercel.app]
- **Backend:** [https://event-hiring-platform.onrender.com]
