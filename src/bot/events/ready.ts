import { Event, Bot } from '../../lib';

export default class Ready extends Event {
	constructor() {
		super('ready');
	}

	public async run(bot: Bot) {
		await bot.user!.setPresence({
			status: 'online',
			activity: {
				name: 'Serving my master',
				type: 'LISTENING'
			}
		});
	}
}
