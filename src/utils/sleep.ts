export default async function sleep(timeMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMs)
  })
}
