import { Structures } from 'discord.js';
import { GuildModel } from '../models/GuildModel';
import { Document } from 'mongoose';

export default () => {
	Structures.extend(
		'Guild',
		(Guild) =>
			class extends Guild {
				public db?: Document;

				constructor() {
					super(arguments[0], arguments[1]);
				}

				public _init() {
					GuildModel.findOne({ id: this.id }, (err, doc) => {
						if (err) throw err;
						this.db =
							doc ||
							new GuildModel({
								id: this.id
							});
					});
				}
			}
	);
};
