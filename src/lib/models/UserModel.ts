import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  id: String,
});

const UserModel = model("user", UserSchema);

export { UserModel };
