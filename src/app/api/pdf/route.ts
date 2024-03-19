import OpenAI from "openai";
// import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const extractedText = await req.text();
  const completion = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "Summarize the research paper provided, focusing on the key elements that contribute to the field of study. Start by introducing the main research question or problem addressed by the paper. Then, briefly describe the methodology used to investigate this problem, ensuring to highlight any novel approaches or techniques employed. Summarize the significant findings, including any data or results that are particularly impactful. Conclude with the implications of these findings for the field and any recommendations or conclusions drawn by the authors. Tailor the summary for a general audience, ensuring to adjust the level of technical detail and language complexity accordingly. Provide the summary in a paragraph.",
      },
      {
        role: "user",
        content: extractedText,
      },
    ],
    max_tokens: 300,
  });

  const keyPointsCompletion = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "Extract the key points from the provided research paper. Include the main research question and key findings. Present the key points as a bulleted list.",
      },
      {
        role: "user",
        content: extractedText,
      },
    ],
    max_tokens: 300,
  });

  let summarizedText = "";
  for await (const chunk of completion) {
    summarizedText += chunk.choices[0].delta.content;
  }

  let keyPoints = "";
  for await (const chunk of keyPointsCompletion) {
    keyPoints += chunk.choices[0].delta.content;
  }

  keyPoints = keyPoints.replace(/\undefined/g, "");
  summarizedText = summarizedText.replace(/\undefined/g, "");

  // Send back a response with the summarized text
  return new Response(JSON.stringify({ summarizedText, keyPoints }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
