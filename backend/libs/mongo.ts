const { MongoClient, ObjectId } = require('mongodb');

const URI = 'mongodb://root:example@localhost:27017/?maxPoolSize=20&w=majority';

const client = new MongoClient(URI);
const database = client.db('makeadoc');

export { ObjectId };
export const Template = database.collection('templates');
export const Document = database.collection('documents');

client.connect().catch((error) => {
    console.error(error);
    process.exit(1);
});
