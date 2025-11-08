# Backend - LinkedIn Clone API

RESTful API for LinkedIn Clone social media application.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your credentials:
   - MongoDB URI (use MongoDB Atlas for production)
   - JWT Secret (generate a secure random string)

4. Run development server:
   ```bash
   npm run dev
   ```

## Environment Variables

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

## API Routes

- **Auth**: `/api/auth` - Register, login, get current user
- **Posts**: `/api/posts` - CRUD operations, like, comment
- **Users**: `/api/users` - Profile management

## Deployment

Deploy to Vercel:
```bash
vercel
```

Set environment variables in Vercel dashboard before deployment.
