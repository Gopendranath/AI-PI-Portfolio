const { OpenAI } = require("openai");
require("dotenv").config();

const baseURL = "https://api.aimlapi.com/v1";
const apiKey = String(process.env.my_key);
const systemPrompt = "You are a chatbot. Be descriptive and helpful";
// const userPrompt = "Tell me about San Francisco";

const api = new OpenAI({
  apiKey,
  baseURL,
});

const main = async (prompt) => {
  const completion = await api.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 256,
  });

  const response = completion.choices[0].message.content;

  return response;
};

// main('what is javascript');

module.exports = { main };