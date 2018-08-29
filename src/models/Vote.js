import mongoose from 'mongoose';
import { UserSchemaName } from './User';
import { PollSchemaName } from './Poll';
import { PollOptionSchemaName } from './PollOption';

const Schema = mongoose.Schema;
export const VoteSchemaName = 'Vote';

const Vote = new Schema(
	{
		byUser: {
			type: Schema.Types.ObjectId,
			ref: UserSchemaName,
			required: true,
		},
		inPoll: {
			type: Schema.Types.ObjectId,
			ref: PollSchemaName,
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
