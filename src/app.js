import express, { json } from 'express';
import { createReviewRouter } from './routes/reviews.js';
import { corsMiddleware } from './middlewares/cors.js';

export const createApp = ({ reviewModel }) => {
	const app = express();

	app.use(json());
	app.use(corsMiddleware());
	app.disable('x-powered-by');

	app.use('/reviews', createReviewRouter({ reviewModel }));

	const PORT = process.env.PORT || 3000;

	app.listen(PORT, () => {
		console.log(`Server listening on port http://localhost:${PORT}`);
	});

};