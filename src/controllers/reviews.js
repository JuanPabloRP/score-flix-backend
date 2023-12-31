import { validateSchema, validatePartialSchema } from '../schemas/reviews.js';

export class ReviewsController {
	constructor({ reviewModel }) {
		this.reviewModel = reviewModel;
	}

	getAll = async (req, res) => {
		const { genre } = req.query;
		const movies = await this.reviewModel.getAll({ genre });
		res.json(movies);
	};

	getById = async (req, res) => {
		const { id } = req.params;
		const movie = await this.reviewModel.getById({ id });
		if (movie) return res.json(movie);

		return res.status(404).json({ error: 'Review not found' });
	};

	getByUserId = async (req, res) => {
		const { userId } = req.params;
		const reviews = await this.reviewModel.getByUserId({ userId });
		if (reviews) {
			return res.json(reviews);
		}
		return res.status(404).json({ error: 'No tienes reviews' });
	};

	create = async (req, res) => {
		const result = validatePartialSchema(req.body);

		if (!result.success) {
			return res.status(400).json({ error: JSON.parse(result.error.message) });
		}

		const newMovie = await this.reviewModel.create({ input: result.data });

		res.status(201).json(newMovie);
	};

	update = async (req, res) => {
		const result = validatePartialSchema(req.body.data);

		if (!result.success) {
			return res.status(400).json({ error: JSON.parse(result.error.message) });
		}

		const { id } = req.body;
		const updatedMovie = await this.reviewModel.update({
			id: id,
			input: result.data,
		});

		return res.json(updatedMovie);
	};

	delete = async (req, res) => {
		let { id } = req.params;

		const result = await this.reviewModel.delete({ id });

		if (result === false) {
			return res.status(400).json({ error: JSON.parse(result.error.message) });
		}

		return res.json({ message: 'Review deleted' });
	};

	delete = async (req, res) => {
		let { id } = req.body;

		const result = await this.reviewModel.delete({ id });

		if (result === false) {
			return res.status(400).json({ error: JSON.parse(result.error.message) });
		}

		return res.json({ message: 'Review deleted' });
	};
}
