import schedule from "node-schedule"
import config from "./config"
import storage from "./storage"
import sendPrompt from "./prompts/send-prompt"
import { roomIdKey } from "./storage/keys"

export default function schedulePrompts() {
  const roomId = storage.readValue(roomIdKey)
  if (!roomId) {
    console.warn("No roomId configured, nothing to schedule")
    return
  }
  console.log("Scheduling prompts for room " + roomId)

  let nextDate: Date
  for (const cron of config.schedules) {
    console.log(cron)
    const job = schedule.scheduleJob(cron, function() {
      sendPrompt(roomId)
    })
    const jobDate = job.nextInvocation()
    if (!nextDate || jobDate < nextDate) {
      nextDate = jobDate
    }
  }
  return nextDate
}
