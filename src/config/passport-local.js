import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './../models/User';

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		(email, password, done) => {
			User.findOne({ email })
				.select('+password')
				.exec((err, user) => {
					if (err) {
						return done(err);
					}
					if (!user) {
						return done(null, false, { message: 'Incorrect username.' });
					}
					user.comparePassword(password, (err, isMatch) => {
						if (err) {
							return done(err);
						}
						if (!isMatch) {
							return done(null, false, { message: 'Incorrect password.' });
						}
						return done(null, user);
					});
				});
		}
	)
);
