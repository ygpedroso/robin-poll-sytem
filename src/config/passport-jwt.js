import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from './../models/User';

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET,
		},
		(jwtPayload, done) => {
			User.findById(jwtPayload.id, (err, user) => {
				if (err || !user) {
					return done(err);
				}
				return done(null, user);
			});
		}
	)
);
