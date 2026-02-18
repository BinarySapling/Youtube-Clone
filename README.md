# VidStream

A modern video streaming platform built with React and Tailwind CSS.

## Features

- Browse trending videos
- Search functionality  
- Responsive design
- Dark theme with violet accents
- Watch videos with recommendations
- Watch History with localStorage
- Infinite scroll (100 videos limit)
- Upload and Profile pages

## Tech Stack

- React 18
- Vite
- React Router
- Tailwind CSS
- Axios
- YouTube Data API v3
- Vercel Serverless Functions

## Setup

1. Install dependencies
```bash
npm install
```

2. Create a `.env` file with your YouTube API key
```
VITE_YOUTUBE_API_KEY=your_api_key_here
```

3. Start development server
```bash
npm run dev
```

## Deployment to Vercel

The app includes serverless API functions for production deployment to keep your API key secure.

**For Local Development:**
- The app uses direct YouTube API calls (requires `.env` file with API key)

**For Production (Vercel):**
1. Push your code to GitHub

2. Import project in Vercel

3. Add environment variable in Vercel:
   - Key: `VITE_YOUTUBE_API_KEY`
   - Value: Your YouTube API key

4. Deploy

Note: The serverless function in `/api/youtube.js` will automatically be used in production to hide your API key from the client bundle.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

