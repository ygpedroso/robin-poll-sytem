import express from 'express';
import Poll from '../models/Poll';
import PollOption from '../models/PollOption';
const router = express.Router({});

router.get('/', (req, res) => {
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

export default router;
