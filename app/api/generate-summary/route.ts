import OpenAI from 'openai';
import { connectToDatabase } from '@/lib/mongodb';
import { Summary } from '@/models/summary';
import { NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

export async function POST(req: Request) {
  const { query } = await req.json();

  try {
    await connectToDatabase();

    const prompt = `You are a helpful assistant. Summarize the following text clearly and concisely in 2–4 sentences. 
    Capture the main ideas or actions, and omit unnecessary details.
    Text: ${query}`;

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const summary = chatResponse.choices[0]?.message?.content || '';
    await Summary.create({ input: query, summary });

    return new Response(summary, { status: 200 });
  } catch (error) {
    console.error('Error generating summary:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong.' }), {
      status: 500,
    });
  }
}

export async function GET() {
  await connectToDatabase();
  const summaries = await Summary.find({})
    .sort({ timestamp: -1 })
    .limit(10)
    .lean();
  return NextResponse.json(summaries);
}
