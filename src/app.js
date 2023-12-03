import express, { json } from 'express';
import { createReviewRouter } from './routes/reviews.js';
import { createUserRouter } from './routes/user.js';
import { corsMiddleware } from './middlewares/cors.js';
import { authMiddleware } from './middlewares/auth.js';
import { createAuthRouter } from './routes/auth.js';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

export const createApp = ({ reviewModel, userModel }) => {
	const app = express();

	app.use(json());

	//app.use(corsMiddleware());
	app.use(cors('*'));

	app.disable('x-powered-by');

	app.use('/auth', createAuthRouter({ userModel }));
	app.use(authMiddleware({ secret: process.env.JWT_SECRET }));

	app.use('/users', createUserRouter({ userModel }));
	app.use('/reviews', createReviewRouter({ reviewModel }));

	const PORT = process.env.PORT || 3000;

	app.listen(PORT, () => {
		console.log(`Server listening on port http://localhost:${PORT}`);
	});
};
