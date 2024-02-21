import { waitForMessage } from "../utils/callback-queue"
import client from "../client"
import schedulePrompts from "../schedule-prompts"
import storage from "../storage"
import { roomIdKey } from "../storage/keys"
import sleep from "../utils/sleep"

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
  storage.storeValue(roomIdKey, roomId)
  console.log("Initial setup completed for roomId " + roomId)
  const date = schedulePrompts()
  await client.sendNotice(roomId, "Setup completed!")
  await client.sendNotice(roomId, "Next message is scheduled for " + date)
}
