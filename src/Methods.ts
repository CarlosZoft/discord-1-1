import { Client, Guild } from "discord.js";

class Methods {
  client: Client;
  guildId: string;

  constructor(client: Client, guildId: string) {
    this.client = client;
    this.guildId = guildId;
  }
  getGuild = async () => {
    try {
      const guild = await this.client.guilds.cache.get(this.guildId);
      if (!guild) {
        throw new Error("No guild found");
      }
      return guild;
    } catch (error) {
      console.error(error);
    }
  };
  getMembers = async () => {
    try {
      const guild = await this.getGuild();
      const members = await guild?.members.fetch();

      return members;
    } catch (error) {
      console.error(error);
    }
  };

  getMembersByIds = async (ids: string[]) => {
    try {
      const members = await this.getMembers();
      const filteredMembers = members?.filter((member) =>
        ids.includes(String(member.id))
      );
      return filteredMembers;
    } catch (error) {
      console.error(error);
    }
  };

  createChannel = async (categoryId: string, name: string) => {
    try {
      const guild = await this.getGuild();
      const channel = await guild?.channels.create(name, {
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
