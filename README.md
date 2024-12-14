
# WSD-Assignment-03: Saramin Job Posting Backend

## Project Description
This project implements a backend server to scrape job postings from Saramin, store them in MongoDB, and provide RESTful APIs for job management. It includes JWT-based authentication and is documented with Swagger.

## Features
- Web scraping to collect job postings
- MongoDB database for storing job data
- REST API for job posting management, user authentication, and job applications
- JWT-based authentication for secure access
- API documentation using Swagger
- Cloud deployment on JCloud

---

## Installation and Setup

### 1. Prerequisites
- Node.js (v16 or above)
- MongoDB (running locally or cloud-based)
- npm or yarn package manager

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root with the following content:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/job-management
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the Server
```bash
npm start
```
The server will run at `http://localhost:3000`.

### 5. Access Swagger API Documentation
Visit the following URL for API documentation:
```
http://localhost:3000/api-docs
```

---

## File Structure
```plaintext
project/
├── src/
│   ├── app.js                 # Main entry point for the application
│   ├── swagger.js             # Swagger configuration
│   ├── routes/                # REST API routes
│   │   ├── auth.js            # User authentication routes
│   │   ├── jobs.js            # Job posting routes
│   │   ├── applications.js    # Job application routes
│   │   ├── bookmarks.js       # Bookmark routes
│   ├── models/                # MongoDB models
│   │   ├── User.js            # User model
│   │   ├── Job.js             # Job model
│   │   ├── Application.js     # Application model
│   │   ├── Bookmark.js        # Bookmark model
├── package.json               # Node.js dependencies and scripts
├── .env                       # Environment configuration
├── README.md                  # Project documentation
```

---

## REST API Endpoints

### Authentication (`/auth`)
| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | `/auth/register` | Register a new user     |
| POST   | `/auth/login`    | Login and get JWT token |

### Job Postings (`/jobs`)
| Method | Endpoint       | Description                 |
|--------|----------------|-----------------------------|
| GET    | `/jobs`         | Get all job postings       |
| GET    | `/jobs/:id`     | Get a specific job posting |
| POST   | `/jobs`         | Add a new job posting      |
| PUT    | `/jobs/:id`     | Update a job posting       |
| DELETE | `/jobs/:id`     | Delete a job posting       |

### Applications (`/applications`)
| Method | Endpoint       | Description                     |
|--------|----------------|---------------------------------|
| POST   | `/applications` | Submit a job application       |
| GET    | `/applications` | Get all applications by user   |
| DELETE | `/applications/:id` | Cancel an application       |

### Bookmarks (`/bookmarks`)
| Method | Endpoint       | Description               |
|--------|----------------|---------------------------|
| POST   | `/bookmarks`    | Add or remove a bookmark |
| GET    | `/bookmarks`    | Get all bookmarks by user|

---

## Deployment
This project can be deployed on JCloud or any cloud provider. For JCloud deployment:
1. Transfer project files to JCloud:
   ```bash
   scp -r . ubuntu@<your-jcloud-ip>:/home/ubuntu/project
   ```
2. SSH into the server:
   ```bash
   ssh ubuntu@<your-jcloud-ip>
   ```
3. Install dependencies and start the server:
   ```bash
   npm install
   nohup npm start > server.log 2>&1 &
   ```

---

## Development Notes
- Ensure MongoDB is running locally or via a cloud provider (e.g., MongoDB Atlas).
- Use `nodemon` during development for automatic server restarts:
  ```bash
  npm run dev
  ```

---

## Example API Request
### Register a User
```http
POST /auth/register
Content-Type: application/json

{
    "email": "test@example.com",
    "password": "securepassword"
}
```

### Swagger Documentation
You can access Swagger documentation at:
```
http://113.198.66.75:3000/api-docs
```

---

## Resources
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Swagger](https://swagger.io/)

---

## Author
- Name: Hyemin Youn
- Email: hyemin9973@gmail.com
- Class: WSD-2분반
- Assignment: 3차 과제
