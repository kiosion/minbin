require('dotenv').config();
const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_DB, MONGO_PORT } = process.env;
const MONGO_URL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
const mongoose = require('mongoose');
// {
// 	authSource: "admin",
// 	user: `${MONGO_USER}`,
// 	pass: `${MONGO_PASS}`,
// 	useCreateIndex: true,
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// }

const documentScheme = new mongoose.Schema({
	value: {
		type: String,
		required: true,
	}
});

export const Document = mongoose.model('Document', documentScheme);
