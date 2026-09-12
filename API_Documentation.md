# API Documentation

Base URL: http://localhost:5000

## 1. Create Enquiry

Method: POST

Endpoint: /api/enquiries

Request Body:

{
  "name": "Janak",
  "email": "janak@gmail.com",
  "phone": "9876543210",
  "message": "I want information about the course"
}

Response:

{
  "name": "Janak",
  "email": "janak@gmail.com",
  "phone": "9876543210",
  "message": "I want information about the course",
  "status": "New"
}


## 2. Get Enquiries

Method: GET

Endpoint: /api/enquiries

Response:

[
  {
    "_id": "enquiry_id",
    "name": "Janak",
    "email": "janak@gmail.com",
    "phone": "9876543210",
    "message": "I want information about the course",
    "status": "New"
  }
]


## 3. Update Enquiry

Method: PUT

Endpoint: /api/enquiries/:id

Request Body:

{
  "status": "Contacted"
}

Response:

{
  "_id": "enquiry_id",
  "name": "Janak",
  "email": "janak@gmail.com",
  "phone": "9876543210",
  "message": "I want information about the course",
  "status": "Contacted"
}


## 4. Delete Enquiry

Method: DELETE

Endpoint: /api/enquiries/:id

Response:

{
  "message": "Enquiry deleted successfully"
}