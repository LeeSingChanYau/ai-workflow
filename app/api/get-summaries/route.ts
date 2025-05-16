import { connectToDatabase } from '@/lib/mongodb';
import { Summary } from '@/models/summary';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const summaries = await Summary.find({})
    .sort({ timestamp: -1 })
    .limit(10)
    .lean();
  return NextResponse.json(summaries);
}
