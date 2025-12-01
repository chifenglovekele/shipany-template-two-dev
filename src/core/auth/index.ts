import { betterAuth } from 'better-auth';

import { getAuthOptions } from './config';

// Dynamic auth - with full database configuration
// Always use this in API routes that need database access
export async function getAuth(): Promise<
  Awaited<ReturnType<typeof betterAuth>>
> {
  return betterAuth(await getAuthOptions());
}
