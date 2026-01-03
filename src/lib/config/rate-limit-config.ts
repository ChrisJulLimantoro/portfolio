/**
 * Rate Limiting Configuration
 * 
 * Centralized configuration for chat rate limiting and history management.
 */

export const RATE_LIMIT_CONFIG = {
  // Rate limiting
  DAILY_QUERY_LIMIT: 30, // Maximum queries per day per IP
  WARNING_THRESHOLD: 5, // Show warning when < 5 queries left
  
  // Chat history
  MAX_CHAT_HISTORY: 50, // Maximum messages to keep in history
  HISTORY_EXPIRY_HOURS: 24, // Hours until chat history expires
  
  // Timezone and reset
  TIMEZONE: 'Asia/Jakarta', // UTC+7
  RESET_HOUR: 0, // Midnight (0:00)
  
  // Redis storage
  REDIS_STORAGE_THRESHOLD_MB: 28, // Alert when Redis > 28 MB (30 MB limit)
  
  // LocalStorage keys
  STORAGE_KEYS: {
    CHAT_HISTORY: 'chatHistory',
    CHAT_TIMESTAMP: 'chatHistoryTimestamp',
    RATE_LIMIT_COUNT: 'rateLimitCount',
    RATE_LIMIT_RESET: 'rateLimitReset',
  },
} as const;

export type RateLimitConfig = typeof RATE_LIMIT_CONFIG;
