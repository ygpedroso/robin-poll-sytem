module.exports = {
	verbose: true,
	roots: ['<rootDir>/src'],
	testURL: 'http://localhost/',
	transform: {
		'^.+\\.js?$': 'babel-jest',
	},
};
