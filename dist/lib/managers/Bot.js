"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const BaseManager_1 = require("../BaseManager");
require('../structure/message').default();
class Bot extends BaseManager_1.BaseManager {
    constructor(token, type) {
        super(token, type);
    }
    botStart() {
        this.loadMongo(this.getConfig('mongo'));
        this.start({
            events: __dirname + '/../../bot/events',
            commands: __dirname + '/../../bot/commands'
        });
    }
    botReload() { }
    botStop() {
        try {
            process.exit();
        }
        catch (e) {
            this.utils.log(e.message, 'error');
        }
    }
}
exports.Bot = Bot;
