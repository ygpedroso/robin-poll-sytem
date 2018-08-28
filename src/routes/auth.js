import express from 'express';
import { check, validationResult } from 'express-validator/check';
import User from './../models/User';

const router = express.Router();

router.post(
	'/register',
	[check('email').isEmail(), check('password').isLength({ min: 5 })],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.boom.badRequest(errors.array());
		}
		User.create(
			{
				email: req.body.email,
				password: req.body.password,
			},
			(err, user) => {
				if (err) res.boom.badImplementation(err);
				return res.status(200).send();
			}
		);
	}
);

router.get('/login', function(req, res) {
	res.boom.notFound();
});

router.get('/logout', function(req, res) {
	res.boom.notFound();
});

export default router;
