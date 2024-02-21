export type RoomCallback = (body: string, event: any) => void
export type Disposable = { dispose(): void }
export type AppConfig = {
  dir: string
  home: string
  token: string
  variables: Record<string, string>
  prompts: string[]
  schedules: string[]
}
