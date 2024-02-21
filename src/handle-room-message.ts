import { consumeRoomCallback } from "./utils/callback-queue"
import client from "./client"
import help from "./prompts/help"
import initialSetup from "./prompts/initial-setup"
import sendPrompt from "./prompts/send-prompt"
import storage from "./storage"
import { roomIdKey } from "./storage/keys"

export default async function handleRoomMessage(roomId: string, event: any) {
  // Skip events that aren't text
  if (event["content"]?.["msgtype"] !== "m.text") return

  // Don't reply to our own messages
  if (event["sender"] === (await client.getUserId())) return

  // Get the message body
  const body = event["content"]["body"]

  // Check if any callbacks are in the queue
  const callback = consumeRoomCallback(roomId)
  if (callback) {
    callback(body, event)
    return
  }

  // Check if we have run initial setup for this room
  const storedRoomId = storage.readValue(roomIdKey)
  if (roomId !== storedRoomId) {
    initialSetup(roomId)
    return
  }

  // Check if the user typed a command
  if (body?.startsWith("!skip")) {
    sendPrompt(roomId)
    return
  }
  if (body?.startsWith("!init")) {
    initialSetup(roomId)
    return
  }
  if (body?.startsWith("!")) {
    client.replyNotice(roomId, event, help)
    return
  }
}
