# PTA Website

A cinematic Next.js website that plays audio and displays a sequence of text followed by an image.

## Features

- Pitch black background
- Audio playback of `youtube_B6mF6fc0tYU_audio.mp3`
- Sequential text display with gentle fade-in effects
- Image display after text sequence completes

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## How it works

1. The page loads with a pitch black background
2. Audio starts playing automatically
3. Text chunks appear sequentially with fade-in effects:
   - "Once in a lifetime..."
   - "every man must look at himself in the mirror..."
   - "and ask himself..."
   - "what kind of man do I want to be..."
   - "in this choice of a lifetime..."
4. After the text sequence, the screenshot image appears

Each text chunk is displayed for 3 seconds with smooth transitions.
