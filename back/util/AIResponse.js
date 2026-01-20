import { CohereClientV2 } from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();

const cohere = new CohereClientV2({ token: process.env.COHERE_API_KEY });

const AIResponse = async (message, res) => {
  console.log(message);
  try {
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        {
          role: "user",
          content: `You are EasyDeal’s virtual customer support assistant.

Your role:
- Help customers with product availability, features, and general questions
- Ask clarifying questions if the request is ambiguous
- Be concise, polite, and helpful
- If you are unsure, say you will notify a human agent

Rules:
- Do NOT invent product details
- Do NOT mention prices unless explicitly provided
- Do NOT promise delivery timelines
- Keep responses under 40 words
- Speak directly to the customer using “you” and “your”

Customer message:
"${message}"
`,
        },
      ],
    });
    return response.message.content[0].text;
  } catch (error) {
    console.error(error);
  }
};

export { AIResponse };
