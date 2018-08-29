import express from 'express';
import passport from 'passport';
import Poll from '../models/Poll';
import PollOption from '../models/PollOption';
import Vote from '../models/Vote';
import { body, validationResult } from 'express-validator/check/index';

const router = express.Router({});

router.get('/:pollId/votes', (req, res, next) => {
	Poll.find({ pollId: req.params.pollId }, (err, poll) => {
		if (err) {
			return next(err);
		}
		if (!poll) {
			res.boom.notFound('Poll Resource not found');
		} else {
			Vote.find({ inPoll: poll.id })
				.populate('forOption')
				.exec((err, votes) => {
					if (err) {
						return next(err);
					}
					res.send(votes);
				});
		}
	});
});

export default router;
