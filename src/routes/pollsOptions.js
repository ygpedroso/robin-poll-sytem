import express from 'express';
import passport from 'passport';
import Poll from '../models/Poll';
import PollOption from '../models/PollOption';
import { body, validationResult } from 'express-validator/check/index';

const router = express.Router({});

router.get('/:pollId/options', (req, res, next) => {
	PollOption.find({ pollId: req.params.pollId }, (err, pollOptions) => {
		if (err) {
			next(err);
		}
		res.send(pollOptions);
	});
});

router.get('/:pollId/options/:id', (req, res, next) => {
	PollOption.findById(req.params.id, (err, pollOption) => {
		if (err) {
			next(err);
		}
		if (!pollOption) {
			res.boom.notFound('Poll Option Resource not found');
		}
		res.send(pollOption);
	});
});

router.post(
	'/:pollId/options',
	passport.authenticate('jwt', { session: false }),
	[body('value').isLength({ min: 1 })],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.boom.badRequest('Invalid params', { data: errors.array() });
		} else {
			Poll.findById(req.params.pollId, (err, poll) => {
				if (err) {
					next(err);
				}
				PollOption.create(
					{ value: req.body.value, pollId: poll.id, createdBy: req.user.id },
					(err, pollOption) => {
						if (err) {
							next(err);
						}
						res.status(201).send(pollOption);
					}
				);
			});
		}
	}
);

export default router;
