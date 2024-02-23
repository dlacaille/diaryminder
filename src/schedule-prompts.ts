import schedule from "node-schedule"
import config from "./config"
import sendPrompt from "./prompts/send-prompt"
import roomIdsStorage from "./storage/room-ids"
import Log from "./utils/logger"

export function scheduleRoomPrompts(roomId: string) {
  Log.log("Scheduling prompts for room " + roomId)

  for (const cron of config.schedules) {
    Log.log(cron)
    const job = schedule.scheduleJob(cron, function () {
      // Check if we are still subscribed to this room
      if (!roomIdsStorage.get().includes(roomId)) return

      sendPrompt(roomId)
    })
    const date = job.nextInvocation()
    Log.log(`Cron ${cron} for room ${roomId} successfully scheduled on ${date}`)
  }
}

export default function schedulePrompts() {
  const roomIds = roomIdsStorage.get()
  if (roomIds.length === 0) {
    Log.warn("No roomId configured, nothing to schedule")
    return
  }

  for (const roomId of roomIds) {
    scheduleRoomPrompts(roomId)
  }
}
