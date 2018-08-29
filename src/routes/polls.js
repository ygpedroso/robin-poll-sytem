import express from 'express';
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

export default router;
