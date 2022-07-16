import { createChannel, getMembersByIds, getGuild } from "../methods";
import { msgFormatter } from "../helpers/msgFormatter";

interface ICreateGroupChatProps {
  guildId: string;
  categoryId: string;
  chatName: string;
  participants: string[];
}

const createGroupChat = async ({
  categoryId,
  chatName,
  guildId,
  participants,
}: ICreateGroupChatProps) => {
  const [users, channel] = await Promise.all([
    getMembersByIds(guildId, participants),
    createChannel(guildId, categoryId, chatName),
  ]);

  const actions = users?.map(async (user) => {
    await channel?.permissionOverwrites.edit(user, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true,
    });
    await user.send({
      embeds: [
        msgFormatter({
          color: "#0099ff",
          title: "Você foi convidado para uma conversa!",
          description: `Entre em ${channel} para participar!`,
        }),
      ],
    });
  });

  if (actions) await Promise.all(actions);

  await channel.send({
    embeds: [
      msgFormatter({
        color: "#0099ff",
        title: "Novo assunto!",
        description: `Conversem sobre: café\n\n${users
          .map((user) => `${user}`)
          .join("\n")}`,
      }),
    ],
  });
};

export { createGroupChat };
