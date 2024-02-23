import { RustSdkCryptoStorageProvider } from "matrix-bot-sdk"
import dirPath from "../utils/dir-path"

const cryptoProvider = new RustSdkCryptoStorageProvider(
  dirPath("matrix-bot-crypto.json"),
)

export default cryptoProvider
