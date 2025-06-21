import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // free model, or try 'google/gemma-7b-it'
        messages: [
          {
            role: "system",
            content:`You're a sarcastic Bollywood-style roaster. Roast the user's LeetCode stats in a dramatic, funny, and spicy way using Bollywood-style humor and emojis. 
Keep it informal and mocking, like you're talking to your childhood friend who thinks they're a genius because they solved a few Easy problems.
Don't number the lines, just make a spicy paragraph.
Use desi phrases, movie references, and exaggerated tone. End with a mic drop emoji.`,
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.9,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter API error:", data);
      throw new Error(data.error?.message || "OpenRouter API error");
    }

    const roast = data.choices?.[0]?.message?.content || "Couldn’t generate roast.";
    return NextResponse.json({ roast });
  } catch (err) {
    console.error("GPT Error:", err);
    return NextResponse.json({
      roast: "🥲 GPT roast failed. Maybe you're too powerful to be roasted?",
    });
  }
}
