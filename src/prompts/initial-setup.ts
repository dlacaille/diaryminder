import { waitForMessage } from "../utils/callback-queue"
import client from "../client"
import { scheduleRoomPrompts } from "../schedule-prompts"
import sleep from "../utils/sleep"
import roomIdsStorage from "../storage/room-ids"
import Log from "../utils/logger"

async function writeMessages(roomId: string, messages: string[]) {
  let message: string
  do {
    message = messages.shift()
    await client.sendText(roomId, message)
    await sleep(1000)
  } while (messages.length > 0)
}

async function waitForStart(roomId: string) {
  let body: string
  do {
    await client.sendNotice(roomId, "To get started, please type `start`")
    const result = await waitForMessage(roomId)
    body = result.body
  } while (!body.startsWith("start"))
}

export default async function initialSetup(roomId: string) {
  await writeMessages(roomId, [
    "Hi! 👋 I am DiaryMinder",
    "My job is to remind you on schedule to write diary entries",
  ])
  await waitForStart(roomId)
  const roomIds = roomIdsStorage.get()
  if (!roomIds.includes(roomId)) {
    roomIds.push(roomId)
    roomIdsStorage.set(roomIds)
  }
  Log.log("Initial setup completed for roomId " + roomId)
  scheduleRoomPrompts(roomId)
  await client.sendNotice(roomId, "Setup completed!")
}
