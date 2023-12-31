import { Router } from 'express';
import { UserController } from '../controllers/user.js';

export const createUserRouter = ({ userModel }) => {
	const userRouter = Router();

	const userController = new UserController({ userModel: userModel });

	userRouter.get('/', userController.getAll);
	userRouter.get('/me', userController.getMe);
	userRouter.post('/', userController.create);
	userRouter.get('/:id', userController.getById);
	userRouter.delete('/:id', userController.delete);
	userRouter.patch('/:id', userController.update);

	return userRouter;
};
