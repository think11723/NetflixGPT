# AI Movie Concierge - Visual & Technical Guide

## 🎨 Visual Layout

### Floating Button (Always Visible)

```
┌────────────────────────────────────────────────────────────┐
│                                                              │
│  Browse Page Content                                        │
│                                                              │
│                                                              │
│                                                    ┌─────┐   │
│                                                    │  AI │   │
│                                                    │ 🔴  │   │
│                                                    └─────┘   │
│                                                   24px 24px  │
└────────────────────────────────────────────────────────────┘
```

**Properties:**
- Position: Fixed, bottom-right
- Size: 64×64px (w-16 h-16)
- Color: Netflix Red (#e50914)
- Icon: AI Face
- Animation: Pulse + Hover Scale

---

### Chat Modal (When Open)

```
┌──────────────────────────────────────────┐
│ 🤖 Netflix AI              [−] [✕]      │  ← Header
│ Ask me for movie recommendations        │
├──────────────────────────────────────────┤
│                                          │
│ Hi 👋                                   │
│                                          │
│ I'm your Netflix AI assistant...        │  ← Welcome
│                                          │
│                                          │
│ 👤 What sci-fi movie do you recommend? │  ← User message
│                                          │
│ 🤖 Here are great sci-fi movies:      │  ← AI message
│                                          │
│ [Inception] [Dune] [Martian]           │  ← Movie cards
│ [Interstellar] [Blade Runner]          │
│                                          │
│ ┌─────────────────────────────────────┐ │
│ │ What kind of movie...?          [→] │ │  ← Input
│ ├─────────────────────────────────────┤ │
│ │ Enter to send · Shift+Enter newline │ │
│ └─────────────────────────────────────┘ │
│                                          │
│ Clear conversation                      │
├──────────────────────────────────────────┤
```

**Dimensions:**
- Desktop: 420×650px
- Tablet: 90vw × responsive
- Mobile: 95vw × 80vh max

**Colors:**
- Background: #1f1f1f (dark gray)
- Border: #333 (darker)
- Messages: Red (user), #333 (AI)
- Text: White, #999 (secondary)

---

### Message Types

#### User Message
```
                                    ┌─────────────────────────┐
                                    │ What sci-fi movies... ? │
                                    └─────────────────────────┘
                                               👤
```
- Alignment: Right
- Background: Netflix Red (#e50914)
- Text: White
- Avatar: User icon

#### Assistant Message
```
┌─────────────────────────────────────┐
│ Here are great sci-fi movies...    │
└─────────────────────────────────────┘
         🤖
```
- Alignment: Left
- Background: Dark gray (#333)
- Text: Light gray
- Avatar: AI icon

---

### Movie Card

```
┌────────────────┐
│                │
│   [Poster]     │  ← Movie poster image
│                │
├────────────────┤
│ Inception      │  ← Title
│ 2010  ⭐ 8.8   │  ← Year & Rating
│ Sci-Fi         │  ← Genre
│                │
│ A mind-bending │  ← Overview (clipped)
│ thriller about │
│ corporate...   │
│                │
│ "Deep sci-fi"  │  ← Reason from GPT
└────────────────┘

Hover: Scale 1.08x, brightness 1.1x, shadow
```

**Card Dimensions:**
- Width: 160px (w-40)
- Height: Variable
- Border Radius: 8px
- Scroll: Horizontal

---

## 🔄 Data Flow Diagram

```
┌─────────────────┐
│  User Types     │
│  Question       │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│  ChatInput Component        │
│  Enter key pressed          │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  useAIChat Hook             │
│  - ADD_MESSAGE (user)       │
│  - SET_LOADING (true)       │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  OpenAI API Call            │
│  services/openai.js         │
│  - Send user message        │
│  - Include conversation     │
│  - Get GPT response         │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  Parse Response             │
│  services/tmdbSearch.js     │
│  - Extract movie names      │
│  - Extract genres/years     │
│  - Extract reasons          │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  TMDB Search Loop           │
│  For each movie:            │
│  - Search by name           │
│  - Get poster               │
│  - Get rating               │
│  - Get overview             │
│  - 100ms delay between      │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  Combine Data               │
│  - GPT text + TMDB data     │
│  - ADD_MOVIES_TO_MESSAGE    │
│  - SET_LOADING (false)      │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  Render                     │
│  - AIMessage component      │
│  - MovieRecommendationCard  │
│  - Auto-scroll to bottom    │
└─────────────────────────────┘
```

---

## 🎭 State Machine

```
┌─────────────┐
│   CLOSED    │  Floating button visible
│  No Modal   │  Ready to open
└──────┬──────┘
       │ Click button
       ▼
┌─────────────┐
│   OPENING   │  Modal animate-in
│   Loading   │  Welcome shown
└──────┬──────┘
       │ Animation complete
       ▼
┌─────────────┐
│    OPEN     │  Chat ready
│   Ready     │  Accept input
└──────┬──────┘
       ├─ User sends message
       │  ├─ SET_LOADING=true
       │  │  └─ Call OpenAI
       │  │     ├─ SET_LOADING=false
       │  │     ├─ ADD_MESSAGE
       │  │     └─ Search TMDB
       │  │
       │  └─ Display message & cards
       │
       ├─ Click X button
       │  └─ Close animation
       │
       └─ Press ESC
          └─ Close animation
             ▼
           CLOSED
```

---

## 💾 Message Object Structure

```javascript
{
  id: "msg_1704067200000_a1b2c3d4e5f",  // Unique ID
  
  role: "user" | "assistant",             // Message type
  
  content: "What sci-fi movies...",       // Text content
  
  timestamp: Date,                        // When created
  
  movies: [                               // (Optional)
    {
      name: "Inception",
      year: 2010,
      genre: "Sci-Fi",
      reason: "Mind-bending thriller",
      
      tmdbData: {
        id: 27205,
        title: "Inception",
        posterPath: "/path/to/poster.jpg",
        releaseDate: "2010-07-16",
        overview: "A skilled thief...",
        voteAverage: 8.8,
        voteCount: 25000,
        backdropPath: "/path/to/backdrop.jpg"
      }
    },
    // ... more movies
  ]
}
```

---

## 🎬 Component Hierarchy

```
App
├── Routes
│   ├── Layout
│   │   ├── Header
│   │   └── Outlet (Browse page)
│   └── Error page
│
└── AIChat ← New feature (always loaded)
    ├── Suspense
    │   └── FloatingButton (lazy loaded)
    │
    ├── Modal Backdrop (conditional)
    │
    └── Modal Container (conditional)
        ├── Header
        │   ├── AI Icon
        │   ├── Title & Subtitle
        │   └── Close Button
        │
        ├── Messages Container
        │   ├── Welcome Message (initial)
        │   │
        │   └── Messages Loop
        │       └── For each message
        │           ├── AIMessage
        │           │   ├── Avatar
        │           │   └── Text bubble
        │           │
        │           ├── TypingIndicator (if loading)
        │           │
        │           └── Movie Cards (if assistant)
        │               └── MovieRecommendationCard (loop)
        │
        └── ChatInput
            ├── Textarea (auto-resizing)
            └── Send Button
```

---

## 🔐 Security Architecture

```
┌──────────────────────────────────────────┐
│  .env (Local - Never committed)          │
│  VITE_OPENAI_API_KEY=sk-proj-xxxxx       │
└──────────────────────────────────────────┘
         │
         │ Build time
         ▼
┌──────────────────────────────────────────┐
│  import.meta.env                         │
│  Access via Vite (compile-time)          │
└──────────────────────────────────────────┘
         │
         │ Runtime
         ▼
┌──────────────────────────────────────────┐
│  services/openai.js                      │
│  Isolated from components                │
│  Only this file accesses the key         │
└──────────────────────────────────────────┘
         │
         │ API request
         ▼
┌──────────────────────────────────────────┐
│  OpenAI API (HTTPS)                      │
│  Secure communication                    │
└──────────────────────────────────────────┘
```

---

## 📊 Performance Timeline

### First Load
```
0ms     ──────────── Page Load Starts
        - Initial bundle: main JS + CSS
        - AIChat component registered (not imported)
        - FloatingButton: DEFERRED

100ms   ──────────── React Renders Browse
        - Header
        - MainContainer
        - SecondaryContainer
        - AIChat (mounted, FloatingButton lazy)

150ms   ──────────── Floating Button Loaded
        - Suspense resolved
        - Button appears in DOM

200ms   ──────────── Page Fully Loaded ✓
        - Total impact: ~2KB gzipped
        - User can browse movies
        - AI Button ready to use
```

### User Opens Chat
```
0ms     ──────────── Click AI Button
200ms   ──────────── Modal opens (animation)
        - Welcome message shown
        - Input focused
        - Ready for input

500ms   ──────────── User types & enters
        - Message added to chat
        - API call begins

2-5s    ──────────── GPT Response
        - Message added to chat
        - Movie names parsed
        - TMDB searches begin

6-8s    ──────────── All data loaded
        - Movie cards rendered
        - Auto-scroll to latest
        - Chat ready for next message
```

---

## 🎯 Error Scenarios & Handling

### Scenario 1: Missing API Key
```
Component Mount
  └─ getMovieRecommendations() called
     └─ VITE_OPENAI_API_KEY check
        └─ If not found:
           └─ throw Error("API key not configured...")
              └─ Caught by useAIChat
                 └─ SET_ERROR action
                    └─ User sees: "Error message"
                    └─ Retry button shown
```

### Scenario 2: Network Error
```
User sends message
  └─ fetch() to OpenAI
     └─ Network fails
        └─ Caught in try/catch
           └─ SET_ERROR action
              └─ User sees: "Failed to get recommendations"
              └─ Retry button enabled
              └─ retryMessage stored
```

### Scenario 3: Movie Not Found on TMDB
```
searchMovieOnTMDB("Some Fictional Movie")
  └─ TMDB API returns results: []
     └─ Return null
        └─ Movie skipped in display
           └─ Next movie displayed instead
              └─ User sees: Only real movies
```

### Scenario 4: User Closes Chat During Request
```
Fetch to OpenAI in progress
  └─ User clicks close button
     └─ Modal closes
        └─ cancelRequest() called
           └─ abortController.abort()
              └─ Fetch cancelled
                 └─ No orphaned requests
                    └─ Memory cleaned up
```

---

## 📈 API Rate Limiting Strategy

### OpenAI (GPT-3.5 Turbo)
```
Per Request:
- Input: ~150 tokens
- Output: ~300 tokens
- Total: ~450 tokens

Cost Calculation:
- Input: $0.50 per 1M tokens → $0.000075 per request
- Output: $1.50 per 1M tokens → $0.00045 per request
- Total per request: ~$0.00053

Monthly (100 requests):
- Cost: ~$0.053 (very cheap!)
```

### TMDB Search
```
Per Recommendation:
- 1 search per movie
- 5-10 movies per recommendation
- ~5-10 searches per user message

Free tier: No rate limiting
Premium tier: 40 requests per second
```

### Combined
```
User workflow:
1. Send 1 message → 1 OpenAI call (450 tokens)
2. Get recommendations → 5-10 TMDB searches
3. Total time: 2-8 seconds
4. Cost: ~$0.0005 per recommendation

Per user per session:
- Average: 5 messages
- Cost: ~$0.0025
- Time: ~30 seconds
```

---

## 🎨 CSS Custom Properties

```css
:root {
  --netflix-red: #e50914;
  --netflix-black: #000000;
  --netflix-dark-gray: #141414;
  --netflix-light-gray: #808080;
  --netflix-white: #ffffff;
}

/* Applied in components */
.floating-button { background-color: var(--netflix-red); }
.modal { background-color: var(--netflix-dark-gray); }
.user-message { background-color: var(--netflix-red); }
.assistant-message { background-color: #333; }
.text-primary { color: var(--netflix-white); }
.text-secondary { color: #999; }
```

---

## 🎬 Animation Keyframes

```css
@keyframes fadeIn {
  0%   { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
/* Duration: 300ms, used for messages */

@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.7; }
}
/* Duration: 2s, used for floating button */

@keyframes scaleIn {
  0%   { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
/* Duration: 300ms, used for modal open */

@keyframes fadeInUp {
  0%   { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
/* Duration: 300ms, used for modal content */
```

---

## 📱 Responsive Breakpoints

```
Mobile (320px - 640px)
├─ Modal width: 95vw
├─ Modal height: 80vh
├─ Button text: hidden (icon only)
├─ Font sizes: sm
└─ Card width: w-24

Tablet (640px - 1024px)
├─ Modal width: 90vw
├─ Modal height: auto
├─ Button text: visible
├─ Font sizes: base
└─ Card width: w-28

Desktop (1024px+)
├─ Modal width: 420px (fixed)
├─ Modal height: 650px (fixed)
├─ Button text: visible
├─ Font sizes: base/lg
└─ Card width: w-36-44
```

---

**Visual Guide Complete! 🎨**
