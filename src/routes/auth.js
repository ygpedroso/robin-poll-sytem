import express from 'express';
const router = express.Router();

router.get('/register', function(req, res) {
	res.boom.notFound();
});

router.get('/login', function(req, res) {
	res.boom.notFound();
});

router.get('/logout', function(req, res) {
	res.boom.notFound();
});

export default router;
