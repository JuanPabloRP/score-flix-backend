import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function connectDB({collectionName}) {
	try {
		await client.connect();
		const database = client.db('score-flix');
		return database.collection(collectionName);
	} catch (error) {
		console.error('Error connecting to the database');
		console.error(error);

		await client.close();
		throw error;
	}
}

export { connectDB };
