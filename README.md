# ContactVault API

## Overview

ContactVault is a simple RESTful API built with [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) using [Mongoose](https://mongoosejs.com/) as an ODM. It serves as a contact-management service and includes basic user registration endpoints. The project reads configuration from environment variables via the [`dotenv`](https://www.npmjs.com/package/dotenv) package and uses `mongoose.connect()` to connect to a MongoDB database using a connection string defined in the `.env` file. Passwords are hashed with [`bcrypt`](https://www.npmjs.com/package/bcrypt), and a centralized error handler returns consistent JSON error responses.

## Features

- **Express server** – Sets up an Express application and listens on a configurable port. JSON request bodies are parsed using `express.json()`.
- **MongoDB connection** – Uses Mongoose to connect to a MongoDB Atlas cluster or local instance. The connection details are read from `process.env.CONNECTION_STRING`, and the connection host and database name are logged on success.
- **Contact model** – Defines a `Contact` schema with required `name`, `email` and `phone` fields and automatic timestamps. CRUD operations are implemented in the contact controller.
- **User model** – Defines a `User` schema with `username`, `email` and `password` fields. The `email` field is unique and passwords are stored as hashes.
- **User registration** – Supports user registration with hashed passwords. Basic login and current-user endpoints are stubbed for future implementation.
- **Centralized error handling** – A custom error-handling middleware reads an error status code and returns structured JSON for validation errors, unauthorised access, forbidden access and server errors. Common HTTP status codes are stored in `constants.js`.

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v16 or later is recommended)
* A MongoDB database (Atlas cluster or local instance)
* [Git](https://git-scm.com/) to clone the repository

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nurrbb/contactVault.git
   cd contactVault


2. **Install dependencies**

   ```bash
   npm install

   
3. **Create a .env file**

   Copy the example below into a new .env file at the project root and replace the values as needed:

   ```bash
   PORT=5000                    # Port on which the server will listen
   CONNECTION_STRING=mongodb+srv://<user>:<password>@cluster0.mongodb.net/contactvault



4. **Start the development server**

   ```bash
   npm run dev

## API Endpoints

All endpoints are prefixed with **`/api`**.  
Requests and responses use **JSON**.

---

## 📇 Contact Routes

| Method | Route                | Description |
|-------|----------------------|-------------|
| **GET**  | `/api/contacts`       | Retrieve all contacts from the database. |
| **POST** | `/api/contacts`       | Create a new contact. The request body **must include** `name`, `email`, and `phone`, otherwise a `400` error is returned. |
| **GET**  | `/api/contacts/:id`   | Retrieve a single contact by ID. Returns `404` if not found. |
| **PUT**    | `/api/contacts/:id`   | Update an existing contact. Any provided field will overwrite the existing value. |
| **DELETE** | `/api/contacts/:id` | Delete a contact by ID. |


## 👤 User Routes

| Method | Route                 | Description |
|--------|------------------------|-------------|
| **POST** | `/api/users/register` | Register a new user with `username`, `email`, and `password`. Returns **400** if the email already exists. Password is hashed using **bcrypt**. |
| **POST** | `/api/users/login`    | Login endpoint (placeholder). Authentication logic still needs to be implemented. |
| **GET**  | `/api/users/current`  | Returns the current authenticated user (stub). Should be connected to authentication middleware. |


## 📁 Folder Structure

```text
contactVault/
│  server.js               # Entry point; sets up Express, routes, DB connection
│  constants.js            # HTTP status code constants
│  package.json            # Dependencies & scripts
│  .env                    # Environment variables (not committed)
│
├──config/
│     dbConnection.js      # MongoDB connection via Mongoose
│
├──controllers/
│     contectController.js # Contact CRUD controller
│     userController.js    # User registration & login handlers
│
├──middleware/
│     errorHandler.js      # Centralized error-handling middleware
│
├──models/
│     contactModel.js      # Contact Mongoose schema
│     userModel.js         # User Mongoose schema
│
└──routes/
      contactRoutes.js     # Contact API routes
      userRoutes.js        # User API routes
