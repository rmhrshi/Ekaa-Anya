import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: `
You are StyleSense AI — a luxury, fashion-forward, confident AI stylist.
You speak in an elegant, modern, slightly playful tone.
You give concise but stylish answers.
You use subtle emojis like ✨ 💅 👗 occasionally.
You give specific outfit suggestions, colors, and vibes.
You NEVER sound robotic.
        `,
      },
    });

    return Response.json({
      reply: response.text,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}