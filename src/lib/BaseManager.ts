require("dotenv").config({
  path: __dirname + "../.env",
});
import { Client, Collection } from "discord.js";
import { Handler } from "./managers/Handler";
import { Utils } from "./utils/Utils";
import { createConnection } from "typeorm";
import { Command } from "./structure/command";
import config from "../config.json";
import { GuildEntity } from "./models/GuildModel";
import { UserEntity } from "./models/UserModel";
import { MemberEntity } from "./models/MemberModel";

export class BaseManager extends Client {
  private TOKEN: string;
  private readonly type: "dev" | "prod" = process.env.TYPE as "dev" | "prod";
  public commands: Collection<string, Command> = new Collection();
  public handler: Handler = new Handler(this);
  public utils = new Utils(this);
  public config?: any = config;

  public constructor() {
    super();
    this.TOKEN = config[this.type].token;
  }

  public start(paths: { events: string; commands: string }) {
    this.handler.loadAll({ cmd: paths.commands, evt: paths.events });
    super
      .login(this.TOKEN)
      .then(() =>
        this.utils.log(
          `[Discord Client] => Connected as ${this.user!.username}!`
        )
      )
      .catch((e) => {
        if (e) this.utils.log(e.message, "error");
      });
  }

  public loadMongo() {
    createConnection({
      type: "mongodb",
      url: this.config.get("mongo") as string,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      entities: [GuildEntity, UserEntity, MemberEntity],
      synchronize: true,
    })
      .then(() => this.utils.log("[MongoDB] => Connected!"))
      .catch((e) => {
        if (e) this.utils.log(e.message, "error");
      });
  }

  public getConfig(key: string) {
    return this.config[this.type][key];
  }
}
