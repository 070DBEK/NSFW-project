"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface Message {
  content: string
  sender: "user" | "character"
}

export async function generateChatResponse(
  userMessage: string,
  characterName: string,
  characterPersonality: string,
  previousMessages: Message[],
) {
  try {
    const context = previousMessages
      .slice(-5)
      .map((msg) => `${msg.sender === "user" ? "User" : characterName}: ${msg.content}`)
      .join("\n")

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: `You are ${characterName}, an AI character with this personality: ${characterPersonality}.

      Important guidelines:
      - Always respond in Uzbek language
      - Stay in character at all times
      - Be engaging, friendly, and conversational
      - Keep responses concise but meaningful (1-3 sentences)
      - Show personality through your responses
      - Remember previous conversation context
      - Be helpful and supportive

      Previous conversation context:
      ${context}`,
      prompt: `User says: ${userMessage}

      Respond as ${characterName} in Uzbek language:`,
      maxTokens: 150,
    })

    return text
  } catch (error) {
    console.error("Chat generation error:", error)
    return "Kechirasiz, hozir javob bera olmayapman. Iltimos, qaytadan urinib ko'ring."
  }
}
