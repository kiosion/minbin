require('dotenv').config();
const mongoose = require('mongoose');

const pasteScheme = new mongoose.Schema({
	id : {
		type : String,
		required : true,
		unique : true
	},
	value: {
		type: String,
		required: true
	}
});

export const Paste = mongoose.model('Paste', pasteScheme);
