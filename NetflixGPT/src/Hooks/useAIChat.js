/**
 * useAIChat Hook
 * Manages all chat state, message handling, and API interactions
 * Uses useReducer for complex state management
 */

import { useReducer, useCallback, useRef, useEffect } from 'react';
import { getMovieRecommendations, formatConversationHistory } from '../services/openai';
import { searchMoviesOnTMDB, parseMovieRecommendations } from '../services/tmdbSearch';

// Action types
const ACTIONS = {
  ADD_MESSAGE: 'ADD_MESSAGE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
  ADD_MOVIES_TO_MESSAGE: 'ADD_MOVIES_TO_MESSAGE',
  RETRY_MESSAGE: 'RETRY_MESSAGE'
};

// Initial state
const initialState = {
  messages: [],
  loading: false,
  error: null,
  retryMessage: null
};

// Reducer function
const chatReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        error: null
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case ACTIONS.CLEAR_MESSAGES:
      return initialState;

    case ACTIONS.ADD_MOVIES_TO_MESSAGE:
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg.id === action.payload.messageId
            ? { ...msg, movies: action.payload.movies }
            : msg
        ),
        loading: false
      };

    case ACTIONS.RETRY_MESSAGE:
      return {
        ...state,
        retryMessage: action.payload
      };

    default:
      return state;
  }
};

/**
 * Custom hook for managing AI chat interactions
 * @returns {Object} - Chat state and methods
 */
export const useAIChat = () => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const messagesEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  /**
   * Generate unique message ID
   */
  const generateMessageId = useCallback(() => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  /**
   * Add a message to the chat
   */
  const addMessage = useCallback((role, content) => {
    const message = {
      id: generateMessageId(),
      role,
      content,
      timestamp: new Date(),
      movies: null
    };
    dispatch({ type: ACTIONS.ADD_MESSAGE, payload: message });
    return message.id;
  }, [generateMessageId]);

  /**
   * Send message to AI and get recommendations
   */
  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim()) return;

    try {
      // Add user message
      addMessage('user', userMessage);
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });

      // Get conversation history
      const conversationHistory = formatConversationHistory(state.messages);

      // Get GPT response
      abortControllerRef.current = new AbortController();
      const gptResponse = await getMovieRecommendations(userMessage, conversationHistory);

      // Add assistant response
      const assistantMessageId = addMessage('assistant', gptResponse);

      // Parse movie names from response
      const movieRecommendations = parseMovieRecommendations(gptResponse);

      if (movieRecommendations.length > 0) {
        // Search TMDB for movie data
        const movieNames = movieRecommendations.map(rec => rec.name);
        const movieDataList = await searchMoviesOnTMDB(movieNames);

        // Combine GPT recommendations with TMDB data
        const enrichedMovies = movieRecommendations.map((rec, index) => ({
          ...rec,
          tmdbData: movieDataList[index] || null
        }));

        // Add movies to the assistant message
        dispatch({
          type: ACTIONS.ADD_MOVIES_TO_MESSAGE,
          payload: {
            messageId: assistantMessageId,
            movies: enrichedMovies
          }
        });
      } else {
        dispatch({ type: ACTIONS.SET_LOADING, payload: false });
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: error.message || 'Failed to get recommendations. Please try again.'
        });
        dispatch({ type: ACTIONS.RETRY_MESSAGE, payload: userMessage });
      }
    }
  }, [state.messages, addMessage]);

  /**
   * Retry sending a message
   */
  const retryLastMessage = useCallback(async () => {
    if (state.retryMessage) {
      dispatch({ type: ACTIONS.RETRY_MESSAGE, payload: null });
      await sendMessage(state.retryMessage);
    }
  }, [state.retryMessage, sendMessage]);

  /**
   * Clear all messages and reset chat
   */
  const clearChat = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_MESSAGES });
  }, []);

  /**
   * Cancel ongoing request
   */
  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    messages: state.messages,
    loading: state.loading,
    error: state.error,
    retryMessage: state.retryMessage,
    sendMessage,
    clearChat,
    retryLastMessage,
    cancelRequest,
    messagesEndRef
  };
};
