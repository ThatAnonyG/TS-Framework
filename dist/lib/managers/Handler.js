"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const fs_1 = require("fs");
class Handler {
    constructor(base) {
        this.manager = base;
    }
    loadCommand(dir) {
        const cats = fs_1.readdirSync(dir).filter((d) => !d.endsWith('.js'));
        cats.forEach((category) => {
            fs_1.readdirSync(`${dir}/${category}/`)
                .filter((f) => f.endsWith('.js'))
                .forEach((cmd) => {
                try {
                    let { default: command } = require(`${dir}/${category}/${cmd}`);
                    command = new command();
                    command.bot = this.manager;
                    this.manager.commands.set(command.name, command);
                }
                catch (e) {
                    this.manager.utils.log(`[${cmd}] => ${e.message}`, 'error');
                }
            });
        });
        this.manager.utils.log('[Command Handler] => Loaded all commands!');
    }
    loadEvent(dir) {
        fs_1.readdirSync(dir)
            .filter((f) => f.endsWith('.js'))
            .forEach((evt) => {
            try {
                let { default: event } = require(`${dir}/${evt}`);
                event = new event();
                this.manager.on(event.name, event.run.bind(null, this.manager));
            }
            catch (e) {
                this.manager.utils.log(`[${evt.name}] => ${e.message}`, 'error');
            }
        });
        this.manager.utils.log('[Event Handler] => Loaded all events!');
    }
    loadAll(path) {
        this.loadCommand(path.cmd);
        this.loadEvent(path.evt);
    }
    getCmd(name) {
        return (this.manager.commands.find((cmd) => cmd.name.toLowerCase() === name.toLowerCase() ||
            cmd.aliases.map((a) => a.toLowerCase()).includes(name.toLowerCase())) || null);
    }
}
exports.Handler = Handler;
