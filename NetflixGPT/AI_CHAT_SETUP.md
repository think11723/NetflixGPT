# AI Movie Concierge - Setup Guide

## Quick Start (5 minutes)

### Step 1: Get OpenAI API Key

1. Visit: https://platform.openai.com/account/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-proj-`)
4. **Keep it secret** - never share or commit it

### Step 2: Create .env File

In the root folder (`NetflixGPT/NetflixGPT/.env`), add:

```bash
VITE_OPENAI_API_KEY=sk-proj-your-key-here
```

Replace `sk-proj-your-key-here` with your actual API key.

### Step 3: Test It

```bash
npm run dev
```

Navigate to `http://localhost:5173/browse` and look for the red button in the bottom-right corner.

Click it and try asking: "I want a sci-fi movie"

## What Happens Under the Hood

1. **You ask a question** → sent to the chat input
2. **GPT-3.5 Turbo responds** → generates 5-10 movie recommendations
3. **We search TMDB** → finds each movie and gets real data
4. **Movie cards appear** → showing posters, ratings, descriptions
5. **Click a card** → view details (extensible)

## File Structure

Everything is self-contained in:
```
src/
├── components/AIChat/
│   ├── AIChat.jsx                    ← Main component
│   ├── FloatingButton.jsx            ← The red button
│   ├── ChatInput.jsx                 ← Input area
│   ├── AIMessage.jsx                 ← Messages display
│   ├── MovieRecommendationCard.jsx   ← Movie cards
│   └── TypingIndicator.jsx           ← Loading animation
├── services/
│   ├── openai.js                    ← GPT integration
│   └── tmdbSearch.js                ← TMDB integration
└── hooks/
    └── useAIChat.js                 ← State management
```

## Features

✅ **Floating Button** - Bottom-right, always visible  
✅ **Modern Chat** - Dark Netflix theme  
✅ **Real Movies** - Actual TMDB data with posters  
✅ **Smart AI** - GPT-3.5 Turbo powered  
✅ **Responsive** - Works on mobile, tablet, desktop  
✅ **Keyboard Ready** - Enter to send, Shift+Enter for newline, ESC to close  
✅ **Error Recovery** - Retry button if something fails  
✅ **No Page Impact** - Lazy loads, doesn't slow down initial load  

## Example Conversations

### Example 1: Simple Request
```
You: "Recommend a comedy"
AI: "Here are 8 great comedies:
    - Superbad (2007)
    - The Grand Budapest Hotel (2014)
    - Knives Out (2019)
    ..."
```

### Example 2: Specific Criteria
```
You: "Best sci-fi movies after 2020"
AI: "Here are recent sci-fi films:
    - Dune (2021) - Epic sci-fi
    - Avatar: The Way of Water (2022) - Visual masterpiece
    ..."
```

### Example 3: Similar To
```
You: "Movies like Interstellar"
AI: "You might like:
    - The Martian (2015)
    - Inception (2010)
    - Gravity (2013)
    ..."
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Click red button | Open chat |
| Type + **Enter** | Send message |
| **Shift + Enter** | New line |
| **ESC** | Close chat |

## Troubleshooting

### "API key not configured" Error

**Solution:** 
1. Make sure `.env` file exists in the root folder
2. Check the key starts with `sk-proj-`
3. Restart the dev server: `npm run dev`
4. Refresh the browser

### Chat works but no movies show

**Solution:**
1. The TMDB search might be failing
2. Check browser console (F12) for errors
3. Try simpler movie names: "Dune" instead of complex titles

### Floating button not visible

**Solution:**
1. Navigate to `/browse` page (button only shows there)
2. Make sure you're logged in
3. Check z-index issues (it should be `z-50`)

### Takes too long to respond

**Solution:**
1. OpenAI API might be slow (normal during peak hours)
2. Check your internet connection
3. Try again in a moment
4. Check if your API key has rate limits

## Cost & Limits

### OpenAI (GPT-3.5 Turbo)
- **Cost:** ~$0.001-0.002 per recommendation
- **Limit:** Depends on your plan
- **Speed:** Usually <5 seconds

### TMDB
- **Cost:** Free (included with your key)
- **Limit:** Very generous on free tier
- **Speed:** Usually instant

## Security Notes

⚠️ **Never:**
- Share your API key
- Commit `.env` to Git
- Hardcode the key in components

✅ **Always:**
- Use environment variables
- Keep the key private
- Rotate keys regularly (on OpenAI dashboard)

## Customization

### Change Button Position

Edit `src/components/AIChat/FloatingButton.jsx`, line 8:
```jsx
// From:
className={`fixed bottom-6 right-6 z-40 ...`}

// To (top-left example):
className={`fixed top-6 left-6 z-40 ...`}
```

### Change Welcome Message

Edit `src/components/AIChat/AIChat.jsx`, search for `WELCOME_MESSAGE`:
```jsx
const WELCOME_MESSAGE = `
Your custom message here
`;
```

### Change AI Behavior

Edit `src/services/openai.js`, search for `SYSTEM_PROMPT`:
```javascript
const SYSTEM_PROMPT = `
You are Netflix AI. Your only purpose is recommending movies...
`;
```

## Next Steps

1. ✅ Set up `.env` with OpenAI key
2. ✅ Run `npm run dev`
3. ✅ Test on `/browse` page
4. ✅ Try asking different questions
5. ✅ Read full docs: `AI_CHAT_DOCUMENTATION.md`

## Need Help?

Check the full documentation:
```bash
cat AI_CHAT_DOCUMENTATION.md
```

Or review the component source code:
- Main logic: `src/components/AIChat/AIChat.jsx`
- State management: `src/hooks/useAIChat.js`
- API calls: `src/services/openai.js`

---

**Happy recommending! 🍿**
