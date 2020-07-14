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
exports.Command = void 0;
class Command {
    constructor(name, options) {
        this.name = name;
        this.aliases = options.aliases || [];
        this.description = options.description;
        this.category = options.category;
        this.cd = options.cd || 0;
        this.userPerms = options.userPerms || [];
        this.botPerms = options.botPerms || [];
        this.editable = options.editable || false;
        this.usage = options.usage || 'No usage provided';
        this.example = options.example || [];
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield message.channel.send(`Seems like this command has no function yet.`);
        });
    }
    reload() {
        const path = __dirname + `/../../bot/commands/${this.category}/${this.name}.js`;
        delete require.cache[require.resolve(path)];
        const pull = require(path);
        this.bot.commands.delete(this.name);
        this.bot.commands.set(this.name, pull);
    }
    unload() {
        const path = __dirname + `/../../bot/commands/${this.category}/${this.name}.js`;
        delete require.cache[require.resolve(path)];
        this.bot.commands.delete(this.name);
    }
}
exports.Command = Command;
