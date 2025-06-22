# 📚 Library Management System Backend

This is a backend application for managing a library system built using **TypeScript**, **Express.js**, **MongoDB**, and **Mongoose**. It provides CRUD operations for books and functionality for borrowing books with inventory updates and summaries using aggregation.

## 🚀 Live Demo

🔗 [Live Link](https://library-management-system-using-mon.vercel.app)

---

## ⚙️ Features

- Create, Read, Update, Delete (CRUD) operations for books
- Borrow book functionality
- Automatic inventory management
- Summary of borrowed books using MongoDB aggregation
- Filtering, sorting, and pagination support

---
## Tech Stack

- Node.js  
- Express.js  
- TypeScript  
- MongoDB  
- Mongoose

---

## 📦 API Endpoints

### 1. 📘 Create Book

**POST** `/api/books`

**Request:**
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}

### 2. 📚 Get All Books

**GET** `/api/books`

Supports filtering, sorting, and limiting.

**Query Example:**
```bash
/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

- `filter`: Filter by genre  
- `sort`: asc or desc  
- `limit`: Number of results (default: 10)  

**Response:**
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "...",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}

### 3. 🔍 Get Book by ID

**GET** `/api/books/:bookId`

**Response:**
```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "...",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
### 4. ✏️ Update Book

**PUT** `/api/books/:bookId`

**Request:**
```json
{
  "copies": 50
}

**Response:**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "...",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "...",
    "updatedAt": "..."
  }
}

### 5. ❌ Delete Book

**DELETE** `/api/books/:bookId`

**Response:**
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
### 6. 📥 Borrow a Book

**POST** `/api/borrow`

**Business Logic:**
- Check available copies
- Deduct the requested quantity from `copies`
- If `copies` becomes 0, set `available: false` (using static or instance method)
- Save the borrow record with all relevant details

**Request:**
```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "...",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
### 7. 📊 Borrowed Books Summary

**GET** `/api/borrow`

**Purpose:**  
Return summary of borrowed books

**Aggregation Logic:**  
- Group by book  
- Sum total borrowed quantity  
- Return book title & ISBN  

**Response:**
```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

env
DB_NAME=your_mongodb_database
DB_PASSWORD=your_mongodb_password



