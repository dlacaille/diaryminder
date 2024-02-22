import fs from "node:fs"
import dirPath from "./utils/dir-path"
import diaryFilename from "./utils/diary-filename"

export default function logDiaryEntry(
  roomId: string,
  sender: string,
  text: string,
) {
  const date = new Date()
  const dateStr = date.toISOString()
  const filename = diaryFilename(roomId)
  const path = dirPath(filename)
  const entry = `${dateStr}: (${sender}) ${text}\n`
  fs.appendFileSync(path, entry, {
    encoding: "utf8",
  })
  console.log("Wrote diary entry in " + filename)
}
