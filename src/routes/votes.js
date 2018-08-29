import express from 'express';
import passport from 'passport';
import Poll from '../models/Poll';
import PollOption from '../models/PollOption';
import Vote from '../models/Vote';

const router = express.Router({});

router.get('/:pollId/votes', (req, res, next) => {
	Poll.findById(req.params.pollId, (err, poll) => {
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

router.get('/:pollId/votes/:voteId', (req, res, next) => {
	Vote.findById(req.params.voteId)
		.populate('byUser')
		.populate('inPoll')
		.populate('forOption')
		.exec((err, vote) => {
			if (err) {
				return next(err);
			}
			res.send(vote);
		});
});

export default router;
