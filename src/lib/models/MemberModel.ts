import { model, Schema } from 'mongoose';

const MemberSchema = new Schema({
	gid: String,
	id: String
});

const MemberModel = model('member', MemberSchema);

export { MemberModel };
