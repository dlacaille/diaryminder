import path from "node:path"
import config from "../config"

export default function dirPath(...paths: string[]) {
  return path.join(config.dir, ...paths)
}
