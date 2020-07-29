import { Structures } from "discord.js";
import { MemberEntity } from "../models/MemberModel";

export default () => {
  Structures.extend(
    "GuildMember",
    (GuildMember) =>
      class extends GuildMember {
        public db?: MemberEntity;

        public constructor() {
          super(arguments[0], arguments[1], arguments[2]);
          (async () => await this._init())();
        }

        public async _init() {
          this.db =
            (await MemberEntity.findOne({
              id: this.id,
              guild: this.guild.id,
            })) || new MemberEntity(this.id, this.guild.id);
        }
      }
  );
};
