# Product Requirements Document (PRD)

## Full Stack Advanced Reset System

### 1. Product Overview

The Full Stack Advanced Reset System is an authentication and password recovery platform that allows users to create accounts, log in securely, manage authentication sessions, and recover forgotten passwords through email.

The product combines a React frontend with a Node.js/Express backend and MongoDB database. It also provides role-based access control and Docker-based deployment.

### 2. Problem Statement

Users frequently forget their passwords and need a secure mechanism to regain access to their accounts.

A password recovery system must:

* Verify the user's identity.
* Prevent unauthorized password changes.
* Use temporary reset credentials.
* Provide an easy-to-use reset interface.
* Protect stored passwords.
* Support authenticated and role-restricted operations.

The system solves this problem by providing an email-based password reset workflow using secure tokens.

### 3. Product Goals

#### Primary Goals

* Provide secure signup and login.
* Authenticate users using JWT.
* Support access and refresh tokens.
* Provide role-based authorization.
* Provide forgot-password functionality.
* Send password reset links through email.
* Allow users to set a new password through a frontend interface.
* Protect passwords using bcrypt.
* Provide a Dockerized deployment environment.

#### Secondary Goals

* Maintain a modular backend architecture.
* Keep authentication logic reusable.
* Provide a simple and responsive authentication experience.
* Make the application easy to run locally and deploy.

### 4. Target Users

#### Normal User

A normal user should be able to:

* Create an account.
* Log in.
* Access authenticated functionality.
* Request a password reset.
* Receive a reset email.
* Set a new password.

#### Administrator

An administrator should have elevated permissions through RBAC.

The administrator role can be used for restricted operations that should not be available to normal users.

### 5. Functional Requirements

#### FR-01: User Registration

The system shall allow a new user to register using:

* Name
* Email
* Password

The password must be securely hashed before being stored.

#### FR-02: User Login

The system shall allow registered users to authenticate using:

* Email
* Password

On successful authentication, the system shall issue JWT-based authentication credentials.

#### FR-03: Access Token

The system shall issue an access token containing required user authorization information.

The access token shall be verified before protected operations.

#### FR-04: Refresh Token

The system shall support refresh-token based authentication.

A valid refresh token can be used to obtain a new access token.

#### FR-05: Role-Based Access Control

The system shall support at least two roles:

* `user`
* `admin`

Restricted operations shall be protected by RBAC middleware.

#### FR-06: Forgot Password

The system shall provide a forgot-password page where the user enters their registered email address.

The backend shall:

1. Find the user.
2. Generate a secure temporary reset token.
3. Store the token.
4. Store an expiration value.
5. Send a password reset link through email.

#### FR-07: Password Reset

The system shall provide a dedicated reset-password page.

The reset page shall receive the token through the URL:

```text
/reset-password/:token
```

The user shall enter a new password.

The backend shall validate the token before updating the password.

#### FR-08: Password Security

Passwords shall never be stored as plain text.

The system shall hash passwords using bcrypt.

#### FR-09: Token Security

Password reset tokens shall be temporary and shall expire after the configured expiration period.

Invalid or expired reset tokens shall not be accepted.

#### FR-10: User Management

The backend shall support basic user data operations:

* Create
* Read
* Update
* Delete

These operations are exposed through the user router.

### 6. Frontend Requirements

The frontend shall provide the following pages:

| Page            | Route                    | Purpose            |
| --------------- | ------------------------ | ------------------ |
| Signup          | `/signup`                | Create account     |
| Login           | `/login`                 | Authenticate user  |
| Forgot Password | `/forgot-password`       | Request reset link |
| Reset Password  | `/reset-password/:token` | Set new password   |

The React application already defines these routes.

### 7. Backend Requirements

The backend shall expose REST APIs for:

* User management
* Signup
* Login
* Token refresh
* Forgot password
* Password reset

Current routes include:

```text
POST /signup
POST /login
POST /reset
POST /forget
POST /reset/:token
```

along with basic user CRUD endpoints.

### 8. Non-Functional Requirements

#### NFR-01: Security

The system must:

