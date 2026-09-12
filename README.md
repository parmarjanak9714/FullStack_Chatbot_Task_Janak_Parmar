# FullStack Chatbot Task Janak Parmar

## Project Description

A responsive Full Stack AI Support & Lead Assistant web application built using React.js, TypeScript, Node.js, Express.js and MongoDB.

The application provides a rule-based chatbot, customer/student enquiry collection, backend APIs, database integration and an admin enquiry dashboard.

## Technologies Used

- React.js
- TypeScript
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- Mongoose

## Features

- Rule-based chatbot with predefined responses
- Customer/student enquiry collection
- RESTful backend API
- MongoDB database integration
- Create, read, update and delete enquiries
- Admin enquiry dashboard
- Search and status filtering
- Enquiry status management
- Form validation and error handling
- Basic security practices

## Setup Instructions

### Backend

```bash
cd backend
npm install
npm run dev

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=mongodb://localhost:27017/FullStack_Chatbot_Task

## Database Setup

The application uses MongoDB.

Database name:

FullStack_Chatbot_Task

Collection:

Enquiries

Start MongoDB locally before running the backend.

The database setup details are also available in `Database_Setup.md`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/enquiries` | Create a new enquiry |
| GET | `/api/enquiries` | Get all enquiries |
| PUT | `/api/enquiries/:id` | Update an enquiry |
| DELETE | `/api/enquiries/:id` | Delete an enquiry |

## How to Run

1. Start MongoDB.
2. Open the backend terminal and run:

```bash
cd backend
npm install
npm run dev

cd frontend
npm install
npm run dev

## Screenshots

Screenshots of the application are available in the `02_Screenshots` folder.