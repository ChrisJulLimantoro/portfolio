import { NextRequest } from 'next/server';
import { redis } from '@/lib/server/rate-limiter';

export const dynamic = 'force-dynamic';

/**
 * Verify API key from request headers
 */
function verifyApiKey(req: NextRequest): boolean {
  const apiKey = req.headers.get('x-api-key');
  const adminKey = process.env.ADMIN_API_KEY;
  
  if (!adminKey) {
    console.warn('ADMIN_API_KEY not set in environment variables');
    return false;
  }
  
  return apiKey === adminKey;
}

/**
 * Admin API to check and manage Redis rate limit data
 * 
 * AUTHENTICATION REQUIRED: Include header `x-api-key: your-secret-key`
 * 
 * Usage:
 * GET /api/admin/redis?action=list - List all rate limit keys
 * GET /api/admin/redis?action=check&ip=127.0.0.1 - Check specific IP
 * GET /api/admin/redis?action=stats - Get Redis stats
 * DELETE /api/admin/redis?ip=127.0.0.1 - Reset rate limit for IP
 */
export async function GET(req: NextRequest) {
  // Verify API key
  if (!verifyApiKey(req)) {
    return Response.json(
      { error: 'Unauthorized - Invalid or missing API key' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action') || 'list';
    const ip = searchParams.get('ip');

    switch (action) {
      case 'list': {
        // List all rate limit keys
        const keys = await redis.keys('ratelimit:*');
        const data = await Promise.all(
          keys.map(async (key) => {
            const value = await redis.get(key);
            const ttl = await redis.ttl(key);
            const ip = key.replace('ratelimit:', '');
            
            return {
              ip,
              count: parseInt(value || '0', 10),
              ttl: ttl > 0 ? ttl : 0,
              expiresIn: ttl > 0 ? formatTTL(ttl) : 'expired',
            };
          })
        );

        return Response.json({
          success: true,
          totalKeys: keys.length,
          keys: data.sort((a, b) => b.count - a.count),
        });
      }

      case 'check': {
        if (!ip) {
          return Response.json({ error: 'IP parameter required' }, { status: 400 });
        }

        const key = `ratelimit:${ip}`;
        const value = await redis.get(key);
        const ttl = await redis.ttl(key);
        const count = parseInt(value || '0', 10);

        return Response.json({
          success: true,
          ip,
          count,
          remaining: Math.max(0, 30 - count),
          ttl: ttl > 0 ? ttl : 0,
          expiresIn: ttl > 0 ? formatTTL(ttl) : 'expired',
          isLimited: count >= 30,
        });
      }

      case 'stats': {
        // Get overall stats
        const keys = await redis.keys('ratelimit:*');
        const values = await Promise.all(
          keys.map(async (key) => {
            const value = await redis.get(key);
            return parseInt(value || '0', 10);
          })
        );

        const totalRequests = values.reduce((sum, val) => sum + val, 0);
        const limitedIPs = values.filter((val) => val >= 30).length;

        return Response.json({
          success: true,
          stats: {
            totalIPs: keys.length,
            totalRequests,
            limitedIPs,
            averageRequestsPerIP: keys.length > 0 ? (totalRequests / keys.length).toFixed(2) : 0,
          },
        });
      }

      default:
        return Response.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Redis admin error:', error);
    return Response.json(
      { error: 'Failed to query Redis', details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  // Verify API key
  if (!verifyApiKey(req)) {
    return Response.json(
      { error: 'Unauthorized - Invalid or missing API key' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const ip = searchParams.get('ip');

    if (!ip) {
      return Response.json({ error: 'IP parameter required' }, { status: 400 });
    }

    const key = `ratelimit:${ip}`;
    const deleted = await redis.del(key);

    return Response.json({
      success: true,
      message: deleted > 0 ? `Rate limit reset for ${ip}` : `No rate limit found for ${ip}`,
      deleted: deleted > 0,
    });
  } catch (error) {
    console.error('Redis delete error:', error);
    return Response.json(
      { error: 'Failed to delete key', details: String(error) },
      { status: 500 }
    );
  }
}

// Helper function to format TTL in human-readable format
function formatTTL(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}
