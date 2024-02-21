import type { RoomCallback, Disposable } from "./types"

const callbackQueue: Record<string, Array<RoomCallback>> = {}

export async function waitForMessage(roomId: string): Promise<void> {
  return new Promise((resolve) => addRoomCallback(roomId, resolve))
}

function getRoomCallbacks(roomId: string) {
  if (callbackQueue[roomId] === undefined) {
    callbackQueue[roomId] = []
  }
  return callbackQueue[roomId]
}

export function addRoomCallback(
  roomId: string,
  callback: RoomCallback,
): Disposable {
  getRoomCallbacks(roomId).push(callback)

  return {
    dispose() {
      const idx = getRoomCallbacks(roomId).indexOf(callback)
      if (idx >= 0) getRoomCallbacks(roomId).splice(idx, 1)
    },
  }
}

export function consumeRoomCallback(roomId: string): RoomCallback | undefined {
  return getRoomCallbacks(roomId).shift()
}
