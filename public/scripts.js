// Encrypt text
const encrypt = (salt, text) => {
	const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
	const byteHex = (n) => ('0' + Number(n).toString(16)).substr(-2);
	const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

	return text
		.split('')
		.map(textToChars)
		.map(applySaltToChar)
		.map(byteHex)
		.join('');
};

// Decrypt text
const decrypt = (salt, encoded) => {
	const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
	const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
	const applyCharToHex = (hex) => parseInt(hex, 16);

	return encoded
		.match(/.{1,2}/g)
		.map(applyCharToHex)
		.map(applySaltToChar)
		.map((n) => String.fromCharCode(n))
		.join('');
};

// Generate salt
const genSalt = () => {
	let salt = '';
	const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 128; i++) {
		salt += charSet.charAt(Math.floor(Math.random() * charSet.length));
	}
	return salt;
};

// Init tooltips
tippy('#newPaste', {
	content: 'Create new',
	placement: 'left',
	animation: 'fade',
	theme: 'dark',
	arrow: false,
	duration: [200, 50],
});
tippy('#savePaste', {
	content: 'Save',
	placement: 'left',
	animation: 'fade',
	theme: 'dark',
	arrow: false,
	duration: [200, 50],
});
tippy('#duplicatePaste', {
	content: 'Duplicate',
	placement: 'left',
	animation: 'fade',
	theme: 'dark',
	arrow: false,
	duration: [200, 50],
});
tippy('#viewRaw', {
	content: 'View raw',
	placement: 'left',
	animation: 'fade',
	theme: 'dark',
	arrow: false,
	duration: [200, 50],
});
tippy('#encryptPaste', {
	content: 'Encrypt paste',
	placement: 'left',
	animation: 'fade',
	theme: 'dark',
	arrow: false,
	duration: [200, 50],
});
tippy('#burnPaste', {
	content: 'Burn after viewing',
	placement: 'left',
	animation: 'fade',
	theme: 'dark',
	arrow: false,
	duration: [200, 50],
});

if (window.location.href.includes('/new')) {
	// Keep focus on textarea
	$(document).click(() => {
		$('#input').focus();
	});
	// On keydown in '.input'
	$(document).on('keydown', '#input', function (e) {
		if ($('#input').val() === 'Paste or type content here...') $('#input').val('');
		let keyCode = e.keyCode || e.which;
			if (keyCode == 9) {
				e.preventDefault();
				if (e.shiftKey) {
					// Some bugs here to fix, but works for now
					// If on a newline and press shift+tab, deletes the newline char and sometimes chars from the line above
					let start = this.selectionStart;
					let end = this.selectionEnd;
					let value = this.value;
					let before = value.substring(0, start);
					let after = value.substring(end);
					let spaces = before.match(/\s/gi);
					let count = spaces ? spaces.length : 0;
					if (count > 4) {
						count = 4;
					}
					let newValue = before.substring(0, before.length - count) + after;
					this.value = newValue;
					this.selectionStart = start - count;
					this.selectionEnd = end - count;
					this.focus();
					return false;
				}
				else {
					// Else insert four spaces
					let start = this.selectionStart;
					let end = this.selectionEnd;
					let value = this.value;
					let before = value.substring(0, start);
					let after = value.substring(end);
					let newValue = before + '   ' + after;
					this.value = newValue;
					this.selectionStart = start + 3;
					this.selectionEnd = start + 3;
					this.focus();
					return false;
				}
			}
	});
}

$(document).ready(() => {
	// If page URL contains '/new'
	if (window.location.href.includes('/new')) {
		// On submit
		$('#input-form').submit((e) => {
			e.preventDefault();
			let val = $('#input').val();
			if ($('#encrypt-input').prop('checked')) {
				console.log('Encrypting...');
				const salt = genSalt();
				val = encrypt(salt, val);
				$.ajax({
					url: '/save',
					type: 'POST',
					data: {
						value: val,
						encrypt: $('#encrypt-input').prop('checked') ? 1 : 0,
						burn: $('#burn-input').prop('checked') ? 1 : 0,
					},
				}).done((data) => {
					window.location.href = `/${data}?key=${salt}`;
				});
			}
			else {
				$.ajax({
					url: '/save',
					type: 'POST',
					data: {
						value: val,
						encrypt: $('#encrypt-input').prop('checked') ? 1 : 0,
						burn: $('#burn-input').prop('checked') ? 1 : 0,
					},
				}).done((data) => {
					window.location.href = `/${data}`;
				});
			}
		});
	}
	
	if (!window.location.href.includes('/new')) {
		// If enc alert exists
		if ($('#encAlert').length) {
			console.log('Encrypted!');
			if (window.location.href.includes('?key=')) {
				let key = window.location.href.split('?key=')[1].split('&')[0];
				let text = $('#code-display').text();
				let decrypted = decrypt(key, text);
				$('#code-display').text(decrypted);
				$('#encAlert').remove();
			}
			else {
				$('#encAlert').text('This content is encrypted. Please provide the decryption key.');
				let text = $('#code-display').text();
				let clipped = text.substring(0, 38);
				$('#code-display').text(clipped + '...');
			}
		}
		// Get number of lines in code
		let lines = $('#code-display').text().split('\n').length;
		// For each line, append a line number to .line-numbers
		for (let i = 1; i <= lines; i++) {
			$('.line-numbers').append(`<div class="line-number">${i}</div>`);
		}
	}
});
