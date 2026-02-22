# CaptionCraft — Build Plan

> **Status**: In Progress — Phase 4 (Ship)
> **Time Budget**: ~8 hours (1 day)
> **Last Updated**: 2026-02-19
> **Concept**: Upload an image → choose a tone → Claude generates a tailored caption

---

## Phase 1: Design (Morning — ~2 hrs)

- [x] **1.1** Browse Figma community templates — find a clean, modern app template
- [x] **1.2** Duplicate and customize template for app layout:
  - Image upload area (drag-and-drop + click to browse)
  - Tone selector (dropdown or pill buttons)
  - Caption output area
  - Session history (recent captions)
  - Mobile responsive layout
- [x] **1.3** Finalize color palette, typography, and spacing
- [x] **1.4** Make Figma file public and save link
- [x] **1.5** Share Figma API token + file URL for dev reference

---

## Phase 2: Backend (Midday — ~2 hrs)

- [x] **2.1** Scaffold FastAPI project (project structure, requirements, .env setup)
- [x] **2.2** Create `/api/caption` endpoint (accepts image + tone, returns caption)
- [x] **2.3** Integrate Anthropic SDK — vision API for image analysis + caption generation
- [x] **2.4** Prompt engineering — tone-aware caption generation (casual, professional, witty, etc.)
- [x] **2.5** Add CORS config for frontend origin
- [x] **2.6** Add basic rate limiting (minimal — per-session throttle)
- [x] **2.7** Add error handling (invalid files, oversized images, API failures)
- [x] **2.8** Local test — verify caption generation works via curl/Postman

---

## Phase 3: Frontend (Afternoon — ~2.5 hrs)

- [x] **3.1** Scaffold React + Tailwind project (Vite)
- [x] **3.2** Build image upload component (drag-and-drop + file picker) — match Figma
- [x] **3.3** Build tone selector component (pill buttons or dropdown)
- [x] **3.4** Build caption output component — display generated caption with copy button
- [x] **3.5** Build session history component — local storage, recent captions with thumbnails
- [x] **3.6** Connect to backend API — handle loading states, errors
- [x] **3.7** Match Figma design — colors, typography, spacing, layout

---

## Phase 4: Ship (Evening — ~1.5 hrs)

- [x] **4.1** Final visual polish — skipped (user approved as-is)
- [x] **4.2** Deploy backend to Railway — https://captioncraft-production.up.railway.app
- [x] **4.3** Deploy frontend to Vercel — https://captioncrafting.vercel.app
- [x] **4.4** Verify live app works end-to-end
- [x] **4.5** Write README:
  - Project description
  - Screenshots of the app
  - Live demo link
  - Public Figma design link
  - "Built with Claude" badge
  - Local setup instructions
- [ ] **4.6** Final commit with clean history

---

## Tone Options (for caption generation)

| Tone | Description | Example |
|------|-------------|---------|
| Casual | Friendly, conversational | "Just another sunset that made me stop and stare" |
| Professional | Polished, LinkedIn-ready | "Golden hour at the waterfront — a reminder to pause and appreciate the moment" |
| Witty | Clever, humorous | "The sky really said 'hold my beer' tonight" |
| Poetic | Lyrical, evocative | "The horizon bled amber and rose, as day surrendered to the gentle arms of dusk" |
| Instagram | Hashtag-friendly, trendy | "Chasing golden hours ✨ #sunset #vibes #nofilter" |

---

## Key Decisions Made

| Decision | Choice | Reason |
|----------|--------|--------|
| App name | CaptionCraft | Clean, descriptive, memorable |
| Concept | Image upload → tone selection → AI caption | Simple, fun, demonstrable |
| Backend | FastAPI | Modern, async, CV-friendly |
| Frontend | React + Tailwind | Strong CV signal, Figma-to-code workflow |
| AI feature | Claude Vision API | Native image analysis, no extra services needed |
| Design | Figma community template → customize | Saves time, shows design process |
| Figma in portfolio | Yes — public link in README | Shows design-to-code story |
| Figma reference | Via Figma API token | Pull design data programmatically during build |
| Deployment | Vercel + Railway | Free tier, auto-deploy, simple |
| State | Local storage | No database needed, keeps scope tight |
| Rate limiting | Minimal — basic per-session throttle | Protects API key without overengineering |
| File types | Images only (JPG, PNG, WebP) | Keeps scope tight for 1-day build |
| Caption style | User selects tone from options | Customizable output, simple UX |

---

## Rules

- **Do NOT update checkboxes without user approval**
- This file is the single source of truth for progress
- Each step is checked off only when user confirms completion
