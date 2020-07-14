"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Utils {
    constructor(bot) {
        this.bot = bot;
    }
    log(content, type = 'info') {
        const tag = chalk_1.default.bold.gray(`[${this.textFormat(type, 'upper')}]`);
        const text = chalk_1.default.yellow(content);
        const time = chalk_1.default.cyan(`[${this.toDate(Date.now())}]`);
        const streamType = type === 'err' ? process.stderr : process.stdout;
        streamType.write(`${time} ${tag} ${text}\n`);
    }
    textFormat(text, type) {
        if (type === 'upper') {
            return text[0].toUpperCase() + text.slice(1);
        }
        return text;
    }
    toDate(ms) {
        const formatter = new Intl.DateTimeFormat('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        const [date, time] = formatter.format(ms).split(',');
        return `${date.trim()} ${time.trim()}`;
    }
}
exports.Utils = Utils;