* Hash passwords.
* Validate JWT tokens.
* Protect authorization headers.
* Validate reset tokens.
* Expire reset tokens.
* Keep secrets in environment variables.
* Enforce RBAC for restricted resources.

#### NFR-02: Performance

Normal authentication API requests should respond quickly under normal load.

Database queries should be kept efficient and unnecessary database calls should be avoided.

#### NFR-03: Reliability

The system should gracefully handle:

* Invalid credentials
* Invalid tokens
* Expired reset links
* Missing users
* Database failures
* Email failures

#### NFR-04: Maintainability

The backend should maintain separation between:

```text
Routes
Controllers
Services
Models
Middleware
Utilities
```

This makes individual components easier to modify and test.

#### NFR-05: Portability

The application shall support containerized execution using Docker Compose.

### 9. User Journey

#### Signup Journey

```text
User
 ↓
Signup Page
 ↓
Enter Name + Email + Password
 ↓
Signup API
 ↓
Validate Data
 ↓
Hash Password
 ↓
Save User
 ↓
Account Created
```

#### Login Journey

```text
User
 ↓
Login Page
 ↓
Enter Email + Password
 ↓
Login API
 ↓
Find User
 ↓
Verify Password
 ↓
Generate JWT Tokens
 ↓
Authenticated User
```

#### Forgot Password Journey

```text
User
 ↓
Forgot Password Page
 ↓
Enter Email
 ↓
Forgot Password API
 ↓
Generate Reset Token
 ↓
Store Token
 ↓
Send Email
 ↓
User Receives Email
```

#### Reset Password Journey

```text
Email Link
 ↓
Reset Password Page
 ↓
Token from URL
 ↓
Enter New Password
 ↓
Reset API
 ↓
Validate Token
 ↓
Hash Password
 ↓
Update User
 ↓
Password Reset Complete
```

### 10. Acceptance Criteria

#### Signup

* User can submit valid registration data.
* Password is hashed before database storage.
* Duplicate/invalid registration is rejected appropriately.

#### Login

* Valid credentials authenticate successfully.
* Invalid credentials are rejected.
* JWT tokens are generated after successful authentication.

#### Authorization

* Valid JWTs are accepted.
* Invalid JWTs are rejected.
* Users without the required role cannot access restricted functionality.

#### Forgot Password

* User can submit their email.
* A secure reset token is generated.
* Reset token information is stored.
* Reset link is sent through email.

#### Reset Password

* Reset page opens using the email link.
* Token is read from the URL.
* Valid token allows password update.
* Invalid or expired token is rejected.
* New password is hashed before storage.

#### Docker

The complete system should be runnable using:

```bash
docker compose up --build
```

The configured services are frontend, backend, and MongoDB.

### 11. Out of Scope

The following are outside the current product scope:

* Social login such as Google/Facebook login.
* Two-factor authentication.
* SMS-based password recovery.
* Multi-tenant organization management.
* Advanced audit logging.
* Production-grade distributed caching.
* Advanced account recovery through support staff.

### 12. Success Metrics

The product will be considered successful when:

* Users can register successfully.
* Users can log in successfully.
* Authentication tokens are issued and validated correctly.
* RBAC prevents unauthorized access.
* Forgot-password emails are delivered.
* Reset links successfully open the React reset page.
* Users can change their password using a valid reset token.
* Expired/invalid tokens cannot reset passwords.
* Frontend, backend, and MongoDB can run through Docker Compose.

### 13. Future Enhancements

Potential future improvements include:

* Two-factor authentication.
* Email verification during signup.
* Rate limiting for authentication APIs.
* Account lockout after repeated failed logins.
* Password strength validation.
* Token revocation.
* Audit logs.
* Secure HTTP-only cookie based token storage.
* Automated unit and integration testing.
* CI/CD pipeline.
* Production monitoring and logging.

### 14. Conclusion

The Full Stack Advanced Reset System provides a complete authentication and password recovery product. It combines secure password hashing, JWT authentication, RBAC, email-based password recovery, React-based reset UI, MongoDB persistence, and Docker deployment into one full-stack application.
