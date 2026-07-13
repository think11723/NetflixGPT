/**
 * OpenAI API Service
 * Handles all communication with OpenAI GPT API for movie recommendations
 * API key should be stored in environment variables for production
 */

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const SYSTEM_PROMPT = `You are Netflix AI.

Your only purpose is recommending movies and TV shows.

Always recommend between 5 and 10 titles.

For every recommendation include:
- Movie Name
- Release Year
- Genre
- Very short reason (1-2 sentences)

Format: "Movie Name (Year) - Genre - Reason"

Never answer unrelated questions.

If the user asks unrelated questions, politely redirect them back to movie recommendations.

Keep responses concise and organized.`;

/**
 * Send a message to OpenAI and get movie recommendations
 * @param {string} userMessage - User's question about movies
 * @param {Array} conversationHistory - Previous messages for context
 * @returns {Promise<string>} - GPT response with movie recommendations
 */
export const getMovieRecommendations = async (
  userMessage,
  conversationHistory = [],
) => {
  if (!OPENROUTER_API_KEY) {
    throw new Error(
      "OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in .env",
    );
  }

  try {
    // Build messages array with conversation history
    const messages = [
      ...conversationHistory.filter((msg) => msg.role !== "system"),
      {
        role: "user",
        content: userMessage,
      },
    ];

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "NetflixGPT",
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.1-8b-instruct',
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            ...messages,
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "Failed to get recommendations",
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
};

/**
 * Format conversation history for sending to API
 * @param {Array} messages - Chat messages
 * @returns {Array} - Formatted messages for API
 */
export const formatConversationHistory = (messages) => {
  return messages
    .filter((msg) => msg.id) // Ensure message has required fields
    .map((msg) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content:
        typeof msg.content === "string"
          ? msg.content
          : JSON.stringify(msg.content),
    }));
};
