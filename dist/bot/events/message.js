"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
class EMessage extends lib_1.Event {
    constructor() {
        super('message');
    }
    run(bot, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.author.bot)
                return;
            if (!message.guild)
                return;
            if (!message.member)
                yield message.guild.members.fetch(message.author);
            const prefix = bot.getConfig('prefix');
            // A safety check
            if (!message.guild.me.hasPermission('SEND_MESSAGES'))
                return;
            // Declaring arguments, checking if the message starts with the prefix
            if (!message.content.startsWith(prefix))
                return;
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const key = args.shift().toLowerCase();
            // Trying to get the command
            const command = bot.handler.getCmd(key);
            if (command)
                command.run(message, args);
        });
    }
}
exports.default = EMessage;
