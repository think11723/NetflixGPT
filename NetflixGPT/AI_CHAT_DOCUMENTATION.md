# AI Movie Concierge Feature Documentation

## Overview

A premium AI-powered movie recommendation assistant integrated into your Netflix clone. The feature is always available as a floating button in the bottom-right corner and opens a beautiful chat interface when clicked.

## Features

✅ **Floating AI Button** - Netflix red, always visible, subtle pulse animation  
✅ **Chat Modal** - Modern, dark-themed chat interface with smooth animations  
✅ **Real-time Recommendations** - GPT-3.5 Turbo powered movie suggestions  
✅ **Movie Cards** - Actual TMDB data with posters, ratings, and details  
✅ **Keyboard Shortcuts** - Enter to send, Shift+Enter for newline, ESC to close  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Lazy Loading** - Chat doesn't impact initial page load  
✅ **Error Handling** - Graceful error messages with retry functionality  
✅ **Auto-scroll** - Messages automatically scroll into view  
✅ **Typing Indicator** - Shows when AI is thinking  

## Architecture

### File Structure

```
src/
├── components/
│   └── AIChat/
│       ├── AIChat.jsx                    # Main chat modal
│       ├── FloatingButton.jsx            # Floating button in corner
│       ├── ChatInput.jsx                 # Input area with send button
│       ├── AIMessage.jsx                 # Message display component
│       ├── MovieRecommendationCard.jsx   # Movie card in chat
│       └── TypingIndicator.jsx           # Loading animation
├── services/
│   ├── openai.js                        # OpenAI API integration
│   └── tmdbSearch.js                    # TMDB search & parsing
├── hooks/
│   └── useAIChat.js                     # Chat state management
├── App.jsx                              # Updated with AIChat
└── index.css                            # Added animations
```

### Data Flow

```
User Input
    ↓
ChatInput (Enter key)
    ↓
useAIChat Hook
    ↓
OpenAI API (getMovieRecommendations)
    ↓
GPT Response (movie names + reasons)
    ↓
Parse Recommendations (extractMovieNames)
    ↓
Search TMDB (searchMoviesOnTMDB)
    ↓
Combine Data
    ↓
Display Movies + Cards
    ↓
User can click cards for details
```

## Setup & Configuration

### 1. Get OpenAI API Key

