import { AutojoinRoomsMixin } from "matrix-bot-sdk"
import client from "./src/client"
import handleRoomMessage from "./src/handle-room-message"
import schedulePrompts from "./src/schedule-prompts"

AutojoinRoomsMixin.setupOnClient(client)
client.on("room.message", handleRoomMessage)
client.start().then(() => {
  console.log("Bot started!")
  const date = schedulePrompts()
  if (date) console.log("Next message scheduled on " + date)
})
