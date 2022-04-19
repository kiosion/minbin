require('dotenv').config();
const mongoose = require('mongoose');

const pasteScheme = new mongoose.Schema({
	id: {
		type: String,
		required: true,
		unique: true
	},
	views: {
		type: Number,
		required: true,
		default: 0
	},
	encrypted: {
		type: Boolean,
		required: true,
		default: false
	},
	value: {
		type: String,
		required: true
	}
});

export const Paste = mongoose.model('Paste', pasteScheme);
