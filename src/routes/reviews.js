import { Router } from 'express';
import { ReviewsController } from '../controllers/reviews.js';

export const createReviewRouter = ({ reviewModel }) => {
	const reviewsRouter = Router();

	const reviewController = new ReviewsController({ reviewModel: reviewModel });

	reviewsRouter.get('/', reviewController.getAll);
	reviewsRouter.post('/', reviewController.create);
	reviewsRouter.delete('/', reviewController.delete);

	reviewsRouter.get('/:userId', reviewController.getByUserId);
	reviewsRouter.get('/:id', reviewController.getById);
	reviewsRouter.delete('/:id', reviewController.delete);
	reviewsRouter.patch('/:id', reviewController.update);

	return reviewsRouter;
};
