const { MongoClient, ObjectId } = require('mongodb');

const URI = String(process.env.MONGO_URI);

const client = new MongoClient(URI);
const database = client.db('makeadoc');

export { ObjectId };
export const Template = database.collection('templates');
export const Document = database.collection('documents');

client.connect().catch((error) => {
    console.error(error);
    process.exit(1);
});
