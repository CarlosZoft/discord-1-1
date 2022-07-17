import {
  createGroupChat,
  ICreateGroupChatProps,
} from "./useCases/createGroupChat";
import { login } from "./config";

const paramsToCreateGroupChat: ICreateGroupChatProps = {
  categoryId: String(process.env.CATEGORY_ID),
  chatName: "chat-teste",
  guildId: String(process.env.GUILD_ID),
  participants: [],
};

(async () => {
  const client = await login();
  await createGroupChat(client, paramsToCreateGroupChat);
})();
