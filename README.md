# Diaryminder

A companion for Matrix to remind you to keep a diary using configurable prompts and schedules

## Getting an access token

To use your bot, you will need an access token for a user account of your matrix server.

First, create an account. You can name it Diaryminder.

Then, modify `login.mjs` and input the account's username and password.

Finally, run `node login.mjs` and copy the access token.

## Configuration

To configure, copy the `config.sample.json` file in this repository and configure it to your liking, then save it as `config.json`

```json
{
  "home": "https://matrix.my.domain",
  "token": "TOKEN_HERE",
  "variables": {
    "name": "Alice"
  },
  "prompts": [
    "${name} made the cutest face when… Describe it!",
    "Did ${name} teach you something cool today? What was it?",
    "Did you and ${name} have a disagreement today? How did you resolve it in a way that strengthened your connection?",
    "Imagine if you and ${name} had a superpower together. What would it be and what would you do?",
    "Spill the tea! What embarrassing (but adorable) thing did ${name} do?"
  ],
  "schedules": ["0 9 * * *"]
}
```

## Schedules

Schedules follow the [Cron expression format](https://crontab.cronhub.io/)

Use it to customize when prompts get sent to you. In the example above `"0 9 * * *"` would send a prompt every day at 9:00, in your server's time zone.

## Using the bot

```
npm run dev
```

Once you start the bot, it will look for `config.json`, a new `matrix-bot.json` file will be created and your bot will start listening.

Initially the bot will not do anything, you have to first wake it up.

To do so, simply send any message to Diaryminder and the initial setup will begin. The bot will ask you to say start, then the prompt schedule will start.
