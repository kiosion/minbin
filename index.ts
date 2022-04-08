import express from 'express';

require('dotenv').config();
const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_DB, MONGO_PORT } = process.env;
const MONGO_URL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

// Set up express
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Set up mongoose
const Doc = require('./models/Document');
console.log('Connecting with: ' + MONGO_URL);
const mongoose = require('mongoose');
mongoose.connect(MONGO_URL);
mongoose.connection
	.on('error', (err: any) => {
		console.log('Mongoose error: ' + err);
		process.exit(1);
	})
	.once('open', () => {
		console.log('Mongoose connected');
	});


// Homepage
app.get('/', (req, res) => {
	const text = `Welcome to MinBin!

Use the buttons in the upper right 
to create a new file to share with others,
or check out the github repo for more info:
https://github.com/kiosion/minbin

Servals will die if you abuse this service.`;
	res.render('display', { text, language: 'plaintext' });
});

// New file
app.get('/new', (req, res) => {
	res.render('new');
});
// Save file
app.post('/save', async (req, res) => {
	const value = req.body.value;
	try {
		const document = await Doc.create({ value });
		res.redirect(`/${document.id}`);
	}
	catch (err) {
		console.log('Error saving: ' + err);
		res.render('new', { value });
	}

	console.log(value);
})
// View file
app.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const document = await Doc.findById(id);
		res.render('display', { text: document.value, id });
	}
	catch (err) {
		console.log('Error viewing: ' + err);
		res.redirect('/');
	}
})
// Duplicate file
app.get('/:id/new', async (req, res) => {
	const id = req.params.id;
	try {
		const document = await Doc.findById(id);
		res.render('new', { text: document.value });
	}
	catch (err) {
		console.log('Error duplicating: ' + err);
		res.redirect(`/${id}`);
	}
})

// Listen on port 3000
app.listen(3000);
console.log('Listening on port 3000');
