import express from 'express';
import passport from 'passport';
import { body, validationResult } from 'express-validator/check';
import Poll from './../models/Poll';
const router = express.Router({});

router.get('/', (req, res) => {
	Poll.find({}, (err, polls) => {
		if (err) {
			return res.status(500).json({
				message: 'Something went wrong',
				err,
			});
		}
		return res.send(polls);
	});
});

router.get('/:id', (req, res) => {
	Poll.findById(req.params.id, (err, poll) => {
		if (err) {
			return res.status(500).json({
				message: 'Something went wrong',
				err,
			});
		}
		if (!poll) {
			return res.boom.notFound();
		}
		return res.send(poll);
	});
});

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	[body('title').isLength({ min: 1 })],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		} else {
			Poll.create({ title: req.body.title, createdBy: req.user.id }, (err, poll) => {
				if (err) {
					return res.status(500).json({
						message: 'Something went wrong',
						err,
					});
				}
				return res.send(poll);
			});
		}
	}
);

router.post('/:id/close', passport.authenticate('jwt', { session: false }), (req, res) => {
	Poll.findById(req.params.id, (err, poll) => {
		if (err) {
			return res.status(500).json({
				message: 'Something went wrong',
				err,
			});
		}
		if (!poll) {
			return res.boom.notFound();
		}
		poll.open = false;
		poll.save();
		return res.send(poll);
	});
});

export default router;
