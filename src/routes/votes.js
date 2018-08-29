import express from 'express';
import status500 from '../status/500';
import Vote from '../models/Vote';
import Poll from '../models/Poll';
const router = express.Router({});

router.get('/:pollId/votes', (req, res) => {
	Poll.findById(req.params.pollId, (err, poll) => {
		if (err) {
			status500(res, err);
		}
		if (!poll) {
			res.boom.notFound();
		}
		Vote.find({ inPoll: poll.id }, (err, votes) => {
			if (err) {
				status500(res, err);
			}
			return res.send(votes);
		});
	});
});
export default router;
