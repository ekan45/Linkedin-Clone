# Frontend - LinkedIn Clone

React + Vite frontend for LinkedIn Clone social media application.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. The `.env.local` file is already configured for local development

3. Run development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Environment Variables

For local development (`.env.local`):
```env
VITE_API_URL=http://localhost:5000/api
```

For production (set in Vercel dashboard):
```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Context API

## Deployment

Deploy to Vercel:
```bash
vercel
```

Don't forget to set the `VITE_API_URL` environment variable in Vercel dashboard!
