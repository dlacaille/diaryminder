import { consumeRoomCallback } from "./callback-queue"
import client from "./client"
import help from "./help"
import sendPrompt from "./send-prompt"

export default async function handleRoomMessage(roomId: string, event: any) {
  // Skip events that aren't text
  if (event["content"]?.["msgtype"] !== "m.text") return

  // Don't reply to our own messages
  if (event["sender"] === (await client.getUserId())) return

  // Check if any callbacks are in the queue
  const callback = consumeRoomCallback(roomId)
  if (callback) {
    callback(event)
    return
  }

  // No callbacks, check if the user typed a command
  const body = event["content"]["body"]
  if (body?.startsWith("/skip")) {
    await sendPrompt(roomId)
    return
  }
  if (body?.startsWith("/test")) {
    await sendPrompt(roomId)
    return
  }
  if (body?.startsWith("/")) {
    await client.replyNotice(roomId, event, help)
    return
  }
}
