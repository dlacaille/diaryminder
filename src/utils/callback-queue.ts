import type { RoomCallback, Disposable } from "../types"

const callbackQueue: Record<string, Array<RoomCallback>> = {}

export async function waitForMessage(
  roomId: string,
): Promise<{ body: string; event: any }> {
  return new Promise((resolve) =>
    addRoomCallback(roomId, (body, event) => {
      resolve({ body, event })
    }),
  )
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
      const index = getRoomCallbacks(roomId).indexOf(callback)
      if (index >= 0) getRoomCallbacks(roomId).splice(index, 1)
    },
  }
}

export function consumeRoomCallback(roomId: string): RoomCallback | undefined {
  return getRoomCallbacks(roomId).shift()
}
