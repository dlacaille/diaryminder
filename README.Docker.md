# Diaryminder

A companion for Matrix to remind you to keep a diary using configurable prompts and schedules.

Please refer to the [GitHub readme page](https://github.com/dlacaille/diaryminder) to learn more about setting up your Diaryminder.

# How to use

Once you have configured Diaryminder with a `config.json` file, run the following:

```sh
docker run -v ./matrix-bot.json:/usr/src/app/matrix-bot.json -v ./config.json:/usr/src/app/config.json -it diaryminder:latest
```

Note that two volumes are needed for
