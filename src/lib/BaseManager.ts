import { Client, Collection } from 'discord.js';
import { Handler } from './managers/Handler';
import { Utils } from './utils/Utils';
import { createConnection } from 'typeorm';
import { Command } from './structure/command';
import { readdirSync } from 'fs';
const config = require('../../config.json');

export class BaseManager extends Client {
	private TOKEN: string;
	private type: 'dev' | 'prod' = 'dev';
	public commands: Collection<string, Command> = new Collection();
	public handler: Handler = new Handler(this);
	public utils = new Utils(this);
	public config?: any = config;

	public constructor(TOKEN: string, type: 'dev' | 'prod') {
		super();
		this.TOKEN = TOKEN;
		this.type = type;
	}

	public start(paths: { events: string; commands: string }) {
		this.handler.loadAll({ cmd: paths.commands, evt: paths.events });
		super
			.login(this.TOKEN)
			.then(() =>
				this.utils.log(
					`[Discord Client] => Connected as ${this.user!.username}!`
				)
			)
			.catch((e) => {
				if (e) this.utils.log(e.message, 'error');
			});
	}

	public loadMongo(uri: string) {
		createConnection({
			type: 'mongodb',
			url: uri,
			useUnifiedTopology: true,
			useNewUrlParser: true,
			entities: []
		})
			.then(() => this.utils.log('[MongoDB] => Connected!'))
			.catch((e) => {
				if (e) this.utils.log(e.message, 'error');
			});
	}

	public getConfig(key: string) {
		return this.config[this.type][key];
	}

	public loadCmd(cmd: string) {
		const cats = readdirSync(__dirname + '/../bot/commands/').filter(
			(f) => !f.endsWith('.js')
		);

		for (let cat of cats) {
			const files = readdirSync(__dirname + `/../bot/commands/${cat}/`)
				.filter((f) => f.endsWith('.js'))
				.map((x) => x.split('.').shift());
			if (!files.map((f) => f!.toLowerCase()).includes(cmd.toLowerCase()))
				continue;

			let { default: command } = require(__dirname +
				`/../bot/commands/${cat}/${cmd}`);
			if (!command) this.utils.log('No command file found!', 'error');

			command = new command();
			command.bot = this;
			this.commands.set(command.name, command);
			return command;
		}
	}
}
