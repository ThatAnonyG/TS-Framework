import { Event, Bot } from '../../lib';
import { Message } from 'discord.js';

export default class EMessage extends Event {
	constructor() {
		super('message');
	}

	public async run(bot: Bot, message: Message) {
		if (message.author.bot) return;
		if (!message.guild) return;
		if (!message.member) await message.guild.members.fetch(message.author);
		const prefix = bot.getConfig('prefix');

		// A safety check
		if (!message.guild.me!.hasPermission('SEND_MESSAGES')) return;

		// Declaring arguments, checking if the message starts with the prefix
		if (!message.content.startsWith(prefix)) return;
		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const key = args.shift()!.toLowerCase();

		// Trying to get the command
		const command = bot.handler.getCmd(key);
		if (command) command.run(message, args);
	}
}
