import OpenAI, { AuthenticationError, BadRequestError } from "openai";
import { OpenAIError } from "openai/error.mjs";
import toast from "react-hot-toast";

const apiKey = "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"

const AskRequest = async ({ prompt, Text }) => {
    if (apiKey.trim().length === 0) {
        return new Error("ApiKey vide")
    }
    const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });
    let result;
    try {
        let completion = await openai.chat.completions.create({
            messages: prompt,
            model: "gpt-4",
        })
        result = completion.choices[0].message.content
    }
    catch (e) {
        if (e instanceof AuthenticationError) {
            return new Error(e.code || "Erreur d'auth non reconue");
        }
        if (e instanceof BadRequestError) {
            return new Error("Ahchem Akhy on est woke ici fais du politiquement correct")
        }
        return new Error(JSON.stringify(e))
    }
    return result;
}

export { AskRequest }