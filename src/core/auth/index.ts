import { betterAuth } from 'better-auth';

import { getAuthOptions } from './config';

// Cache the auth instance to avoid creating new instances on every request
// NOTE: In Vercel Serverless, caching can cause issues when function is frozen/resumed
// The cached database connection may become stale, causing TimeoutNegativeWarning
// So we use a short TTL to balance performance and connection freshness
let cachedAuth: Awaited<ReturnType<typeof betterAuth>> | null = null;
let authPromise: Promise<Awaited<ReturnType<typeof betterAuth>>> | null = null;
let cacheTimestamp: number = 0;

// Cache TTL in milliseconds (30 seconds for serverless, avoid stale connections)
const CACHE_TTL = 30 * 1000;

// Dynamic auth - with full database configuration
// Always use this in API routes that need database access
export async function getAuth(): Promise<
  Awaited<ReturnType<typeof betterAuth>>
> {
  const now = Date.now();

  // Check if cache is still valid (not expired)
  const isCacheValid = cachedAuth && now - cacheTimestamp < CACHE_TTL;

  // Return cached instance if available and not expired
  if (isCacheValid && cachedAuth) {
    return cachedAuth;
  }

  // Clear stale cache
  if (!isCacheValid) {
    cachedAuth = null;
    authPromise = null;
  }

  // If already initializing, wait for the existing promise
  // This prevents multiple simultaneous initializations
  if (authPromise) {
    return authPromise;
  }

  // Create auth instance and cache it
  authPromise = getAuthOptions().then((options) => {
    cachedAuth = betterAuth(options);
    cacheTimestamp = Date.now();
    return cachedAuth;
  });

  return authPromise;
}
