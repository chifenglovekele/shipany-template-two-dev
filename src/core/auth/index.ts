import { betterAuth } from 'better-auth';

import { getAuthOptions } from './config';

// Cache the auth instance to avoid creating new instances on every request
// This is critical for performance and to prevent database connection exhaustion
let cachedAuth: Awaited<ReturnType<typeof betterAuth>> | null = null;
let authPromise: Promise<Awaited<ReturnType<typeof betterAuth>>> | null = null;

// Dynamic auth - with full database configuration
// Always use this in API routes that need database access
export async function getAuth(): Promise<
  Awaited<ReturnType<typeof betterAuth>>
> {
  // Return cached instance if available
  if (cachedAuth) {
    return cachedAuth;
  }

  // If already initializing, wait for the existing promise
  // This prevents multiple simultaneous initializations
  if (authPromise) {
    return authPromise;
  }

  // Create auth instance and cache it
  authPromise = getAuthOptions().then((options) => {
    cachedAuth = betterAuth(options);
    return cachedAuth;
  });

  return authPromise;
}
