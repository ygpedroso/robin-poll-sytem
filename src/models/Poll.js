import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;
export const PollSchemaName = 'Poll';

const PollSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			index: true,
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
