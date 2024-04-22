# Blog API

## Introduction
The `blog-api` is a RESTful API developed with Node.js and Express, designed for managing blog posts and user interactions in a blog application. It leverages MongoDB for data storage, with Mongoose for schema management and data validation. Authentication is handled via Passport, supporting both local strategy and JWT for secure access to endpoints.

## Features
- CRUD operations for blog posts
- User registration and authentication
- Session management with JWT
- Logging with Winston for monitoring and debugging

## Prerequisites
- Node.js (v20.0.0 or higher)
- MongoDB
- npm (Node Package Manager)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/blog-api.git
   cd blog-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and update the environment variables using the .env.example as a reference:

4. **Run the application:**
   ```bash
   npm start
   ```

   This will start the server on `http://localhost:3000`.

## Usage

After starting the server, the API endpoints can be accessed through `http://localhost:3000/api/...`. Below are a few examples of available endpoints:

### API Endpoints

**User Operations:**
- **Login**: `POST /user/login` — Authenticate using local strategy.
- **Register**: `POST /user/register` — Register a new user.

**Blog Operations:**
- **Fetch Blogs**: `GET /blogs` — Retrieve all blogs.
- **Fetch User Blogs**: `GET /user/blogs` — Retrieve blogs specific to authenticated user (JWT required).
- **Create Blog**: `POST /blogs` — Create a new blog (JWT required).
- **Edit Blog**: `POST /blog/:blogId/edit` — Edit an existing blog (JWT required).
- **Publish Blog**: `POST /blog/:blogId/publish` — Publish a blog (JWT required).
- **Delete Blog**: `POST /blog/:blogId/delete` — Delete a blog (JWT required).

### Middleware
- **Logger Middleware**: Handles logging of request and response.
- **Auth Middleware**: Manages authentication strategies and user validation.
- **Error Handler Middleware**: Catches and processes application errors, returning standardized error messages.

## License
This project is licensed under the MIT License - see the `LICENSE` file for details.


