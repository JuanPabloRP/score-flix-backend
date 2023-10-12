import { ObjectId } from 'mongodb';
import { connectDB } from '../../DB/mongodb/db';

export class ReviewModel {
	static async getAll({ genre }) {
		const db = await connectDB();
		if (genre) {
			return db
				.find({
					genre: {
						$elemMatch: {
							$regex: genre,
							$options: 1,
						},
					},
				})
				.toArray();
		}

		return db.find({}).toArray();
	}

	static async getById({ id }) {
		const db = await connectDB();
		const objectId = new ObjectId(id);

		return db.findOne({ _id: objectId });
	}

	static async create({ input }) {
		const db = await connectDB();

		const { insertedId } = await db.insertOne(input);

		return {
			id: insertedId,
			...input,
		};
	}

	static async update({ id, input }) {}

	static async delete({ id }) {}
}
