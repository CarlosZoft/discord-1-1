import { Client } from "discord.js";

class Methods {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  getGuild = async (guildId: string) => {
    try {
      return await this.client.guilds.cache.get(guildId);
    } catch (error) {
      console.log(error);
    }
  };

  getMembers = async (guildId: string) => {
    try {
      const guild = await this.getGuild(guildId);
      if (!guild) {
        throw new Error("No guild found");
      }
      const members = await guild.members.fetch();
      return members;
    } catch (error) {
      console.error(error);
    }
  };

  getMembersByIds = async (guildId: string, ids: string[]) => {
    try {
      const members = await this.getMembers(guildId);
      const filteredMembers = members?.filter((member) =>
        ids.includes(String(member.id))
      );
      return filteredMembers;
    } catch (error) {
      console.error(error);
    }
  };

  createChannel = async (guildId: string, categoryId: string, name: string) => {
    try {
      const guild = await this.getGuild(guildId);
      if (!guild) throw new Error("No guild found");

      const channel = await guild.channels.create(name, {
        type: "GUILD_TEXT",
        parent: categoryId,
      });
      return channel;
    } catch (error) {
      console.error(error);
    }
  };
}
export { Methods };
