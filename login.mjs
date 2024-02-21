import { MatrixAuth } from "matrix-bot-sdk";

const homeserverUrl = "https://matrix.lacaille.app";

const auth = new MatrixAuth(homeserverUrl);
const client = await auth.passwordLogin("diaryminder", "REPLACE_ME");

console.log(
  "Copy this access token to your bot's config: ",
  client.accessToken,
);
