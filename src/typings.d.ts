import { Document } from 'mongoose';

declare module 'discord.js' {
	interface Message {
		em(content: string): Promise<Message>;
	}

	interface Guild {
		db?: Document;

		_init(): void;
	}

	interface User {
		db?: Document;

		_init(): void;
	}

	interface GuildMember {
		db?: Document;

		_init(): void;
	}
}
