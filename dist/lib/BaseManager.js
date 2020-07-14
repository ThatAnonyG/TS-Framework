"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseManager = void 0;
const discord_js_1 = require("discord.js");
const Handler_1 = require("./managers/Handler");
const Utils_1 = require("./utils/Utils");
const typeorm_1 = require("typeorm");
const fs_1 = require("fs");
const config = require('../../config.json');
class BaseManager extends discord_js_1.Client {
    constructor(TOKEN, type) {
        super();
        this.type = 'dev';
        this.commands = new discord_js_1.Collection();
        this.handler = new Handler_1.Handler(this);
        this.utils = new Utils_1.Utils(this);
        this.config = config;
        this.TOKEN = TOKEN;
        this.type = type;
    }
    start(paths) {
        this.handler.loadAll({ cmd: paths.commands, evt: paths.events });
        super
            .login(this.TOKEN)
            .then(() => this.utils.log(`[Discord Client] => Connected as ${this.user.username}!`))
            .catch((e) => {
            if (e)
                this.utils.log(e.message, 'error');
        });
    }
    loadMongo(uri) {
        typeorm_1.createConnection({
            type: 'mongodb',
            url: uri,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            entities: []
        })
            .then(() => this.utils.log('[MongoDB] => Connected!'))
            .catch((e) => {
            if (e)
                this.utils.log(e.message, 'error');
        });
    }
    getConfig(key) {
        return this.config[this.type][key];
    }
    loadCmd(cmd) {
        const cats = fs_1.readdirSync(__dirname + '/../bot/commands/').filter((f) => !f.endsWith('.js'));
        for (let cat of cats) {
            const files = fs_1.readdirSync(__dirname + `/../bot/commands/${cat}/`)
                .filter((f) => f.endsWith('.js'))
                .map((x) => x.split('.').shift());
            if (!files.map((f) => f.toLowerCase()).includes(cmd.toLowerCase()))
                continue;
            let { default: command } = require(__dirname +
                `/../bot/commands/${cat}/${cmd}`);
            if (!command)
                this.utils.log('No command file found!', 'error');
            command = new command();
            command.bot = this;
            this.commands.set(command.name, command);
            return command;
        }
    }
}
exports.BaseManager = BaseManager;
