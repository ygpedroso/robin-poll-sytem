import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from './../models/User';

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET,
		},
		function(jwtPayload, cb) {
			return User.findById(jwtPayload.id)
				.then(user => {
					return cb(null, user.getNotSensitiveData());
				})
				.catch(err => {
					return cb(err);
				});
		}
	)
);
