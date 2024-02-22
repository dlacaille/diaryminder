import readLastLines from "read-last-lines"
import client from "./client"
import diaryFilename from "./utils/diary-filename"
import dirPath from "./utils/dir-path"

export default function printDiary(roomId: string, lines = 10) {
  const filename = diaryFilename(roomId)
  const path = dirPath(filename)

  readLastLines.read(path, lines).then((text: string) => {
    client.sendNotice(roomId, text.trimEnd())
  })
}
