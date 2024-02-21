import client from "../client"
import config from "../config"
import logDiaryEntry from "../log-diary-entry"

function makePrompt(prompts: string[], toReplace: Record<string, string>) {
  let prompt = prompts[Math.floor(Math.random() * prompts.length)]
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
