import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import boom from 'express-boom';
import passport from 'passport';
import initDB from './../config/database';
import authRouter from '../routes/auth';
import usersRouter from './../routes/users';
import pollsRouter from './../routes/polls';
import './../config/passport-local';
import './../config/passport-jwt';

initDB();
const app = express();

app.use(boom());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', passport.authenticate('jwt', { session: false }), usersRouter);
app.use('/api/v1/polls', pollsRouter);

app.use((_, res, next) => {
	res.boom.notFound();
});

export default app;
