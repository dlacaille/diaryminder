import { RustSdkCryptoStorageProvider } from "matrix-bot-sdk"
import dirPath from "../utils/dir-path"

const cryptoProvider = new RustSdkCryptoStorageProvider(dirPath("crypto"))

export default cryptoProvider
