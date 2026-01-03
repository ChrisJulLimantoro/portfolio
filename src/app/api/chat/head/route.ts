import { getRateLimitStatus, getMidnightUTC7 } from '@/lib/server/rate-limiter';
import { RATE_LIMIT_CONFIG } from '@/lib/config/rate-limit-config';

export const dynamic = 'force-dynamic';

/**
 * HEAD endpoint to get rate limit status without processing a request
 * Used by client to sync rate limit state on page load
 */
export async function GET(req: Request) {
  try {
    // Get client IP address
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 
               req.headers.get('x-real-ip') ?? 
               '127.0.0.1';

    // Check rate limit status WITHOUT incrementing counter
    const rateLimit = await getRateLimitStatus(ip);

    // Return empty response with rate limit headers
    return new Response(null, {
      status: 200,
      headers: {
        'X-RateLimit-Limit': rateLimit.limit.toString(),
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.reset.toString(),
      },
    });
  } catch (error) {
    console.error('HEAD request error:', error);
    // Return default values on error
    return new Response(null, {
      status: 200,
      headers: {
        'X-RateLimit-Limit': RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT.toString(),
        'X-RateLimit-Remaining': RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT.toString(),
        'X-RateLimit-Reset': (Date.now() + 86400000).toString(),
      },
    });
  }
}
