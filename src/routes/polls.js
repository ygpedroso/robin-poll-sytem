import express from 'express';
import passport from 'passport';
import { body, validationResult } from 'express-validator/check';
import Poll from './../models/Poll';

const router = express.Router({});

router.get('/', (req, res, next) => {
	Poll.find({}, (err, polls) => {
		if (err) {
			return next(err);
		}
		res.send(polls);
	});
});

router.get('/:id', (req, res, next) => {
	Poll.findById(req.params.id)
		.populate('createdBy')
		.exec((err, poll) => {
			if (err) {
				return next(err);
			}
			if (!poll) {
				res.boom.notFound('Poll Resource not found');
			} else {
				return res.send(poll);
			}
		});
});

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	[body('title').isLength({ min: 1 })],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.boom.badRequest('Invalid params', { data: errors.array() });
		} else {
			Poll.create({ title: req.body.title, createdBy: req.user.id }, (err, poll) => {
				if (err) {
					return next(err);
				}
				res.status(201).send(poll);
			});
		}
	},
);

router.post('/:id/close', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	Poll.findById(req.params.id, (err, poll) => {
		if (err) {
			return next(err);
		}
		if (!poll) {
			res.boom.notFound('Poll Resource not found');
		} else {
			poll.open = false;
			poll.save();
			res.send(poll);
		}
	});
});

export default router;
