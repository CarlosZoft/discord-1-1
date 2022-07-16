import { HexColorString, MessageEmbed } from "discord.js";

interface IDefaultProps {
  color: HexColorString | "#0099ff";
  title: string | "";
  description: string | "";
}

const msgFormatter = ({ color, description, title }: IDefaultProps) => {
  const wellcomeEmbed = new MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(description);
  return wellcomeEmbed;
};

export { msgFormatter };
