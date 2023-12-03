import { Router } from 'express';
import { UserController } from '../controllers/user.js';

export const createAuthRouter = ({ userModel }) => {
	const authRouter = Router();

	const userController = new UserController({ userModel: userModel });

	authRouter.post('/login', userController.login);
	authRouter.post('/register', userController.register);

	return authRouter;
};
