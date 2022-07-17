import { client } from "./client";

const getGuild = (guildId: string) => {
  return client.guilds.cache.get(guildId);
};

const getMembers = async (guildId: string) => {
  try {
    const guild = getGuild(guildId);
    if (!guild) {
      throw new Error("No guild found");
    }
    const members = await guild.members.fetch();
    return members;
  } catch (error) {
    console.error(error);
  }
};

const getMembersByIds = async (guildId: string, ids: string[]) => {
  try {
    const members = await getMembers(guildId);
    const filteredMembers = members?.filter((member) =>
      ids.includes(String(member.id))
    );
    return filteredMembers;
  } catch (error) {
    console.error(error);
  }
};

const createChannel = async (
  guildId: string,
  categoryId: string,
  name: string
) => {
  try {
    const guild = getGuild(guildId);
    if (!guild) throw new Error("No guild found");

    const category = guild.channels.cache.get(categoryId);
    if (!category) throw new Error("No category found");

    const channel = await guild.channels.create(name, {
      type: "GUILD_TEXT",
      parent: categoryId,
    });
    return channel;
  } catch (error) {
    console.error(error);
  }
};

export { getGuild, getMembers, getMembersByIds, createChannel };
