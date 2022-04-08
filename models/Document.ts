require('dotenv').config();
const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_DB, MONGO_PORT } = process.env;
const MONGO_URL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
const mongoose = require('mongoose');
// TODO: Implement proper auth:
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

module.exports = mongoose.model("Document", documentScheme);
