import { AutojoinRoomsMixin } from "matrix-bot-sdk"
import client from "./src/client"
import schedulePrompts from "./src/schedule-prompts"
import Log from "./src/utils/logger"
import { setupRoomEvents } from "./src/handle-room-events"

AutojoinRoomsMixin.setupOnClient(client)
setupRoomEvents()
client.start().then(() => {
  Log.log("Bot started")
  schedulePrompts()
})
