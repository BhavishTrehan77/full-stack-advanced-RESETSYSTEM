# High-Level Design (HLD)

## Full Stack Advanced Reset System

### 1. Overview

The Full Stack Advanced Reset System is a web-based authentication and password management application. It provides secure user registration, login, JWT-based authentication, role-based access control, forgot-password functionality, and password reset through an email link.

The system is implemented using React for the frontend, Node.js and Express.js for the backend, MongoDB with Mongoose for data persistence, and Docker/Docker Compose for containerized deployment.

### 2. Objectives

The main objectives of the system are:

* Provide secure user registration and login.
* Authenticate users using JWT tokens.
* Support access-token and refresh-token based authentication.
* Provide role-based access control for users and administrators.
* Allow users to request a password reset through email.
* Generate secure password reset tokens.
* Allow users to reset their password through a dedicated React page.
* Store user credentials securely using password hashing.
* Provide a containerized environment for frontend, backend, and MongoDB.

### 3. System Architecture

The application follows a client-server architecture.

```text
                    ┌─────────────────────┐
                    │       User          │
                    │   Web Browser       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      Vite           │
                    │                     │
                    │ Signup              │
                    │ Login               │
                    │ Forgot Password     │
                    │ Reset Password      │
                    └──────────┬──────────┘
                               │ HTTP/REST
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    │     Node.js         │
                    │                     │
                    │ Routes              │
                    │ Controllers         │
                    │ Services            │
                    │ Middleware          │
                    └──────┬───────┬──────┘
                           │       │
                  ┌────────┘       └─────────┐
                  ▼                          ▼
        ┌─────────────────┐         ┌─────────────────┐
        │    MongoDB      │         │    Nodemailer   │
        │    Database     │         │  Email Service  │
        └─────────────────┘         └─────────────────┘
```

### 4. Major Components

#### 4.1 Frontend

The frontend is developed using React and Vite.

Responsibilities:

* Display authentication forms.
* Collect user credentials.
* Communicate with backend APIs using Axios.
* Handle client-side routing.
* Display forgot-password functionality.
* Extract the reset token from the URL.
* Provide the reset-password interface.

The frontend contains routes for:

* `/signup`
* `/login`
* `/forgot-password`
* `/reset-password/:token`

### 4.2 Backend

The backend is implemented using Node.js and Express.js.

It is divided into multiple layers:

```text
Request
   ↓
Route
   ↓
Controller
   ↓
Service
   ↓
Model
   ↓
MongoDB
```

The backend contains:

* Routes
* Controllers
* Services
* Models
* Authentication middleware
* RBAC middleware
* Utility modules

### 4.3 Database

MongoDB is used as the persistent data store.

The primary entity is the `User`.

A user contains:

* Name
* Email
* Password
* Role
* Reset password token
* Reset password expiration

Passwords are hashed using bcrypt before being stored.

### 4.4 Authentication

JWT is used for authentication.

The system supports:

* Access token
* Refresh token

The access token is used to authenticate protected operations, while the refresh token can be used to generate a new access token.

### 4.5 Authorization

Role-Based Access Control is implemented using roles such as:

* `user`
* `admin`

Authentication middleware verifies the JWT, while RBAC middleware checks whether the authenticated user has the required role.

### 4.6 Password Reset Architecture

The password reset process works as follows:

```text
User
 │
 │ enters email
 ▼
Forgot Password API
 │
 │ generate secure token
 ▼
Database
 │
 │ store token + expiry
 ▼
Email Service
 │
 │ send reset link
 ▼
User Email
 │
 │ clicks link
 ▼
React Reset Page
 │
 │ token from URL
 ▼
Reset Password API
 │
 │ validate token
 │ update password
 ▼
MongoDB
```

### 5. Deployment Architecture

Docker Compose is used to run the complete system.

The deployment contains three services:

```text
┌───────────────────────────────────────┐
│          Docker Compose               │
│                                       │
│  ┌─────────────┐  ┌───────────────┐  │
│  │  Frontend   │  │    Backend    │  │
│  │   :5173     │  │     :3000     │  │
│  └─────────────┘  └───────┬───────┘  │
│                           │           │
│                    ┌──────▼───────┐   │
│                    │    MongoDB   │   │
│                    │     :27017   │   │
│                    └──────────────┘   │
└───────────────────────────────────────┘
```

### 6. Technology Stack

| Layer               | Technology     |
| ------------------- | -------------- |
| Frontend            | React          |
| Frontend Build Tool | Vite           |
| Routing             | React Router   |
| API Communication   | Axios          |
| Backend             | Node.js        |
| API Framework       | Express.js     |
| Database            | MongoDB        |
| ODM                 | Mongoose       |
| Authentication      | JWT            |
| Password Hashing    | bcrypt         |
| Email               | Nodemailer     |
| Containerization    | Docker         |
| Orchestration       | Docker Compose |

### 7. Non-Functional Requirements

#### Security

* Passwords must never be stored as plain text.
* Authentication tokens must be validated before protected operations.
* Password reset tokens must be generated securely.
* Sensitive credentials must be stored using environment variables.
* Role-based authorization must be applied to restricted operations.

#### Scalability

The backend is separated into routes, controllers, services, and models so individual components can be modified or scaled independently.

#### Maintainability

The layered backend structure makes business logic independent from HTTP request handling and database models.

#### Availability

Docker Compose provides a reproducible environment containing the frontend, backend, and database services.

### 8. Assumptions

* Users have access to a valid email address.
* MongoDB is available to the backend.
* Email credentials are configured through environment variables.
* JWT secrets are stored securely in environment variables.
* The reset link is accessible through the React frontend.

### 9. Conclusion

The system provides a complete authentication and password recovery solution using a React frontend, Express backend, MongoDB database, JWT authentication, RBAC, email-based password recovery, and Docker-based deployment.
