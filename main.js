import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
import * as readLine from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

const rl = readLine.createInterface({
  input,
  output,
});

async function mainAI() {
  const prompt = await rl.question("Enter your prompt: ");

  const response = await genAI.models.generateContent({ model: "gemini-2.5-flash" ,
    contents: prompt,
  });
  console.log("AI RESPONSE -> ", response.text);
}

await mainAI();
