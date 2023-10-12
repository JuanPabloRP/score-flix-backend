import { Router } from "express";
import { ReviewsController } from "../controllers/reviews";

export const reviewsRouter = Router();

reviewsRouter.get('/', ReviewsController.getAll);
