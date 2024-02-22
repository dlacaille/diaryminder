import client from "../client"
import config from "../config"
import logDiaryEntry from "../log-diary-entry"
import promptHashHistoryStorage from "../storage/prompt-hash-history"
import hash from "../utils/hash"

const maxHistory = 5

function makePrompt(prompts: string[], toReplace: Record<string, string>) {
  // Get a random prompt that is not in the history
  let prompt: string, promptHash: number
  const history = promptHashHistoryStorage.get()
  do {
    prompt = prompts[Math.floor(Math.random() * prompts.length)]
    promptHash = hash(prompt)
  } while (maxHistory < prompts.length && history.includes(promptHash))

  // Add the prompt to history
  promptHashHistoryStorage.set([...history, promptHash].slice(-maxHistory))

  // Replace variables
  for (const [variable, value] of Object.entries(toReplace)) {
    prompt = prompt.replace(new RegExp("\\${" + variable + "}", "gi"), value)
  }

  return prompt
}

export default async function sendPrompt(roomId: string) {
  const prompt = makePrompt(config.prompts, config.variables)
  client.sendText(roomId, prompt)
  const botId = await client.getUserId()
  logDiaryEntry(roomId, botId, prompt)
}
