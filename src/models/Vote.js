import mongoose from 'mongoose';
import { PollOptionSchemaName } from './PollOption';
import { UserSchemaName } from './User';

const Schema = mongoose.Schema;
export const VoteSchemaName = 'Vote';

const Vote = new Schema(
	{
		byUser: {
			type: Schema.Types.ObjectId,
			ref: UserSchemaName,
			required: true,
		},
		forOption: {
			type: Schema.Types.ObjectId,
			ref: PollOptionSchemaName,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model(VoteSchemaName, Vote);
