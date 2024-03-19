import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: Response) {
  const text = await req.text();

  try {
    const speechFile = path.resolve(
      `C:/Users/fearc/OneDrive/Documents/GitHub/swiftdebrief/public/speech.mp3`
    );

    const mp3 = await openai.audio.speech.create({
      model: "tts-1-hd",
      voice: "shimmer",
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    await fs.promises.writeFile(speechFile, buffer);

    const audioUrl = "/speech.mp3";
    console.log("audioUrl", audioUrl);
    return new Response(JSON.stringify({ audioUrl }), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
}
