import { Router } from 'express';
import { UserController } from '../controllers/user.js';

export const createUserRouter = ({ userModel }) => {
	const userRouter = Router();

	const userController = new UserController({ userModel: userModel });

	userRouter.get('/', userController.getAll);
	userRouter.post('/', userController.create);
	userRouter.post('/login', userController.login);
	
	//userRouter.delete('/', userController.delete);

	userRouter.get('/:id', userController.getById);
	userRouter.delete('/:userId', userController.delete);
	userRouter.patch('/:id', userController.update);

	return userRouter;
};
