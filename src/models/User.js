import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;
export const UserSchemaName = 'User';
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			lowercase: true,
			index: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

UserSchema.pre('save', function(next) {
	const user = this;
	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	const user = this;
	bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

UserSchema.methods.getNotSensitiveData = function() {
	const user = this;
	return {
		id: user.id,
		email: user.email,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	};
};

export default mongoose.model(UserSchemaName, UserSchema);
