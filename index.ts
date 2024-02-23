import { AutojoinRoomsMixin } from "matrix-bot-sdk"
import client from "./src/client"
import handleRoomMessage from "./src/handle-room-message"
import schedulePrompts from "./src/schedule-prompts"
import Log from "./src/utils/logger"

AutojoinRoomsMixin.setupOnClient(client)
client.on("room.message", handleRoomMessage)
client.start().then(() => {
  Log.log("Bot started")
  schedulePrompts()
})
