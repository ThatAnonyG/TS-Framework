import { Structures } from 'discord.js';
import { MemberModel } from '../models/MemberModel';
import { Document } from 'mongoose';

export default () => {
	Structures.extend(
		'GuildMember',
		(GuildMember) =>
			class extends GuildMember {
				public db?: Document;

				constructor() {
					super(arguments[0], arguments[1], arguments[2]);
				}

				public _init() {
					MemberModel.findOne(
						{ id: this.id, gid: this.guild.id },
						(err, doc) => {
							if (err) throw err;
							this.db =
								doc ||
								new MemberModel({
									gid: this.guild.id,
									id: this.id
								});
						}
					);
				}
			}
	);
};
