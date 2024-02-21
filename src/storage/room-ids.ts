import storage from "."
import { roomIdsKey } from "./keys"

const roomIdsStorage = {
  get() {
    return JSON.parse(storage.readValue(roomIdsKey) ?? "[]") as string[]
  },
  set(roomIds: string[]) {
    storage.storeValue(roomIdsKey, JSON.stringify(roomIds))
  },
}

export default roomIdsStorage
