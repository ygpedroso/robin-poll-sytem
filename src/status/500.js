export default (res, err) => {
	return res.status(500).json({
		message: 'Something went wrong',
		err,
	});
};
