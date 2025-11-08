# Deployment Guide for Vercel

This guide will walk you through deploying both the backend and frontend to Vercel.

## Prerequisites

1. **Vercel Account** - Sign up at https://vercel.com
2. **MongoDB Atlas** - Create a free cluster at https://www.mongodb.com/cloud/atlas
3. **Git Repository** (optional) - Push your code to GitHub for easier deployment

## Step 1: Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and create an account
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `myFirstDatabase` with `linkedin-clone`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/linkedin-clone?retryWrites=true&w=majority
```

## Step 2: Deploy Backend to Vercel

### Option A: Using Vercel CLI

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Navigate to backend and deploy:**
   ```bash
   cd backend
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? Choose your account
   - Link to existing project? `N`
   - Project name? `linkedin-clone-backend` (or your choice)
   - Directory? `./`
   - Override settings? `N`

5. **Add Environment Variables:**
   
   After first deployment, go to your project dashboard or use CLI:
   ```bash
   vercel env add MONGODB_URI
   # Paste your MongoDB Atlas connection string
   
   vercel env add JWT_SECRET
   # Enter a secure random string (e.g., generated from: openssl rand -base64 32)
   
   vercel env add NODE_ENV
   # Enter: production
   ```

6. **Redeploy with environment variables:**
   ```bash
   vercel --prod
   ```

7. **Copy your backend URL** (e.g., `https://linkedin-clone-backend.vercel.app`)

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your Git repository
4. Select the `backend` directory
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string
   - `NODE_ENV`: production
6. Click "Deploy"
7. Copy your backend URL

## Step 3: Deploy Frontend to Vercel

### Option A: Using Vercel CLI

1. **Navigate to frontend and deploy:**
   ```bash
   cd ../frontend
   vercel
   ```

2. **Follow the prompts:**
   - Set up and deploy? `Y`
   - Which scope? Choose your account
   - Link to existing project? `N`
   - Project name? `linkedin-clone-frontend` (or your choice)
   - Directory? `./`
   - Override settings? `N`

3. **Add Environment Variable:**
   ```bash
   vercel env add VITE_API_URL
   # Enter your backend URL + /api
   # Example: https://linkedin-clone-backend.vercel.app/api
   ```

4. **Redeploy with environment variable:**
   ```bash
   vercel --prod
   ```

5. **Your frontend is now live!** Visit the provided URL

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your Git repository
4. Select the `frontend` directory
5. Add environment variable:
   - `VITE_API_URL`: `https://your-backend-url.vercel.app/api`
6. Click "Deploy"
7. Your frontend is now live!

## Step 4: Test Your Deployment

1. Visit your frontend URL
2. Click "Sign up"
3. Create a new account
4. Create a post
5. Test like, comment, edit, delete features
6. Check your profile page

## Troubleshooting

### Backend Issues

**Problem:** "Cannot connect to database"
- **Solution:** Check MongoDB Atlas connection string in environment variables
- Make sure to whitelist all IPs (0.0.0.0/0) in MongoDB Atlas Network Access

**Problem:** "JWT malformed"
- **Solution:** Ensure JWT_SECRET is set in environment variables

### Frontend Issues

**Problem:** "Network Error" when trying to login/register
- **Solution:** Check VITE_API_URL environment variable
- Make sure it includes `/api` at the end
- Verify backend is deployed and running

**Problem:** 404 on page refresh
- **Solution:** The `vercel.json` should handle this, but verify it's present in frontend directory

### General Issues

**Problem:** Environment variables not working
- **Solution:** Redeploy after adding environment variables
- Use `vercel --prod` to deploy to production

**Problem:** CORS errors
- **Solution:** The backend already has CORS enabled, but make sure frontend URL is correct

## Production Checklist

- ✅ MongoDB Atlas cluster created
- ✅ Database user created with password
- ✅ Network access allows all IPs (0.0.0.0/0)
- ✅ Backend deployed to Vercel
- ✅ Backend environment variables set (MONGODB_URI, JWT_SECRET, NODE_ENV)
- ✅ Frontend deployed to Vercel
- ✅ Frontend environment variable set (VITE_API_URL)
- ✅ Test registration and login
- ✅ Test creating posts
- ✅ Test all features (like, comment, edit, delete)

## Updating Your Deployment

### Update Backend:
```bash
cd backend
git add .
git commit -m "Update backend"
git push
# Or use: vercel --prod
```

### Update Frontend:
```bash
cd frontend
git add .
git commit -m "Update frontend"
git push
# Or use: vercel --prod
```

## Useful Vercel Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-url]

# Add environment variable
vercel env add [name]

# List environment variables
vercel env ls
```

## Environment Variables Reference

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/linkedin-clone
JWT_SECRET=your_super_secret_random_string_here
NODE_ENV=production
```

### Frontend (.env.local for production)
```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

## Security Best Practices

1. **Never commit `.env` files** to Git
2. **Use strong JWT secret** (minimum 32 characters)
3. **Use strong database password**
4. **Whitelist only necessary IPs** in MongoDB Atlas (or 0.0.0.0/0 for Vercel)
5. **Regularly rotate secrets**

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com
- Check deployment logs in Vercel dashboard
- Review the troubleshooting section above

---

**Congratulations!** Your LinkedIn Clone is now live on Vercel! 🎉

Share your project:
- Frontend URL: [Your Vercel Frontend URL]
- Backend API: [Your Vercel Backend URL]
- GitHub Repository: [Your GitHub Repo URL]
