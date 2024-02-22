import storage from "."
import { promptHashHistoryKey } from "./keys"

const promptHashHistoryStorage = {
  get() {
    return JSON.parse(
      storage.readValue(promptHashHistoryKey) ?? "[]",
    ) as number[]
  },
  set(history: number[]) {
    storage.storeValue(promptHashHistoryKey, JSON.stringify(history))
  },
}

export default promptHashHistoryStorage
