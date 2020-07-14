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
const lib_1 = require("../../../lib");
class Manage extends lib_1.Command {
    constructor() {
        super('manage', {
            category: 'dev',
            description: 'Load, reload or unload a command'
        });
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = args[0];
            if (!name)
                return message.em(`Please provide a command name.`);
            const action = args[1];
            if (!action)
                return message.em(`Please provide a appropriate action.`);
            const command = this.bot.handler.getCmd(name);
            if (!command && action !== 'load')
                return message.em(`No command found with name: \`${name}\`.`);
            switch (action) {
                case 'load':
                    const cmd = yield this.bot.loadCmd(name);
                    message.em(`Loaded command: \`${cmd.name}\`.`);
                    break;
                case 'reload':
                    command.reload();
                    message.em(`Reloaded command: \`${command.name}\`.`);
                    break;
                case 'unload':
                    command.unload();
                    message.em(`Unloaded command: \`${command.name}\`.`);
                    break;
            }
        });
    }
}
exports.default = Manage;
