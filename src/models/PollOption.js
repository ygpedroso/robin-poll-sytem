import mongoose from 'mongoose';
import { PollSchemaName } from './Poll';
import { UserSchemaName } from './User';

const Schema = mongoose.Schema;
export const PollOptionSchemaName = 'PollOption';

const PollOption = new Schema(
	{
		value: {
			type: String,
			required: true,
			index: true,
		},
		pollId: {
			type: Schema.Types.ObjectId,
			ref: PollSchemaName,
			required: true,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: UserSchemaName,
			required: true,
		},
	},
	{ timestamps: true }
);

PollOption.index({ value: 1, pollId: 1 }, { unique: true });

export default mongoose.model(PollOptionSchemaName, PollOption);
