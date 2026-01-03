import { RATE_LIMIT_CONFIG } from '@/lib/config/rate-limit-config';

interface RateLimitState {
  count: number;
  lastReset: string; // ISO date string
  dailyLimit: number;
}

/**
 * Get midnight UTC+7 for today
 */
function getMidnightUTC7Today(): Date {
  const now = new Date();
  const utc7Now = new Date(
    now.toLocaleString('en-US', { timeZone: RATE_LIMIT_CONFIG.TIMEZONE })
  );
  utc7Now.setHours(0, 0, 0, 0);
  return utc7Now;
}

/**
 * Get midnight UTC+7 for tomorrow
 */
function getMidnightUTC7Tomorrow(): Date {
  const midnight = getMidnightUTC7Today();
  midnight.setDate(midnight.getDate() + 1);
  return midnight;
}

/**
 * Check if we've passed midnight UTC+7 since last reset
 */
function shouldResetToday(lastReset: string): boolean {
  const lastResetDate = new Date(lastReset);
  const todayMidnight = getMidnightUTC7Today();
  return lastResetDate < todayMidnight;
}

/**
 * Get rate limit state from localStorage
 */
function getRateLimitState(): RateLimitState {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_CONFIG.STORAGE_KEYS.RATE_LIMIT_COUNT);
    if (!stored) {
      return {
        count: 0,
        lastReset: new Date().toISOString(),
        dailyLimit: RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT,
      };
    }
    return JSON.parse(stored);
  } catch {
    return {
      count: 0,
      lastReset: new Date().toISOString(),
      dailyLimit: RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT,
    };
  }
}

/**
 * Save rate limit state to localStorage
 */
function saveRateLimitState(state: RateLimitState): void {
  try {
    localStorage.setItem(
      RATE_LIMIT_CONFIG.STORAGE_KEYS.RATE_LIMIT_COUNT,
      JSON.stringify(state)
    );
  } catch (error) {
    console.error('Failed to save rate limit state:', error);
  }
}

/**
 * Check if user has exceeded rate limit (client-side check)
 * Returns remaining queries and whether request is allowed
 */
export function checkClientRateLimit(): {
  allowed: boolean;
  remaining: number;
  resetTime: Date;
  count: number;
} {
  let state = getRateLimitState();

  // Reset if we've passed midnight UTC+7
  if (shouldResetToday(state.lastReset)) {
    state = {
      count: 0,
      lastReset: new Date().toISOString(),
      dailyLimit: RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT,
    };
    saveRateLimitState(state);
  }

  const remaining = Math.max(0, state.dailyLimit - state.count);
  const allowed = remaining > 0;
  const resetTime = getMidnightUTC7Tomorrow();

  return { allowed, remaining, resetTime, count: state.count };
}

/**
 * Increment query count (call after successful API request)
 */
export function incrementQueryCount(): void {
  const state = getRateLimitState();
  
  // Reset if needed
  if (shouldResetToday(state.lastReset)) {
    state.count = 0;
    state.lastReset = new Date().toISOString();
  }

  state.count += 1;
  saveRateLimitState(state);
}

/**
 * Sync client state with server response headers
 * Call this after receiving response from API
 */
export function syncWithServer(headers: Headers): void {
  try {
    const limit = headers.get('X-RateLimit-Limit');
    const remaining = headers.get('X-RateLimit-Remaining');

    if (limit && remaining) {
      const limitNum = parseInt(limit, 10);
      const remainingNum = parseInt(remaining, 10);
      const count = limitNum - remainingNum;

      const state: RateLimitState = {
        count,
        lastReset: new Date().toISOString(),
        dailyLimit: limitNum,
      };

      saveRateLimitState(state);
    }
  } catch (error) {
    console.error('Failed to sync with server:', error);
  }
}

/**
 * Get remaining queries
 */
export function getRemainingQueries(): number {
  const { remaining } = checkClientRateLimit();
  return remaining;
}

/**
 * Get seconds until midnight UTC+7
 */
export function getSecondsUntilMidnight(): number {
  const now = new Date();
  const midnight = getMidnightUTC7Tomorrow();
  return Math.floor((midnight.getTime() - now.getTime()) / 1000);
}

/**
 * Get formatted time until midnight (e.g., "5h 23m")
 */
export function getTimeUntilMidnight(): string {
  const seconds = getSecondsUntilMidnight();
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

/**
 * Get current time in UTC+7
 */
export function getCurrentTimeUTC7(): string {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    timeZone: RATE_LIMIT_CONFIG.TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
