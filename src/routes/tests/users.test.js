import request from 'supertest';
import app from '../../app/index';

describe('Suite of tests for the users routes', () => {
	test('It should respond unauthorized when not Bearer token is provided', done => {
		request(app)
			.get('/api/v1/users/me')
			.then(response => {
				expect(response.statusCode).toBe(401);
				done();
			});
	});
});
