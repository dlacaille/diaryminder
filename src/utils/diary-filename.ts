export default function diaryFilename(roomId: string) {
  return "diary." + roomId.replace(/[^\da-z]/gi, "_") + ".txt"
}
