import { model, Schema } from 'mongoose';

const GuildSchema = new Schema({
	id: String
});

const GuildModel = model('guild', GuildSchema);

export { GuildModel };
