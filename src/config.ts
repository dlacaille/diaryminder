import fs from "node:fs"
import { AppConfig } from "./types"

const loadConfig = (filename: string) => {
  if (!fs.existsSync(filename)) {
    throw new Error(`Could not find ${filename}`)
  }
  try {
    const json = fs.readFileSync(filename, { encoding: "utf8" }).toString()
    return JSON.parse(json) as AppConfig
  } catch (error) {
    console.error(`Could not load ${filename}`)
    throw error
  }
}

const config = loadConfig("config.json")!

export default config
