# Low-Level Design (LLD)

## Full Stack Advanced Reset System

### 1. Backend Folder Structure

```text
Backend/
├── Controllers/
│   └── user.controllers.js
├── Routes/
│   └── user.routes.js
├── Services/
│   └── user.services.js
├── middlewares/
│   ├── Auth.js
│   └── Rbac.js
├── models/
│   └── user.models.js
├── utility/
│   └── Email utility
├── Dockerfile
├── package.json
└── server.js
```

The repository follows a layered architecture with separate routes, controllers, services, models, and middleware.

### 2. Frontend Folder Structure

```text
Frontend/my-app/
├── public/
├── src/
│   ├── assets/
│   ├── pages/
│   │   ├── Signup
│   │   ├── Login
│   │   ├── ForgotPassword
│   │   └── Resetpassword
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── Dockerfile
├── Dockerfile.dev
├── nginx.conf
├── package.json
└── vite.config.js
```

The React application defines routes for signup, login, forgot password, and token-based password reset.

### 3. User Data Model

The MongoDB `User` document contains the following fields:

| Field                 | Type     | Purpose                        |
| --------------------- | -------- | ------------------------------ |
| `_id`                 | ObjectId | Unique user identifier         |
| `name`                | String   | User's name                    |
| `email`               | String   | User email                     |
| `password`            | String   | Hashed password                |
| `role`                | String   | `user` or `admin`              |
| `resetPasswordToken`  | String   | Temporary password reset token |
| `resetPasswordExpire` | String   | Reset token expiration         |

The password is hashed through a Mongoose `pre("save")` hook using bcrypt.

### 4. API Endpoints

The current user router exposes the following endpoints.

| Method | Endpoint        | Purpose                     |
| ------ | --------------- | --------------------------- |
| GET    | `/`             | Retrieve user data          |
| POST   | `/`             | Create user data            |
| PATCH  | `/:id`          | Update user                 |
| DELETE | `/:id`          | Delete user                 |
| POST   | `/signup`       | Register user               |
| POST   | `/login`        | Authenticate user           |
| POST   | `/reset`        | Generate a new access token |
| POST   | `/forget`       | Request password reset      |
| POST   | `/reset/:token` | Reset password using token  |

### 5. Controller Layer

The controller layer receives HTTP requests and delegates business logic to services.

Main controller operations:

```text
Getdata()
Postdata()
Patchdata()
Deletedata()

signup()
login()
reset()
forget()
resetPassword()
```

Controllers call corresponding service functions instead of directly implementing the main database/business logic.

### 6. Service Layer

The service layer contains the application business logic.

Responsibilities include:

* User retrieval
* User creation
* User updates
* User deletion
* Signup
* Login
* JWT generation
* Forgot-password processing
* Password reset processing
* Email integration
* Password hashing

This separation allows controllers to remain focused on request/response handling.

### 7. Authentication Flow

#### Login

```text
Client
  ↓
POST /login
  ↓
Controller
  ↓
Login Service
  ↓
Find User by Email
  ↓
Compare Password
  ↓
Generate Access Token
  ↓
Generate Refresh Token
  ↓
Return Tokens
```

JWT payload contains user-related authorization information such as user ID and role.

### 8. Access Token Refresh Flow

```text
Client
  ↓
Refresh Token
  ↓
POST /reset
  ↓
Verify Refresh Token
  ↓
Extract User ID + Role
  ↓
Generate New Access Token
  ↓
Return Access Token
```

### 9. Forgot Password Flow

```text
Client
  │
  │ POST /forget
  │ { email }
  ▼
Backend
  │
  ├── Find user
  │
  ├── Generate secure reset token
  │
  ├── Store token
  │
  ├── Store token expiration
  │
  └── Send email
          │
          ▼
      Reset URL
```

### 10. Password Reset Flow

The frontend route is:

```text
/reset-password/:token
```

The token is extracted from the URL and submitted to the backend.

```text
User clicks email
        ↓
React Reset Password Page
        ↓
Extract token
        ↓
Enter new password
        ↓
POST /reset/:token
        ↓
Validate token
        ↓
Find user
        ↓
Hash new password
        ↓
Update password
        ↓
Invalidate reset token
        ↓
Return success response
```

### 11. Authentication Middleware

Authentication middleware is responsible for:

1. Reading the authorization header.
2. Extracting the Bearer token.
3. Verifying the JWT.
4. Extracting user information.
5. Allowing or rejecting the request.

Expected header format:

```text
Authorization: Bearer <access-token>
```

### 12. RBAC Middleware

RBAC middleware checks the authenticated user's role.

```text
Authenticated User
        ↓
Extract role
        ↓
Required role?
   ┌────┴────┐
  Yes       No
   ↓         ↓
Allow      Reject
```

Supported roles:

```text
user
admin
```

### 13. Email Service

Nodemailer is used to send password reset emails.

The email contains a reset URL pointing to the frontend reset-password route.

Required environment configuration includes:

```text
MAIL
PASSI
```

### 14. Environment Configuration

Backend environment variables include:

```text
MONGO_URI
PORT
ACC_KEY
SEC_KEY
MAIL
PASSI
```

Secrets must not be committed to source control. The repository README documents these variables for deployment.

### 15. Docker Components

The Docker Compose configuration contains:

```text
mongodb
backend
frontend
```

MongoDB uses port `27017`, backend uses port `3000`, and frontend uses port `5173`.

### 16. Error Handling

The system should return appropriate responses for:

* User not found
* Invalid credentials
* Invalid JWT
* Missing authorization header
* Invalid reset token
* Expired reset token
* Invalid request data
* Database errors
* Email delivery errors

### 17. Security Design

Security mechanisms include:

* bcrypt password hashing
* JWT authentication
* Refresh token validation
* Role-based authorization
* Cryptographically secure reset token generation
* Reset token expiration
* Environment-based secret management
* Authentication middleware

### 18. Data Flow Summary

```text
React
  ↓
Axios
  ↓
Express Route
  ↓
Controller
  ↓
Service
  ↓
Mongoose Model
  ↓
MongoDB
```

For password recovery:

```text
React
  ↓
Forgot API
  ↓
Service
  ↓
Crypto Token
  ↓
MongoDB
  ↓
Nodemailer
  ↓
User Email
  ↓
React Reset Page
  ↓
Reset API
  ↓
MongoDB
```
