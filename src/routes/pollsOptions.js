import express from 'express';
import Poll from '../models/Poll';
import PollOption from '../models/PollOption';
import { body, validationResult } from 'express-validator/check/index';
import passport from 'passport/lib/index';

const router = express.Router({});

router.get('/:pollId/options', (req, res) => {
	console.log(req.params.pollId);
	PollOption.find({ pollId: req.params.pollId }, (err, pollOptions) => {
		if (err) {
			return res.status(500).json({
				message: 'Something went wrong',
				err,
			});
		}
		return res.send(pollOptions);
	});
});

router.post(
	'/:pollId/options',
	passport.authenticate('jwt', { session: false }),
	[body('value').isLength({ min: 1 })],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		} else {
			Poll.findById(req.params.pollId, (err, poll) => {
				if (err) {
					return res.status(500).json({
						message: 'Something went wrong',
						err,
					});
				}
				console.log(req.params.pollId);
				console.log(poll);
				PollOption.create(
					{ value: req.body.value, pollId: poll.id, createdBy: req.user.id },
					(err, pollOption) => {
						if (err) {
							return res.status(500).json({
								message: 'Something went wrong',
								err,
							});
						}
						return res.send(pollOption);
					}
				);
			});
		}
	}
);

export default router;
