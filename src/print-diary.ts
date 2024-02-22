import readLastLines from "read-last-lines"
import client from "./client"
import diaryFilename from "./utils/diary-filename"

export default function printDiary(roomId: string, lines = 10) {
  const filename = diaryFilename(roomId)
  readLastLines.read(filename, lines).then((text: string) => {
    client.sendNotice(roomId, `\`\`\`\n${text}\n\`\`\``)
  })
}
