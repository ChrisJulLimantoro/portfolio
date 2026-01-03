import Redis from 'ioredis';
import { RATE_LIMIT_CONFIG } from '@/lib/config/rate-limit-config';

// Create Redis client using REDIS_URL
const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  lazyConnect: false,
});

// Handle Redis connection errors
redis.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redis.on('connect', () => {
  console.log('Redis connected successfully');
});

/**
 * Calculate seconds until midnight UTC+7 (Asia/Jakarta)
 */
export function getSecondsUntilMidnightUTC7(): number {
  const now = new Date();
  const utc7Now = new Date(
    now.toLocaleString('en-US', { timeZone: RATE_LIMIT_CONFIG.TIMEZONE })
  );
  const midnight = new Date(utc7Now);
  midnight.setHours(24, 0, 0, 0);
  
  return Math.floor((midnight.getTime() - utc7Now.getTime()) / 1000);
}

/**
 * Get midnight UTC+7 as ISO string
 */
export function getMidnightUTC7(): string {
  const now = new Date();
  const utc7Now = new Date(
    now.toLocaleString('en-US', { timeZone: RATE_LIMIT_CONFIG.TIMEZONE })
  );
  const midnight = new Date(utc7Now);
  midnight.setHours(24, 0, 0, 0);
  
  return midnight.toISOString();
}

/**
 * Check Redis storage usage (approximation based on key count)
 */
export async function checkRedisStorage(): Promise<{
  isFull: boolean;
  usedMB: number;
  percentUsed: number;
}> {
  try {
    const keys = await redis.keys('ratelimit:*');
    const keyCount = keys.length;
    
    // Estimate: ~80 bytes per key
    const estimatedBytes = keyCount * 80;
    const usedMB = estimatedBytes / (1024 * 1024);
    const percentUsed = (usedMB / 30) * 100;
    const isFull = usedMB >= RATE_LIMIT_CONFIG.REDIS_STORAGE_THRESHOLD_MB;
    
    return { isFull, usedMB, percentUsed };
  } catch (error) {
    console.error('Failed to check Redis storage:', error);
    return { isFull: false, usedMB: 0, percentUsed: 0 };
  }
}

/**
 * Get rate limit status WITHOUT incrementing counter
 * Used for checking current status without consuming a query
 */
export async function getRateLimitStatus(ip: string): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  resetTime: string;
}> {
  try {
    const key = `ratelimit:${ip}`;
    const ttl = getSecondsUntilMidnightUTC7();
    const resetTimestamp = Date.now() + (ttl * 1000);
    
    // Get current count WITHOUT incrementing
    const current = await redis.get(key);
    const count = current ? parseInt(current, 10) : 0;
    
    const remaining = Math.max(0, RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT - count);
    const success = count < RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT;
    
    return {
      success,
      limit: RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT,
      remaining,
      reset: resetTimestamp,
      resetTime: 'midnight UTC+7',
    };
  } catch (error) {
    console.error('Failed to get rate limit status:', error);
    // Fail open
    return {
      success: true,
      limit: RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT,
      remaining: RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT,
      reset: Date.now() + getSecondsUntilMidnightUTC7() * 1000,
      resetTime: 'midnight UTC+7',
    };
  }
}

/**
 * Check rate limit for an IP address
 * Implements fixed window rate limiting with midnight UTC+7 reset
 */
export async function checkRateLimit(ip: string): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  resetTime: string;
}> {
  try {
    const key = `ratelimit:${ip}`;
    const ttl = getSecondsUntilMidnightUTC7();
    const resetTimestamp = Date.now() + (ttl * 1000);
    
    // Get current count
    const current = await redis.get(key);
    const count = current ? parseInt(current, 10) : 0;
    
    // Check if limit exceeded
    if (count >= RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT) {
      return {
        success: false,
        limit: RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT,
        remaining: 0,
        reset: resetTimestamp,
        resetTime: 'midnight UTC+7',
      };
    }
    
    // Increment counter
    const newCount = await redis.incr(key);
    
    // Set expiry to midnight UTC+7 if this is the first request
    if (newCount === 1) {
      await redis.expire(key, ttl);
    }
    
    const remaining = Math.max(0, RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT - newCount);
    
    return {
      success: true,
      limit: RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT,
      remaining,
      reset: resetTimestamp,
      resetTime: 'midnight UTC+7',
    };
  } catch (error) {
    console.error('Rate limit check failed:', error);
    // Fail open - allow request if rate limit check fails
    return {
      success: true,
      limit: RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT,
      remaining: RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT,
      reset: Date.now() + getSecondsUntilMidnightUTC7() * 1000,
      resetTime: 'midnight UTC+7',
    };
  }
}

/**
 * Update TTL for a rate limit key to expire at midnight UTC+7
 */
export async function setMidnightExpiry(ip: string): Promise<void> {
  try {
    const key = `ratelimit:${ip}`;
    const ttl = getSecondsUntilMidnightUTC7();
    await redis.expire(key, ttl);
  } catch (error) {
    console.error('Failed to set midnight expiry:', error);
  }
}

// Export redis client for potential direct use
export { redis };
