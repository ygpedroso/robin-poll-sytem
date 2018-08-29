export default (err, req, res, next) => {
	res.boom.badImplementation('This is probably our fault', { data: err });
};
