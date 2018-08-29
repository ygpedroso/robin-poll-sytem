import request from 'supertest';
import app from '../../app';

describe('Suite of tests for the auth routes', () => {
	test('It should respond bad request if body data is not provided', done => {
		request(app)
			.post('/api/v1/auth/register')
			.then(response => {
				expect(response.statusCode).toBe(400);
				done();
			});
	});
});
