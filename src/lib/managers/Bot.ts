import { BaseManager } from '../BaseManager';

require('../structure/Message').default();
require('../structure/Guild').default();
require('../structure/GuildMember').default();
require('../structure/User').default();

export class Bot extends BaseManager {
	constructor(token: string, type: 'dev' | 'prod') {
		super(token, type);
	}

	public botStart() {
		this.loadMongo(this.getConfig('mongo'));
		this.start({
			events: __dirname + '/../../bot/events',
			commands: __dirname + '/../../bot/commands'
		});
	}

	public botReload() {}

	public botStop() {
		try {
			process.exit();
		} catch (e) {
			this.utils.log(e.message, 'error');
		}
	}
}
