import { Structures } from "discord.js";
import { UserEntity } from "../models/UserModel";

export default () => {
  Structures.extend(
    "User",
    (User) =>
      class extends User {
        public db?: UserEntity;

        public constructor() {
          super(arguments[0], arguments[1]);
          (async () => await this._init())();
        }

        public async _init() {
          this.db =
            (await UserEntity.findOne({
              id: this.id,
            })) || new UserEntity(this.id);
        }
      }
  );
};
