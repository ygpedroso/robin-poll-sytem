import express from 'express';
const router = express.Router({});

router.get('/me', function(req, res) {
	res.send(req.user);
});

export default router;
