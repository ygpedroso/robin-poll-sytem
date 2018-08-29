import request from 'supertest';
import app from '../../app/index';

describe('Suite of tests for the polls routes', () => {
	test('It should respond unauthorized when not Bearer token is provided', done => {
		request(app)
			.post('/api/v1/users/polls')
			.then(response => {
				expect(response.statusCode).toBe(401);
				done();
			});
	});
});
