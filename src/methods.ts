import { client } from "./client";

const getGuild = (guildId: string) => {
  return client.guilds.cache.get(guildId);
};

const getMembers = async (guildId: string) => {
  const guild = getGuild(guildId);
  if (!guild) {
    throw new Error("No guild found");
  }
  const members = await guild.members.fetch();
  return members;
};

const getMembersByIds = async (guildId: string, ids: string[]) => {
  const members = await getMembers(guildId);
  const filteredMembers = members.filter((member) =>
    ids.includes(String(member.id))
  );
  return filteredMembers;
};

const createChannel = async (
  guildId: string,
  categoryId: string,
  name: string
) => {
  const guild = getGuild(guildId);
  if (!guild) {
    throw new Error("No guild found");
  }
  const channel = await guild.channels.create(name, {
    type: "GUILD_TEXT",
    parent: categoryId,
  });
  return channel;
};

export { getGuild, getMembers, getMembersByIds, createChannel };
