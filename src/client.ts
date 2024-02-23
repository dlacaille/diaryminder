import { MatrixClient } from "matrix-bot-sdk"
import storage from "./storage"
import config from "./config"
import cryptoProvider from "./storage/crypto-provider"

const { home, token } = config
const client = new MatrixClient(home, token, storage, cryptoProvider)

export default client
