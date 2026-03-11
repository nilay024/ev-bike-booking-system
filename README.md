# EV Bike Booking System (Node.js)

A RESTful backend API for a simple **Electric Bike Test Ride / Booking System**.
Users can register, login, browse bikes, and book test rides.
Admins can view all bookings and update booking status.

---

## Features

- **User Authentication** (JWT-based)
  - Register
  - Login
  - Password hashing
- **Bike Management**
  - List all bikes
  - Get bike details
- **Test Ride Booking**
  - Book a test ride
  - Prevent double booking
  - Optional: prevent a user from booking multiple bikes at the same time
- **Admin Features**
  - View all bookings
  - Update booking status (Pending / Confirmed / Cancelled / Completed)
- **Validation**
  - Request body validation with Joi
  - Standard success and error response format
- **Seed Data**
  - Default bikes
  - Super admin user

---

## Tech Stack

- **Node.js** (latest LTS)
- **Express.js**
- **MongoDB** (Mongoose)
- **JWT** for authentication
- **Joi** for request validation
- **bcrypt** for password hashing

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/nilayy024/ev-bike-booking-system.git
cd ev-bike-booking-system
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a .env file from .env.example in the root folder:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/ev-bike-db
JWT_SECRET=your_jwt_secret_here
```

4. **Seed default data**

Run the seed script to insert default bikes and a super admin user:

```bash
npm run seed
```

**Default admin credentials:**

- Email: admin@test.com
- Password: Admin@123

5. **Start the server**

```bash
npm run dev
```

Server will start on http://localhost:5000

---

## Note

- All protected routes require JWT token in the Authorization header:

```bash
Authorization: Bearer <your_token>
```

**Booking validation prevents:**

- Double booking of the same bike at the same time.
- Optional: multiple bikes booked by the same user at the same date/time(allowMultipleBikesPerUser = false in controller).
- Standard success and error responses are provided via utils/response.js

---

## Postman Collection

- Import the Postman collection provided in the project for testing all APIs.(added in the repository with name of **"EV Bike Booking API.postman_collection.json"**)

**Replace placeholders:**

- {{token}} → JWT received after login
- {{bikeId}} → Bike \_id from DB
- {{bookingId}} → Booking \_id from DB

---
