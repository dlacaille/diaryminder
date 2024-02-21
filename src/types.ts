export type RoomCallback = (event: any) => void
export type Disposable = { dispose(): void }
export type AppConfig = {
  home: string
  token: string
  variables: Record<string, string>
  prompts: string[]
  schedules: string[]
}
