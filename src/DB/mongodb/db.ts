import { MongoClient, ServerApiVersion } from 'mongodb';
const uri =
	'mongodb+srv://JuanPabloRP:vSTGLvjTITQ4mQfn@cluster0.4z3sizb.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function connectDB() {
	try {
		await client.connect();
		const database = client.db('score-flix');
		return database.collection('reviews');
	} catch (error) {
		console.error('Error connecting to the database');
		console.error(error);

		await client.close();
	}
}
connectDB();


export { connectDB };