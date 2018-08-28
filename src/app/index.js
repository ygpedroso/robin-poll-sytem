import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import boom from 'express-boom';
import initDB from './../config/database';
import usersRouter from './../routes/users';

initDB();
const app = express();

app.use(boom());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);

export default app;
