import { Structures } from "discord.js";
import { UserModel } from "../models/UserModel";
import { Document } from "mongoose";

export default () => {
  Structures.extend(
    "User",
    (User) =>
      class extends User {
        public db?: Document;

        constructor() {
          super(arguments[0], arguments[1]);
        }

        public _init() {
          UserModel.findOne({ id: this.id }, (err, doc) => {
            if (err) throw err;
            this.db =
              doc ||
              new UserModel({
                id: this.id,
              });
          });
        }
      }
  );
};
