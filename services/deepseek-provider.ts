import type { ModelProvider } from "ai"

interface DeepSeekChatOptions {
  temperature?: number
  maxTokens?: number
  topP?: number
  frequencyPenalty?: number
  presencePenalty?: number
}

export const deepseek = (model: string): ModelProvider => {
  return {
    id: `deepseek-${model}`,
    name: "DeepSeek",
    provider: "deepseek",
    model,
    streaming: true,

    // Implementation for the DeepSeek API
    async callInputOutputModel(options) {
      const { messages, temperature = 0.7, maxTokens = 1000 } = options

      const apiKey = process.env.DEEPSEEK_API_KEY
      if (!apiKey) {
        throw new Error("DEEPSEEK_API_KEY is not set")
      }

      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens: maxTokens,
          stream: false,
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`DeepSeek API error: ${error}`)
      }

      const data = await response.json()
      return {
        text: data.choices[0].message.content,
      }
    },

    // Implementation for streaming
    async callInputOutputModelStream(options) {
      const { messages, temperature = 0.7, maxTokens = 1000 } = options

      const apiKey = process.env.DEEPSEEK_API_KEY
      if (!apiKey) {
        throw new Error("DEEPSEEK_API_KEY is not set")
      }

      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens: maxTokens,
          stream: true,
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`DeepSeek API error: ${error}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("Failed to get response reader")
      }

      const decoder = new TextDecoder()

      return {
        async *iterator() {
          let buffer = ""

          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })

            // Process the buffer to extract complete JSON objects
            const lines = buffer.split("\n")
            buffer = lines.pop() || ""

            for (const line of lines) {
              if (line.trim() === "") continue

              // Remove the "data: " prefix
              const jsonStr = line.replace(/^data: /, "").trim()
              if (jsonStr === "[DONE]") continue

              try {
                const json = JSON.parse(jsonStr)
                const content = json.choices[0]?.delta?.content || ""
                if (content) {
                  yield { text: content }
                }
              } catch (e) {
                console.error("Error parsing JSON:", e)
              }
            }
          }
        },
      }
    },
  }
}

