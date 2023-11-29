import bcrypt from 'bcrypt';
import { validatePartialSchema, validateSchema } from '../schemas/user.js';
import { createToken } from '../middlewares/auth.js';

export class UserController {
	constructor({ userModel }) {
		this.userModel = userModel;
	}

	// Obtener todos los users
	getAll = async (req, res) => {
		const { isAdmin, isAuthorized } = req.query;

		/* if (!isAdmin || !isAuthorized) {
			return res.status(401).json({ error: 'Unauthorized' });
		} */

		const users = await this.userModel.getAll();
		res.json(users);
	};

	// Obtener un user por id
	getById = async (req, res) => {
		const { id } = req.params;
		const user = await this.userModel.getById({ id });

		if (!user) return res.status(404).json({ error: 'User not found' });

		res.json(user);
	};

	getByEmail = async (req, res) => {
		const { email } = req.body;
		const user = await this.userModel.getByEmail({ email });

		if (!user) return res.status(404).json({ error: 'User not found' });

		res.json(user);
	};

	// Crear un user
	create = async (req, res) => {
		const result = validatePartialSchema(req.body);

		if (!result.success) {
			return res.status(400).json({ error: JSON.parse(result.error.message) });
		}

		const { password } = result.data;

		const hashedPassword = await this.hashPassword({ password });

		result.data.password = hashedPassword;

		const newUser = await this.userModel.create({ input: result.data });
		res.status(201).json(newUser);
	};

	// Actualizar un user
	update = async (req, res) => {
		const result = validatePartialSchema(req.body.data);

		if (!result.success) {
			return res.status(400).json({ error: JSON.parse(result.error.message) });
		}

		const { id } = req.body;
		const updatedUser = await this.userModel.update({
			id: id,
			input: result.data,
		});

		return res.json(updatedUser);
	};

	updatePassword = async (req, res) => {
		const result = validatePartialSchema(req.body.data);

		if (!result.success) {
			return res.status(400).json({ error: JSON.parse(result.error.message) });
		}

		const { id } = req.body;
		const { password } = result.data;

		const hashedPassword = await this.hashPassword({ password });

		result.data.password = hashedPassword;

		const updatedUser = await this.userModel.update({
			id: id,
			input: result.data,
		});

		return res.json(updatedUser);
	};

	// Eliminar un user
	delete = async (req, res) => {
		const { userId } = req.params;

		console.log("req: ", req.params);

		const result = await this.userModel.delete({ userId });

		if (result === false) {
			return res.status(400).json({ error: 'User was not deleted' });
		}

		return res.json({ message: 'User deleted' });
	};

	// Registrar un user
	register = async (req, res) => {
		const result = validatePartialSchema(req.body);

		if (!result.success) {
			return res.status(400).json({ error: JSON.parse(result.error.message) });
		}

		const { password } = result.data;
		const hashedPassword = await this.hashPassword({ password });
		result.data.password = hashedPassword;
		const newUser = await this.userModel.create({ input: result.data });
		res.status(201).json(newUser);
	};

	// Iniciar sesión de un user
	login = async (req, res) => {
		const { email, password } = req.body;
		const user = await this.userModel.getByEmail({ email });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const passwordMatch = await this.comparePassword(password, user.password);

		if (!passwordMatch) {
			return res.status(401).json({ error: 'Invalid password' });
		}

		const token = createToken({
			payload: { userId: user.userId },
			secret: process.env.JWT_SECRET,
			expiresIn: '7d',
		});

		console.log(token);

		res.json({ token });
	};

	// Funciones auxiliares
	hashPassword = async (data) => {
		const { password } = data;
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	};

	comparePassword = async (password, hashedPassword) => {
		const result = await bcrypt.compare(password, hashedPassword);
		return result;
	};
}
