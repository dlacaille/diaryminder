import schedule from "node-schedule"
import config from "./config"
import sendPrompt from "./prompts/send-prompt"
import roomIdsStorage from "./storage/room-ids"

export default function schedulePrompts() {
  const roomIds = roomIdsStorage.get()
  if (roomIds.length === 0) {
    console.warn("No roomId configured, nothing to schedule")
    return
  }

  let nextDate: Date
  for (const roomId of roomIds) {
    console.log("Scheduling prompts for room " + roomId)

    for (const cron of config.schedules) {
      console.log(cron)
      const job = schedule.scheduleJob(cron, function () {
        sendPrompt(roomId)
      })
      const jobDate = job.nextInvocation()
      if (!nextDate || jobDate < nextDate) {
        nextDate = jobDate
      }
    }
    return nextDate
  }
}
