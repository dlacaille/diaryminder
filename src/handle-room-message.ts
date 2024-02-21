import { consumeRoomCallback } from "./utils/callback-queue"
import client from "./client"
import help from "./prompts/help"
import initialSetup from "./prompts/initial-setup"
import sendPrompt from "./prompts/send-prompt"
import logDiaryEntry from "./log-diary-entry"
import { MessageEvent } from "matrix-bot-sdk"
import roomIdsStorage from "./storage/room-ids"

function onCommand(command: string, roomId: string, event: MessageEvent<any>) {
  switch (command) {
    case "skip":
    case "next": {
      sendPrompt(roomId)
      break
    }
    case "init": {
      initialSetup(roomId)
      break
    }
    default: {
      client.replyNotice(roomId, event, help)
    }
  }
}

export default async function handleRoomMessage(roomId: string, raw: any) {
  // Build an event
  const event = new MessageEvent<any>(raw)

  // Skip events that aren't text
  if (event.messageType !== "m.text") return

  // Don't reply to our own messages
  if (event.sender === (await client.getUserId())) return

  // Get the message body
  const body = event.textBody

  // Set the message as read
  client.sendReadReceipt(roomId, event.eventId)

  // Check if any callbacks are in the queue
  const callback = consumeRoomCallback(roomId)
  if (callback) {
    callback(body, event)
    return
  }

  // Check if we have run initial setup for this room
  if (!roomIdsStorage.get().includes(roomId)) {
    initialSetup(roomId)
    return
  }

  // Check if the user typed a command
  if (body?.startsWith("!")) {
    onCommand(body.slice(1), roomId, event)
    return
  }

  // Anything else gets logged in the diary
  logDiaryEntry(roomId, event.sender, body)
}
