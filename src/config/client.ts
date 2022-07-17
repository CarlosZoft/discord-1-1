import "dotenv/config";
import { Client, Intents } from "discord.js";
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

async function login() {
  try {
    const logged = await client.login(process.env.DISCORD_TOKEN);
    console.log(`login successfully ${logged}`);
  } catch (error) {
    console.log(error);
  } finally {
    return client;
  }
}
export { login };
