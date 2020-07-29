//@ts-ignore

import { Command } from "../../../lib";

export default class extends Command {
  constructor() {
    super("NAME", {
      aliases: [""],
      description: "",
      usage: "",
      botPerms: [],
      userPerms: [],
    });
  }

  async run() {}
}
