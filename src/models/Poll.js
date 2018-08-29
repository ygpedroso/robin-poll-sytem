import mongoose from 'mongoose';
import { UserSchemaName } from './../models/User';

const Schema = mongoose.Schema;
export const PollSchemaName = 'Poll';

const PollSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			index: true,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: UserSchemaName,
			required: true,
		},
		open: {
			type: Boolean,
			default: true,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model(PollSchemaName, PollSchema);
