import mongoose from 'mongoose';
import { PollSchemaName } from './Poll';

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
	},
	{ timestamps: true }
);

export default mongoose.model(PollOptionSchemaName, PollOption);