1. Go to [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
2. Create a new API key
3. Copy the key (starts with `sk-proj-`)

### 2. Update .env File

```bash
# .env file (at root of NetflixGPT folder)
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**⚠️ IMPORTANT:** Never commit the .env file with your actual API key to version control.

### 3. Verify TMDB API Key

The feature uses your existing TMDB API key from `constants.js`. No additional setup needed.

## Component Details

### AIChat.jsx (Main Component)

**Purpose:** Container for the entire chat system  
**State:** Uses `useAIChat` hook for chat state  
**Behavior:**
- Shows welcome message on first open
- Lazy loads FloatingButton to avoid initial load impact
- Handles keyboard shortcuts (ESC to close)
- Displays typing indicator while loading
- Shows error state with retry button
- Auto-scrolls to latest messages

**Props:** None (self-contained)

```jsx
<AIChat />
// Renders floating button + chat modal
```

### FloatingButton.jsx

**Purpose:** Always-visible Netflix red button in bottom-right  
**Behavior:**
- Subtle pulse animation
- Scales up on hover
- Shows tooltip
- Transforms to scale-0 when chat is open

**Props:**
```jsx
<FloatingButton 
  onClick={handleOpen}      // Function to open chat
  isOpen={isOpen}           // Boolean - hide when open
/>
```

### ChatInput.jsx

**Purpose:** Input area with send button  
**Features:**
- Auto-resizing textarea
- Enter to send, Shift+Enter for newline
- Character limit feedback
- Disabled while loading
- Send button with loading animation

**Props:**
```jsx
<ChatInput
  onSend={(message) => {}}  // Called when user sends message
  isLoading={false}         // Disable input while loading
  disabled={false}          // Optional: disable input
/>
```

### AIMessage.jsx & MessageWithMovies

**Purpose:** Display chat messages  
**Features:**
- User messages (right, red) vs Assistant messages (left, gray)
- Avatar icons
- Movie cards display below assistant messages
- Typing indicator while loading
- Smooth fade-in animation

**Props:**
```jsx
<MessageWithMovies
  message={messageObj}      // { id, role, content, movies }
  isLoading={false}         // Show typing indicator
  onMovieClick={(id) => {}} // Handle card clicks
/>
```

### MovieRecommendationCard.jsx

**Purpose:** Display individual movie recommendation  
**Features:**
- Movie poster image
- Title, year, genre, rating
- Overview text
- Lazy loading for images
- Hover effects
- Click to view details (extensible)

**Props:**
```jsx
<MovieRecommendationCard
  recommendation={{          // Movie recommendation object
    name: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    reason: "Mind-bending...",
    tmdbData: { ... }        // TMDB data from API
  }}
  onMovieClick={(id, data) => {}} // Handle click
/>
```

### TypingIndicator.jsx

**Purpose:** Show loading animation  
**Features:**
- Animated bouncing dots
- Professional appearance
- Matches Netflix theme

```jsx
<TypingIndicator />
```

## Service Details

### services/openai.js

**Functions:**

```javascript
// Get movie recommendations from GPT
getMovieRecommendations(userMessage, conversationHistory)
  Returns: Promise<string>  // GPT response with movie names
  
// Format conversation for API
formatConversationHistory(messages)
  Returns: Array  // Formatted messages
```

**System Prompt:**
```
You are Netflix AI.
Your only purpose is recommending movies and TV shows.
Always recommend between 5 and 10 titles.
For every recommendation include:
  - Movie Name
  - Release Year
  - Genre
  - Very short reason
```

**Error Handling:**
- API key validation
- Network error catching
- Graceful error messages

### services/tmdbSearch.js

**Functions:**

```javascript
// Search single movie on TMDB
searchMovieOnTMDB(movieName)
  Returns: Promise<{id, title, posterPath, ...}>
  
// Search multiple movies
searchMoviesOnTMDB(movieNames)
  Returns: Promise<Array>  // Array of movie data
  
// Parse GPT response for movie names
parseMovieRecommendations(gptResponse)
  Returns: Array  // [{name, year, genre, reason}]
  
// Get poster URL
getPosterUrl(posterPath)
  Returns: string  // Full image URL
```

**Format Expected:** "Movie Name (Year) - Genre - Reason"

## Hook Details

### useAIChat()

**Purpose:** Complex chat state management with useReducer  
**State:**
```javascript
{
  messages: [],      // Array of chat messages
  loading: false,    // Currently fetching from API
  error: null,       // Error message if failed
  retryMessage: null // Message to retry
}
```

**Returns:**
```javascript
{
  messages,              // Array of messages
  loading,              // Boolean
  error,                // String or null
  retryMessage,         // String or null
  sendMessage(msg),     // Send user message
  clearChat(),          // Clear all messages
  retryLastMessage(),   // Retry failed message
  cancelRequest(),      // Cancel ongoing request
  messagesEndRef        // Ref for auto-scroll
}
```

**Message Object:**
```javascript
{
  id: "msg_1234567890_abcd",
  role: "user" | "assistant",
  content: "Some text",
  timestamp: Date,
  movies: null | Array  // Movie recommendations
}
```

## Styling & Theme

### Color Scheme
- **Netflix Red:** `#e50914` (primary action)
- **Black:** `#000000` (backgrounds)
- **Dark Gray:** `#141414` / `#1f1f1f` (sections)
- **Gray:** `#808080` / `#666666` (secondary text)
- **White:** `#ffffff` (primary text)

### Responsive Breakpoints
- **Mobile:** Full width, 95vw, max 80vh
- **Tablet:** 90vw, responsive height
- **Desktop:** 420px fixed width, 650px height

### Custom Animations
- `animate-fadeIn` - Message fade-in
- `animate-pulse` - Floating button pulse
- `animate-bounce` - Typing indicator dots

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Send message |
| `Shift + Enter` | New line in input |
| `ESC` | Close chat |

## API Rate Limits & Costs

### OpenAI (GPT-3.5 Turbo)
- Cost: ~$0.50 per 1M input tokens, ~$1.50 per 1M output tokens
- ~150 tokens per typical movie recommendation request
- Implement rate limiting in production if needed

### TMDB
- Free tier includes search functionality
- ~5 searches per recommendation (one per movie)
- No rate limiting on free tier

## Performance Optimizations

✅ **Lazy Loading:** FloatingButton loads only when needed  
✅ **Memoization:** Components optimized to prevent re-renders  
✅ **Image Lazy Loading:** Movie card posters use lazy loading  
✅ **Debouncing:** Input resizing throttled  
✅ **Abort Controllers:** Cancel requests if chat closes  
✅ **Auto-cleanup:** Event listeners removed on unmount  

## Error Handling

### Scenarios Handled

1. **Missing API Key:** Clear error message
2. **Network Error:** Retry button available
3. **Invalid Response:** Fallback UI
4. **Movie Not Found:** Graceful handling
5. **Rate Limit:** Error with explanation

### User Experience
- Error messages in red box
- Retry button appears automatically
- Chat remains open to fix error
- Loading state prevents duplicate requests

## Security Considerations

⚠️ **API Key Security:**
- Never expose API key in component code
- Use environment variables only
- Never commit `.env` file
- Rotate keys regularly
- Use Vite's `import.meta.env` for access

⚠️ **Input Validation:**
- User input sanitized
- XSS protection via React (escapes by default)
- No HTML/script injection possible

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Testing the Feature

### Quick Test

1. Set `VITE_OPENAI_API_KEY` in `.env`
2. Run `npm run dev`
3. Navigate to `/browse`
4. Click red button in bottom-right
5. Send a message like: "I want a sci-fi movie"
6. Chat responds with movie recommendations

### Example Queries to Test

```
1. "I want a sci-fi movie"
2. "Recommend a comedy for family night"
3. "Horror movies similar to Conjuring"
4. "Movies like Interstellar"
5. "Best action movies after 2020"
```

## Customization Guide

### Change Button Position

Edit `FloatingButton.jsx`:
```jsx
// Change from bottom-6 right-6 to desired position
<button className="fixed bottom-24 left-6 ...">
```

### Change Welcome Message

Edit `AIChat.jsx`:
```jsx
const WELCOME_MESSAGE = `Your custom welcome message here`;
```

### Change System Prompt

Edit `services/openai.js`:
```javascript
const SYSTEM_PROMPT = `Your custom system prompt here`;
```

### Change Chat Dimensions

Edit `AIChat.jsx`:
```jsx
className={`
  ...
  w-full sm:w-[500px]     // Change width
  h-[80vh] sm:h-[750px]   // Change height
  ...
`}
```

## Troubleshooting

### Chat Not Appearing

**Problem:** Floating button doesn't show  
**Solution:** 
1. Check `VITE_OPENAI_API_KEY` is set in `.env`
2. Verify build completed: `npm run build`
3. Check browser console for errors

### API Key Error

**Problem:** "API key not configured"  
**Solution:**
1. Add `VITE_OPENAI_API_KEY` to `.env`
2. Restart dev server: `npm run dev`
3. Refresh browser

### Movies Not Showing

**Problem:** Chat works but no movie cards appear  
**Solution:**
1. Check TMDB API in constants.js is valid
2. Verify GPT response contains movie names
3. Check browser Network tab for TMDB errors

### Slow Performance

**Problem:** Chat is slow to respond  
**Solution:**
1. Check network latency
2. Verify OpenAI API quota
3. Clear browser cache
4. Check for console errors

## Future Enhancements

Potential improvements:
- [ ] Movie click → opens in browse/details
- [ ] Conversation history persistence (localStorage)
- [ ] User preferences learning
- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Streaming responses (gradual text display)
- [ ] Rate limiting & usage tracking
- [ ] Analytics integration

## Production Deployment

### Pre-Deployment Checklist

- [ ] `VITE_OPENAI_API_KEY` set in production environment
- [ ] API key has appropriate rate limits
- [ ] Error messages are user-friendly
- [ ] Build succeeds: `npm run build`
- [ ] No console errors in production build
- [ ] Tested on mobile devices
- [ ] HTTPS enabled (required for production APIs)

### Environment Variables (Production)

Set in your deployment platform:
```
VITE_OPENAI_API_KEY=sk-proj-...
VITE_FIREBASE_API_KEY=...
VITE_TMDB_API_KEY=...
```

## Support & Maintenance

### Regular Tasks

- Monitor API costs (OpenAI)
- Check error logs
- Update dependencies quarterly
- Test on new browser versions
- Monitor performance metrics

### Known Limitations

- No persistent chat history (clears on page reload)
- GPT sometimes invents movies (use TMDB verification as fallback)
- No real-time collaboration
- Single user per session

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Status:** Production Ready ✅
