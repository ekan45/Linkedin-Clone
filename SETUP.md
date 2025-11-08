# Quick Setup Guide

## Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

## Step 2: Setup MongoDB

### Option A: Local MongoDB
Install MongoDB locally and it will run on `mongodb://localhost:27017`

### Option B: MongoDB Atlas (Recommended for Production)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `backend/.env` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/linkedin-clone
   ```

## Step 3: Start Backend

```bash
cd backend
npm run dev
```

Backend will run on http://localhost:5000

## Step 4: Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

## Step 5: Start Frontend

```bash
cd frontend
npm run dev
```

Frontend will run on http://localhost:5173

## Step 6: Test the Application

1. Open http://localhost:5173 in your browser
2. Click "Sign up" to create a new account
3. Fill in your name, email, and password
4. After registration, you'll be logged in automatically
5. Create your first post!

## Deployment to Vercel

### Deploy Backend:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy backend:
   ```bash
   cd backend
   vercel
   ```

4. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Add: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`

### Deploy Frontend:

1. Deploy frontend:
   ```bash
   cd frontend
   vercel
   ```

2. Add environment variable in Vercel dashboard:
   - `VITE_API_URL` = `https://your-backend-url.vercel.app/api`

3. Redeploy after setting environment variable:
   ```bash
   vercel --prod
   ```

## Troubleshooting

### Backend won't start
- Make sure MongoDB is running (local) or connection string is correct (Atlas)
- Check if port 5000 is available

### Frontend can't connect to backend
- Make sure backend is running on port 5000
- Check `.env.local` has correct API URL

### Posts not showing
- Make sure you're logged in
- Check browser console for errors
- Verify backend is running

## Need Help?

- Check the main README.md for detailed documentation
- Review API endpoints in backend/README.md
- Frontend documentation in frontend/README.md
