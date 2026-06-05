# Full Stack Advanced Reset System

A full-stack authentication project built with Node.js, Express, MongoDB, and React. The project includes JWT-based authentication, role-based access control, password reset through email, and a dedicated frontend page for resetting passwords.

## Features

* User Signup and Login
* JWT Authentication
* Access Token and Refresh Token
* Role Based Access Control (RBAC)
* Forgot Password Functionality
* Password Reset via Email
* Secure Token Generation using Crypto
* React Frontend for Password Reset
* MongoDB Database Integration
* Dockerized Frontend and Backend
* Docker Compose Setup with MongoDB

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Bcrypt
* Nodemailer

### Frontend

* React
* React Router
* Axios
* Vite

### DevOps

* Docker
* Docker Compose

## Project Structure

```text
Backend/
Frontend/my-app/
docker-compose.yml
```

## Password Reset Flow

1. User enters email on forgot password endpoint.
2. A secure reset token is generated.
3. Reset link is sent to the user's email.
4. User clicks the link received in the email.
5. Frontend reset password page opens.
6. User enters a new password.
7. Password gets updated in the database.

## Docker Setup

### Build and Run Everything

```bash
docker compose up --build
```

### Services

* Frontend → Port 5173
* Backend → Port 3000
* MongoDB → Port 27017

## Environment Variables

Create a `.env` file inside the Backend folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
ACC_KEY=your_access_secret
SEC_KEY=your_refresh_secret
MAIL=your_email
PASSI=your_app_password
```

## Previous Version

I had previously built a password reset system that handled the backend functionality only. In this version, I added a React frontend that opens directly when the user clicks the reset link received through email, allowing the password to be updated through a dedicated user interface instead of testing the flow manually through API requests.

## Learning Outcomes

Through this project I practiced:

* Authentication and Authorization
* JWT Token Management
* Password Hashing
* Email Integration using Nodemailer
* React Routing
* Docker and Docker Compose
* Container Networking
* MongoDB Integration

## Author

Bhavish Trehan
