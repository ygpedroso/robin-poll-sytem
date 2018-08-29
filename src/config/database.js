import { ok } from 'assert';
import mongoose from 'mongoose';
import logger from 'winston-color';

const initDB = () => {
	try {
		const mongoUrl = process.env.DATABASE_URL;
		ok(mongoUrl, 'Missing environment variable for DATABASE_URL');
		mongoose
			.connect(
				mongoUrl,
				{
					useNewUrlParser: true,
				}
			)
			.then(() => logger.info('Database connection established'))
			.catch(e => logger.error(e.message));
	} catch (e) {
		logger.error(e.message);
	}
};

export default initDB;
