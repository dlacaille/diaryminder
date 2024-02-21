import { MatrixClient } from "matrix-bot-sdk"
import storage from "./storage"
import config from "./config"

const { home, token } = config
const client = new MatrixClient(home, token, storage)

export default client
