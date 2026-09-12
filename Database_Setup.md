# Database Setup

## Database

MongoDB

## Database Name

FullStack_Chatbot_Task

## Connection

mongodb://localhost:27017/FullStack_Chatbot_Task

## Collection

Enquiries

## Enquiry Fields

- name: String
- email: String
- phone: String
- message: String
- status: New | Contacted | Resolved
- createdAt: Date
- updatedAt: Date

## Setup Instructions

1. Install MongoDB.
2. Start the MongoDB server.
3. Open the backend project.
4. Create a `.env` file.
5. Add the MongoDB connection string:

MONGO_URI=mongodb://localhost:27017/FullStack_Chatbot_Task

6. Start the backend server.
7. The application will connect to the MongoDB database.