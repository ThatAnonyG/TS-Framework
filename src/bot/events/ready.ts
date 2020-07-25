import { BotEvent, Bot } from "../../lib";

export default class Ready extends BotEvent {
  constructor() {
    super("ready");
  }

  public async run(bot: Bot) {
    await bot.user!.setPresence({
      status: "online",
      activity: {
        name: "Living a life",
        type: "LISTENING",
      },
    });
  }
}
