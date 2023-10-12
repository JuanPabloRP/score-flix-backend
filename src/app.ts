import express from 'express';
import { reviewsRouter } from './routes/reviews';

const app = express();

app.use(express.json());
app.disable('x-powered-by');

app.use('/reviews', reviewsRouter);


const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server listening on port http:localhost:${PORT}`);
});
