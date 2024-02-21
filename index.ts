import { AutojoinRoomsMixin } from "matrix-bot-sdk"
import client from "./src/client"
import handleRoomMessage from "./src/handle-room-message"

AutojoinRoomsMixin.setupOnClient(client)
client.on("room.message", handleRoomMessage)
client.start().then(() => console.log("Bot started!"))
