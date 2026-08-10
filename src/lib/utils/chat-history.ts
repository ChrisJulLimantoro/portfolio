import { RATE_LIMIT_CONFIG } from '@/lib/config/rate-limit-config';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Load chat history from localStorage
 * Returns empty array if expired or not found
 */
export function loadChatHistory(): Message[] {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_CONFIG.STORAGE_KEYS.CHAT_HISTORY);
    const timestamp = localStorage.getItem(RATE_LIMIT_CONFIG.STORAGE_KEYS.CHAT_TIMESTAMP);

    if (!stored || !timestamp) {
      return [];
    }

    const timestampNum = parseInt(timestamp, 10);
    const now = Date.now();
    const expiryMs = RATE_LIMIT_CONFIG.HISTORY_EXPIRY_HOURS * 60 * 60 * 1000;

    // Check if expired
    if (now - timestampNum > expiryMs) {
      clearChatHistory();
      return [];
    }

    const messages: Message[] = JSON.parse(stored);
    return messages;
  } catch (error) {
    console.error('Failed to load chat history:', error);
    return [];
  }
}

/**
 * Save chat history to localStorage
 * Automatically trims to MAX_CHAT_HISTORY limit
 */
export function saveChatHistory(messages: Message[]): void {
  try {
    // Trim to max limit (keep most recent messages)
    const trimmedMessages = trimToLimit(messages);

    localStorage.setItem(
      RATE_LIMIT_CONFIG.STORAGE_KEYS.CHAT_HISTORY,
      JSON.stringify(trimmedMessages)
    );
    localStorage.setItem(
      RATE_LIMIT_CONFIG.STORAGE_KEYS.CHAT_TIMESTAMP,
      Date.now().toString()
    );
  } catch (error) {
    console.error('Failed to save chat history:', error);
  }
}

/**
 * Trim messages to MAX_CHAT_HISTORY limit
 * Keeps most recent messages
 */
export function trimToLimit(messages: Message[]): Message[] {
  if (messages.length <= RATE_LIMIT_CONFIG.MAX_CHAT_HISTORY) {
    return messages;
  }

  // Keep most recent messages
  return messages.slice(-RATE_LIMIT_CONFIG.MAX_CHAT_HISTORY);
}

/**
 * Clear chat history from localStorage
 */
export function clearChatHistory(): void {
  try {
    localStorage.removeItem(RATE_LIMIT_CONFIG.STORAGE_KEYS.CHAT_HISTORY);
    localStorage.removeItem(RATE_LIMIT_CONFIG.STORAGE_KEYS.CHAT_TIMESTAMP);
  } catch (error) {
    console.error('Failed to clear chat history:', error);
  }
}

/**
 * Check if chat history is expired
 */
export function isHistoryExpired(): boolean {
  try {
    const timestamp = localStorage.getItem(RATE_LIMIT_CONFIG.STORAGE_KEYS.CHAT_TIMESTAMP);
    
    if (!timestamp) {
      return true;
    }

    const timestampNum = parseInt(timestamp, 10);
    const now = Date.now();
    const expiryMs = RATE_LIMIT_CONFIG.HISTORY_EXPIRY_HOURS * 60 * 60 * 1000;

    return now - timestampNum > expiryMs;
  } catch {
    return true;
  }
}

/**
 * Get number of messages in history
 */
export function getMessageCount(): number {
  const messages = loadChatHistory();
  return messages.length;
}

/**
 * Check if approaching message limit
 */
export function isApproachingLimit(): boolean {
  const count = getMessageCount();
  return count >= RATE_LIMIT_CONFIG.MAX_CHAT_HISTORY - 10; // Warning at 40 messages
}

/**
 * Get remaining message slots
 */
export function getRemainingSlots(): number {
  const count = getMessageCount();
  return Math.max(0, RATE_LIMIT_CONFIG.MAX_CHAT_HISTORY - count);
}
