# LinkedIn Clone - Full Stack Social Media App

A modern, full-stack social media application inspired by LinkedIn, built with React.js, Node.js, Express.js, and MongoDB. This project demonstrates advanced web development skills with a beautiful, responsive UI using Tailwind CSS and Vite.

## 🚀 Live Demo

- **Frontend**: [Your Vercel Frontend URL]
- **Backend API**: [Your Vercel Backend URL]

## ✨ Features

### Core Features
- ✅ **User Authentication**
  - Register with name, email, and password
  - Secure login with JWT tokens
  - Protected routes and authentication middleware
  - Persistent sessions

- ✅ **Post Management**
  - Create posts with text content
  - Add optional images to posts (via URL)
  - View all posts from users in a feed
  - Posts sorted by latest first
  - Display post metadata (author name, timestamp)

### Bonus Features
- ✅ **Like System**
  - Like/Unlike posts
  - Real-time like count
  - Visual indication of liked posts

- ✅ **Comment System**
  - Add comments to any post
  - View all comments on a post
  - Display commenter name and timestamp

- ✅ **Edit & Delete Posts**
  - Users can edit their own posts
  - Users can delete their own posts
  - Confirmation dialog for deletions

- ✅ **User Profiles**
  - View any user's profile
  - Edit your own profile
  - Update name, bio, and profile image
  - Beautiful profile UI with gradient header

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Next-generation build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

## 📁 Project Structure

```
ekuun/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── postController.js     # Post CRUD operations
│   │   └── userController.js     # User profile management
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Post.js               # Post schema with comments
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── posts.js              # Post routes
│   │   └── users.js              # User routes
│   ├── utils/
│   │   └── generateToken.js      # JWT token generation
│   ├── .env.example              # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   ├── server.js                 # Entry point
│   └── vercel.json               # Vercel deployment config
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── CreatePost.jsx    # Post creation component
    │   │   ├── Navbar.jsx        # Navigation bar
    │   │   ├── PostCard.jsx      # Post display component
    │   │   └── PrivateRoute.jsx  # Route protection
    │   ├── context/
    │   │   └── AuthContext.jsx   # Authentication context
    │   ├── pages/
    │   │   ├── Home.jsx          # Feed page
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Profile.jsx       # User profile page
    │   │   └── Register.jsx      # Registration page
    │   ├── utils/
    │   │   └── api.js            # Axios configuration
    │   ├── App.jsx               # Main app component
    │   ├── index.css             # Global styles
    │   └── main.jsx              # Entry point
    ├── .env.example
    ├── .env.local
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vercel.json
    └── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd ekuun
   ```

2. **Set up Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Backend Environment**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your MongoDB URI and JWT secret:
     ```env
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_super_secret_jwt_key
     NODE_ENV=development
     ```

4. **Set up Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Configure Frontend Environment**
   - The `.env.local` file is already set up for local development
   - For production, update `VITE_API_URL` in Vercel environment variables

### Running Locally

1. **Start Backend Server** (in `/backend` directory):
   ```bash
   npm run dev
   ```
   Backend runs on http://localhost:5000

2. **Start Frontend Dev Server** (in `/frontend` directory):
   ```bash
   npm run dev
   ```
   Frontend runs on http://localhost:5173

3. **Access the Application**
   - Open http://localhost:5173 in your browser
   - Register a new account
   - Start creating posts!

## 🌐 Deployment to Vercel

### Backend Deployment

1. **Prepare MongoDB**
   - Use MongoDB Atlas (free tier available)
   - Get your connection string

2. **Deploy Backend**
   ```bash
   cd backend
   vercel
   ```

3. **Set Environment Variables in Vercel Dashboard**
   - Go to your project settings
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A secure random string
     - `NODE_ENV`: production

### Frontend Deployment

1. **Update API URL**
   - In Vercel dashboard, add environment variable:
     - `VITE_API_URL`: Your deployed backend URL + /api
     - Example: `https://your-backend.vercel.app/api`

2. **Deploy Frontend**
   ```bash
   cd frontend
   vercel
   ```

3. **Vercel Configuration**
   - The `vercel.json` is already configured
   - It handles SPA routing properly

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Posts
- `GET /api/posts` - Get all posts (protected)
- `POST /api/posts` - Create post (protected)
- `GET /api/posts/:id` - Get single post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `PUT /api/posts/:id/like` - Like post (protected)
- `PUT /api/posts/:id/unlike` - Unlike post (protected)
- `POST /api/posts/:id/comments` - Add comment (protected)
- `DELETE /api/posts/:id/comments/:commentId` - Delete comment (protected)

### Users
- `GET /api/users/:id` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

## 🎨 UI Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern LinkedIn-inspired UI** - Clean and professional
- **Real-time Updates** - Instant feedback on interactions
- **Loading States** - Smooth loading animations
- **Error Handling** - User-friendly error messages
- **Form Validation** - Client and server-side validation

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS enabled
- Environment variables for sensitive data

## 🧪 Testing the Application

1. **Register a new account**
   - Go to the register page
   - Fill in name, email, and password
   - Submit the form

2. **Create posts**
   - After login, you'll see the home feed
   - Write a post in the text area
   - Optionally add an image URL
   - Click "Post"

3. **Interact with posts**
   - Like/unlike posts
   - Add comments
   - Edit your own posts
   - Delete your own posts

4. **View profiles**
   - Click on "Profile" in the navbar
   - Edit your profile information
   - Add a bio and profile image URL

## 📚 Learning Resources

This project demonstrates:
- Full-stack JavaScript development
- RESTful API design
- JWT authentication
- React hooks and Context API
- MongoDB database design
- Modern CSS with Tailwind
- Vercel deployment

## 🤝 Contributing

Feel free to fork this project and make improvements!

## 📄 License

MIT License - feel free to use this project for learning or portfolio purposes.

## 👨‍💻 Author

Created as a full-stack developer internship assignment.

---

**Note**: Make sure to update the MongoDB connection string and JWT secret in your environment variables before deploying to production!
