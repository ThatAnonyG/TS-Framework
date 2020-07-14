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
class Test extends lib_1.Command {
    constructor() {
        super('test', {
            category: 'dev',
            description: 'Test command for anything'
        });
    }
    run(message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES'));
        });
    }
}
exports.default = Test;
