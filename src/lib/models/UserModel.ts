import {
  Entity,
  BaseEntity,
  ObjectIdColumn,
  PrimaryColumn,
  ObjectID,
} from "typeorm";
import { Snowflake } from "discord.js";

@Entity("users")
export class UserEntity extends BaseEntity {
  @ObjectIdColumn() public _id?: ObjectID;
  @PrimaryColumn() public id: Snowflake;

  constructor(id: Snowflake) {
    super();
    this.id = id;
  }
}
