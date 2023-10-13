import { ObjectId } from 'mongodb';
import { connectDB } from '../../DB/mongodb/db.js';

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

	static async update({ id, input }) {
		const db = await connectDB();
		const objectId = new ObjectId(id);

		try {
			const { acknowledged, modifiedCount, ...xd } = await db.updateOne(
				{ _id: objectId },
				{ $set: input }
			);

			if (!acknowledged) return false;

			if (modifiedCount === 1) {
				const value = await this.getById({ id });
				console.log('Documento actualizado:', value);
				return value;
			} else {
				return false;
			}
		} catch (error) {
			console.error('Error al actualizar: ', error);
			return false;
		}
	}

	static async delete({ id }) {
		const db = await connectDB();
		const objectId = new ObjectId(id);

		const { deletedCount } = await db.deleteOne({ _id: objectId });

		return deletedCount > 0;
	}
}
