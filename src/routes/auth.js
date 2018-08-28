import express from 'express';
import { body, validationResult } from 'express-validator/check';
import User from './../models/User';

const router = express.Router();

router.post(
	'/register',
	[body('email').isEmail(), body('password').isLength({ min: 5 })],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.boom.badRequest();
		} else {
			User.create(
				{
					email: req.body.email,
					password: req.body.password,
				},
				(err, user) => {
					if (err) {
						res.boom.conflict(err);
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

router.get('/login', function(req, res) {
	res.boom.notFound();
});

router.get('/logout', function(req, res) {
	res.boom.notFound();
});

export default router;