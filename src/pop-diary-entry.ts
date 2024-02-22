import fs from "node:fs"
import readLastLines from "read-last-lines"
import diaryFilename from "./utils/diary-filename"

export default function popDiaryEntry(roomId: string, sender: string) {
  const filename = diaryFilename(roomId)

  readLastLines.read(filename, 1).then((line: string) => {
    if (line.indexOf(sender) !== 0) {
      // Do not pop the entry if the sender is wrong
      return
    }

    fs.stat(filename, (error, stats) => {
      if (error) throw error
      fs.truncate(filename, stats.size - line.length, (error) => {
        if (error) throw error
        console.log("Truncated last line from " + filename)
      })
    })
  })
}
