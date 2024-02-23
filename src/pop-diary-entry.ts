import fs from "node:fs"
import readLastLines from "read-last-lines"
import diaryFilename from "./utils/diary-filename"
import dirPath from "./utils/dir-path"
import Log from "./utils/logger"

export default function popDiaryEntry(roomId: string, sender: string) {
  const filename = diaryFilename(roomId)
  const path = dirPath(filename)

  readLastLines.read(path, 1).then((line: string) => {
    if (line.indexOf(sender) !== 0) {
      // Do not pop the entry if the sender is wrong
      return
    }

    fs.stat(path, (error, stats) => {
      if (error) throw error
      fs.truncate(path, stats.size - line.length, (error) => {
        if (error) throw error
        Log.log("Truncated last line from " + filename)
      })
    })
  })
}
