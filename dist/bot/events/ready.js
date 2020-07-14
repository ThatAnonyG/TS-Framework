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
class Ready extends lib_1.Event {
    constructor() {
        super('ready');
    }
    run(bot) {
        return __awaiter(this, void 0, void 0, function* () {
            yield bot.user.setPresence({
                status: 'online',
                activity: {
                    name: 'Serving my master',
                    type: 'LISTENING'
                }
            });
        });
    }
}
exports.default = Ready;
