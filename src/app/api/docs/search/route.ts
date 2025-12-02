import { NextResponse } from 'next/server';

// Temporary: Return empty search results to fix build
// TODO: Fix fumadocs search configuration
export async function GET() {
  return NextResponse.json([]);
}
