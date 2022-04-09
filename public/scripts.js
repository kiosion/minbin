// Set line numbers on page load
$(document).ready(() => {
	//setLineNums();
});

// Keep focus on textarea
$(document).click(() => {
	$('#input').focus();
});

// On keydown in '.input'
$(document).on('keydown', '#input', function (e) {
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

// $(document).on('keydown', '#input', () => {
// 	setLineNums();
// });
// $(document).on('keyup', '#input', () => {
// 	setLineNums();
// });

function setLineNums() {
	let lines = $('#input').val().split('\n');
	let lineNum = 1;
	let lineNumDiv = $('#input').parent().find('.line-numbers');
	lineNumDiv.empty();
	for (let line of lines) {
		lineNumDiv.append(`<div>${lineNum}</div>`);
		lineNum++;
	}
}
