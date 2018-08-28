import express from 'express';
const router = express.Router();

router.get('/', function(req, res) {
	res.boom.notFound();
});

export default router;
