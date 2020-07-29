import {
  Entity,
  BaseEntity,
  ObjectIdColumn,
  PrimaryColumn,
  ObjectID,
  Column,
} from "typeorm";
import { Snowflake } from "discord.js";

@Entity("members")
export class MemberEntity extends BaseEntity {
  @ObjectIdColumn() public _id?: ObjectID;
  @PrimaryColumn() public id: Snowflake;
  @PrimaryColumn() public guild: Snowflake;

  constructor(id: Snowflake, gid: Snowflake) {
    super();
    this.id = id;
    this.guild = gid;
  }
}
