import express from 'express';
import passport from 'passport';
import Poll from '../models/Poll';
import status500 from '../status/500';
import PollOption from '../models/PollOption';
import { body, validationResult } from 'express-validator/check/index';

const router = express.Router({});

router.get('/:pollId/options', (req, res) => {
	PollOption.find({ pollId: req.params.pollId }, (err, pollOptions) => {
		if (err) {
			status500(res, err);
		}
		return res.send(pollOptions);
	});
});

router.get('/:pollId/options/:id', (req, res) => {
	PollOption.findById(req.params.id, (err, pollOption) => {
		if (err) {
			status500(res, err);
		}
		if (!pollOption) {
			return res.boom.notFound();
		}
		return res.send(pollOption);
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
					status500(res, err);
				}
				PollOption.create(
					{ value: req.body.value, pollId: poll.id, createdBy: req.user.id },
					(err, pollOption) => {
						if (err) {
							status500(res, err);
						}
						return res.status(201).send(pollOption);
					}
				);
			});
		}
	}
);

export default router;
