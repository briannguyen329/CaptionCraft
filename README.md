# CaptionCraft

Upload an image, pick a tone, get the perfect caption — powered by Claude.

**[Live Demo](https://captioncrafting.vercel.app)** | **[Figma Design](https://www.figma.com/design/QWUcw92tRDhWoc6tHOmIM6/File-Uploader---Drop-Zone--Community-)**

![Built with Claude](https://img.shields.io/badge/Built%20with-Claude-blueviolet)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Styles-Tailwind%20CSS-38B2AC)

---

## What It Does

CaptionCraft takes any image and generates a tailored caption based on your chosen tone:

| Tone | Style |
|------|-------|
| Casual | Friendly, conversational |
| Professional | Polished, LinkedIn-ready |
| Witty | Clever, humorous |
| Poetic | Lyrical, evocative |
| Instagram | Hashtag-friendly, trendy |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React + Tailwind CSS (Vite) |
| **Backend** | FastAPI (Python) |
| **AI** | Claude Vision API (Anthropic SDK) |
| **Design** | Figma (community template, customized) |
| **Hosting** | Vercel (frontend) + Railway (backend) |

## How It Was Built

This project was designed and built in a single day using **Claude** as both:

1. **Development partner** — Claude Code assisted with scaffolding, architecture decisions, and implementation
2. **Core feature** — Claude's Vision API analyzes uploaded images and generates tone-aware captions

The design was driven by a Figma template, with design tokens (colors, typography, spacing) extracted via the Figma API and translated into Tailwind CSS.

## Local Setup

### Prerequisites

- Python 3.10+
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com)

### Backend

```bash
cd captioncraft/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# Run
uvicorn app.main:app --port 8000
```

### Frontend

```bash
cd captioncraft/frontend
npm install
npm run dev
```

Open **http://localhost:5173** — the Vite dev server proxies API requests to the backend automatically.

## Project Structure

```
captioncraft/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app, endpoints, CORS, rate limiting
│   │   ├── caption.py       # Claude Vision API integration
│   │   ├── prompts.py       # Tone-specific prompt engineering
│   │   └── config.py        # Environment config
│   ├── requirements.txt
│   └── Procfile              # Railway deployment
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main app with state management
│   │   └── components/
│   │       ├── ImageUploader.jsx   # Drag-and-drop + file picker
│   │       ├── ToneSelector.jsx    # Tone pill buttons
│   │       ├── CaptionOutput.jsx   # Caption display + copy
│   │       └── History.jsx         # Session history (local storage)
│   ├── index.html
│   └── vite.config.js
└── figma_exports/            # Design reference images
```

## License

MIT
