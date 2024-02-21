import { SimpleFsStorageProvider } from "matrix-bot-sdk"
import dirPath from "../utils/dir-path"

const storage = new SimpleFsStorageProvider(dirPath("matrix-bot.json"))

export default storage
