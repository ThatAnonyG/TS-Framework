import { GuildEntity } from "./lib/models/GuildModel";
import { UserEntity } from "./lib/models/UserModel";
import { MemberEntity } from "./lib/models/MemberModel";

declare module "discord.js" {
  interface Message {
    em(content: string): Promise<Message>;

    embed: MessageEmbed;
  }

  interface Guild {
    db?: GuildEntity;

    _init(): void;
  }

  interface User {
    db?: UserEntity;

    _init(): void;
  }

  interface GuildMember {
    db?: MemberEntity;

    _init(): void;
  }
}
