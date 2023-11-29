import { connectDB } from '../../DB/mongodb/db.js';

export class UserModel {
	static async getAll() {
		const db = await connectDB({ collectionName: 'users' });

		return db.find({}).toArray();
	}

	static async getById({ id }) {
		const db = await connectDB({ collectionName: 'users' });
		return db.findOne({ userId: id });
	}

	static async getByEmail({ email }) {
		const db = await connectDB({ collectionName: 'users' });
		return db.findOne({ email: email });
	}

	static async create({ input }) {
		const db = await connectDB({ collectionName: 'users' });
		const { insertedId } = await db.insertOne(input);

		return {
			_id: insertedId,
			...input,
		};
	}

	static async update({ id, input }) {
		const db = await connectDB({ collectionName: 'users' });

		try {
			const { aknowledged, modifiedCount } = await db.updateOne(
				{ userId: id },
				{ $set: input }
			);

			if (!aknowledged) return false;

			if (!modifiedCount === 1) return false;

			const value = await this.getById({ id });
			console.log('updatedDoc', value);
			return value;
		} catch (error) {
			console.error('Error updating user: ', error);
			return false;
		}
	}

	static async delete({ userId }) {
		const db = await connectDB({ collectionName: 'users' });

		const { deletedCount } = await db.deleteOne({ userId });
		console.log(userId);

		return deletedCount > 0;
	}
}
