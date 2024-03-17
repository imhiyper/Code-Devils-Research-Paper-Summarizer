// TODO: We need a decided on LLM + .env for it (plus 'ai' module for streaming)

import OpenAI from "openai";
// import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const extractedText = await req.text();
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are a text summarizer. You will summarize the provided text.",
      },
      {
        role: "user",
        content: extractedText,
      },
    ],
  });

  let summarizedText = '';
  for await (const chunk of completion) {
    summarizedText += chunk.choices[0].delta.content;
  };
  
  // Send back a response with the summarized text
  return new Response(summarizedText, { status: 200 });
}
