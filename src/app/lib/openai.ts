import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getFeedbackOnAnswer(questionPrompt: string, userAnswer: string) {
  const messages = [
    {
      role: "system",
      content:
        "You are an expert interviewer who evaluates answers based on the STAR method (Situation, Task, Action, Result). Provide constructive feedback and a score from 1 to 10.",
    },
    {
      role: "user",
      content: `Question: ${questionPrompt}\nUser's Answer: ${userAnswer}\nPlease provide feedback on how well the answer follows the STAR method, suggest improvements, and give a score out of 10.`,
    },
  ] as ChatCompletionMessageParam[];

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
    max_tokens: 300,
  });

  return response.choices[0].message?.content ?? "No feedback available.";
}
