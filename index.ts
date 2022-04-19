import express from 'express';

require('dotenv').config();
const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_DB, MONGO_PORT } = process.env;
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DB}?retryWrites=true&w=majority`;

// Set up express
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Set up mongoose
import { Paste } from './models/Paste';
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

const defText = `Welcome to MinBin!

Use the button in the upper right 
to create a new paste to share with others,
or check out the github repo for more info:
https://github.com/kiosion/minbin

Servals will die if you abuse this service.
`;
const newText = `Paste or type content here...`;

// Homepage
app.get('/', (req, res) => {
	res.render('display', { 
		content: defText, 
		language: 'plaintext', 
		title: 'Home' 
	});
});
// Favicon
app.get('/favicon.ico', (req, res) => {
	//res.sendFile(__dirname + '/public/favicon.ico');
	res.sendStatus(404);
});

// New file
app.get('/new', (req, res) => {
	res.render('new', { 
		content: newText,
		title: 'New paste'
	});
});
// Save file
app.post('/save', async (req, res) => {
	const pasteContent = req.body.value;
	const pasteEnc = (req.body.encrypt == 1) ? true : false;
	const pasteBurn = (req.body.burn == 1) ? true : false;
	console.log(`Saving paste`);
	console.log(`\tEncrypted: ${pasteEnc}`);
	console.log(`\tBurn: ${pasteBurn}`);
	let pasteID: string = '';
	let inStr: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	for (let i = 0; i < 8; i++) {
		pasteID += inStr.charAt(Math.floor(Math.random() * inStr.length));
	}
	try {
		await Paste.create({ 
			id: pasteID,
			views: 0,
			encrypted: pasteEnc,
			burn: pasteBurn,
			value: pasteContent
		});
		// Return paste ID
		res.send(pasteID);
	}
	catch (err: any) {
		console.log('Error saving: ' + err);
		res.render('new', {
			content: pasteContent,
			title: 'New paste'
		});
	}
});
// View file
app.get('/:id', async (req, res) => {
	const pasteID = req.params.id;
	try {
		const paste = await Paste.findOne({ 
			id: pasteID
		});
		await Paste.findOneAndUpdate({
			id: pasteID 
		}, {
			$inc: { views: 1 }
		}, {
			new: true, upsert: true
		});
		console.log(`Viewing paste: ${pasteID}`);
		console.log(`\tEncrypted: ${paste.encrypted}`);
		res.render('display', {
			id: pasteID,
			content: paste.value,
			encrypted: paste.encrypted,
			title: pasteID
		});
		if (paste.burn && paste.views > 1) {
			console.log(`Burning paste: ${pasteID}`);
			await Paste.deleteOne({
				id: pasteID
			});
		}
	}
	catch (err: any) {
		console.log('Error viewing: ' + err);
		res.redirect('/');
	}
});
// Duplicate file
app.get('/:id/new', async (req, res) => {
	const pasteID = req.params.id;
	try {
		const paste = await Paste.findOne({
			id: pasteID
		});
		if (!paste?.value) {
			const paste = await Paste.findById(pasteID);
			if (!paste?.value) {
				res.redirect('/');
			}
			else {
				res.render('new', {
					content: paste.value,
					title: 'New paste'
				});
			}
		}
		else {
			res.render('new', {
				content: paste.value,
				title: 'New paste'
			});
		}
	}
	catch (err: any) {
		console.log('Error duplicating: ' + err);
		res.redirect(`/${pasteID}`);
	}
});
// View raw text
app.get('/:id/raw', async (req, res) => {
	const pasteID = req.params.id;
	try {
		const paste = await Paste.findOne({
			id: pasteID
		});
		if (!paste?.value) {
			const paste = await Paste.findById(pasteID);
			if (!paste?.value) {
				res.redirect('/');
			}
			else {
				res.set('Content-Type', 'text/html');
				res.send("<pre>" + paste.value + "</pre>");
			}
		}
		else {
			res.set('Content-Type', 'text/html');
			res.send("<pre>" + paste.value + "</pre>");
		}
	}
	catch (err: any) {
		console.log('Error viewing raw: ' + err);
		res.redirect('/');
	}
});

// Listen on port 3000
app.listen(3002);
console.log('Listening on port 3002');
