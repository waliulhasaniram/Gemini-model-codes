import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import * as readLine from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

// const rl = readLine.createInterface({
//   input,
//   output,
// });

async function mainAI(data) {
    try {
      //const prompt = await rl.question("Enter your prompt: ");
    
      const result = await genAI.models.generateContent({ 
        model: "gemini-2.5-flash" ,
        contents: data,
      });
      //console.log("AI RESPONSE -> ", response.text);  
      console.log(result.text)      
      return result.text;
    } catch (error) {
        console.error("Error:", error);
        return error;
    }
}

//await mainAI();

app.get("/", (req, res) => {
  res.send("Welcome to the Google GenAI Express Server!");
});

app.post("/ask-ai", async (req, res) => {
  try {
    const data = req.body.question;
    const aiResponse = await mainAI(data);
    if(!aiResponse) {
      return res.status(500).send("No response from AI");
    }
    return res.status(200).send("AI answer: " + aiResponse);
  } catch (error) {
    res.status(500).send("Error processing AI request");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


////////////////////////////////////////////////////////
// const rl = readLine.createInterface({
//   input,
//   output,
// });

// async function mainAI() {
//   while (true) {
//       const prompt = await rl.question("Enter your prompt: ");
//       if(prompt.toLowerCase() === "exit") {
//         console.log("Exiting...");
//         break;
//       }
    
//       const response = await genAI.models.generateContent({ model: "gemini-2.5-flash" ,
//         contents: prompt,
//       });
//       console.log("AI RESPONSE -> ", response.text);
//   }
// }
// await mainAI();