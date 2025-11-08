# Cloudinary Setup Guide

## 🌟 Get Your FREE Cloudinary Account (5 minutes)

### Step 1: Sign Up
1. Go to: https://cloudinary.com/users/register/free
2. Sign up with Google or Email (FREE forever - 25GB storage)
3. Verify your email

### Step 2: Get Your Credentials
1. After login, you'll see the **Dashboard**
2. Copy these 3 values:

```
Cloud Name: ____________
API Key: ____________
API Secret: ____________ (click "eye" icon to reveal)
```

### Step 3: Update Backend .env
Open `backend/.env` and add:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Replace** with your actual values from Cloudinary dashboard!

### Step 4: Update Vercel Environment Variables
1. Go to: https://vercel.com/ekas-projects-1b81afd8/linkedin-clone-sigma-beige (your backend)
2. Click **Settings** → **Environment Variables**
3. Add these 3 new variables:

```
CLOUDINARY_CLOUD_NAME = (your cloud name)
CLOUDINARY_API_KEY = (your api key)
CLOUDINARY_API_SECRET = (your api secret)
```

4. Click **"Redeploy"** in Deployments tab

---

## ✅ What Image Upload Can Do Now:

### Profile Photos:
- **Upload**: `POST /api/users/profile-photo` (with form-data: image)
- **Auto-resizes** to optimal size
- **Stored** in `linkedin-clone/profiles` folder

### Banner Photos:
- **Upload**: `POST /api/users/banner-photo` (with form-data: image)
- **Stored** in `linkedin-clone/banners` folder

### Post Images (coming next):
- **Upload**: `POST /api/posts` (with image field)
- **Stored** in `linkedin-clone/posts` folder

---

## 🧪 Test Image Upload (After Setup):

### Using curl:
```bash
# Upload profile photo
curl -X POST https://linkedin-clone-sigma-beige.vercel.app/api/users/profile-photo \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "image=@/path/to/your/photo.jpg"

# Upload banner photo
curl -X POST https://linkedin-clone-sigma-beige.vercel.app/api/users/banner-photo \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "image=@/path/to/your/banner.jpg"
```

---

## 📊 Cloudinary Free Tier Limits:

- ✅ **25GB Storage** (thousands of images)
- ✅ **25GB Bandwidth/month** (plenty for demo)
- ✅ **Auto Image Optimization**
- ✅ **CDN Delivery** (fast worldwide)
- ✅ **Free SSL**

**Perfect for your internship project!** 🎉

---

## 🚀 Next Steps:

After Cloudinary setup:
1. Test profile photo upload locally
2. Build frontend upload UI
3. Deploy and test in production

---

## ⚠️ Important Notes:

- **Never commit** `.env` file to GitHub (already in .gitignore)
- **Always use** Vercel environment variables for production
- **Free tier** is enough for demo + 1000s of users
- **Images are public** by default (good for social media)

---

Need help? Let me know once you have your Cloudinary credentials! 🎨
