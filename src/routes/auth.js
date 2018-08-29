import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator/check';
import User from './../models/User';

const router = express.Router({});

router.post(
	'/register',
	[body('email').isEmail(), body('password').isLength({ min: 5 })],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		} else {
			User.create(
				{
					email: req.body.email,
					password: req.body.password,
				},
				(err, user) => {
					if (err) {
						res.status(500).json({ error: err });
					} else {
						res.status(200).json({
							user: user.email,
						});
					}
				}
			);
		}
	}
);

router.post('/login', function(req, res, _) {
	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err) {
			return res.status(500).json({
				message: 'Something went wrong',
				err,
			});
		}
		if (!user) {
			return res.status(400).json({
				message: info.message,
			});
		}
		req.login(user, { session: false }, err => {
			if (err) {
				return res.send(err);
			}
			const payload = {
				id: user.id,
				email: user.email,
			};
			const token = jwt.sign(payload, process.env.JWT_SECRET);
			return res.json({ token });
		});
	})(req, res);
});

export default router;
