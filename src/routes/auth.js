import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator/check';
import User from './../models/User';

const router = express.Router({});

router.post(
	'/register',
	[body('email').isEmail(), body('password').isLength({ min: 5 })],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.boom.badRequest('Invalid params', { data: errors.array() });
		} else {
			User.create(
				{
					email: req.body.email,
					password: req.body.password,
				},
				(err, user) => {
					if (err) {
						next(err);
					} else {
						res.status(201).send(user.getNotSensitiveData());
					}
				}
			);
		}
	}
);

router.post('/login', (req, res, next) => {
	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err) {
			next(err);
		}
		if (!user) {
			res.boom.badRequest(info.message);
		}
		req.login(user, { session: false }, err => {
			if (err) {
				next(err);
			}
			const payload = {
				id: user.id,
				email: user.email,
			};
			const token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: 86400,
			});
			res.send({ token });
		});
	})(req, res);
});

export default router;
