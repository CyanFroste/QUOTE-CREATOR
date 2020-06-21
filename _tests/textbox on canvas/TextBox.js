export class TextBox {
	constructor(
		context,
		x,
		y,
		width,
		height,
		fontFamily,
		fontSize,
		lineHeight,
		alignment = "start",
		baseline = "top"
	) {
		this.c = context;
		this.X = this.x = x;
		this.Y = this.y = y;
		this.width = width;
		this.height = height;
		this.fontFamily = fontFamily;
		this.fontSize = fontSize;
		this.alignment = alignment;
		this.baseline = baseline;
		this.lineHeight = lineHeight;
		this.padding = 10;
		this.border = true;
		this.showBorder();
	}
	write(text) {
		this.c.font = `${this.fontSize}px ${this.fontFamily}`;
		this.c.textBaseline = this.baseline;
		this.c.textAlign = this.alignment;
		// preliminary text operations
		text = text.replace(/  +/g, " "); // replacing multiple strings with just one
		// width of text
		let textWidth = this.c.measureText(text).width;
		// break lines based on width of textbox and text width
		// flag that gets modified after writing each line, initially = whole length of text
		let remainingWidth = textWidth;
		while (remainingWidth > 0) {
			let lineOfText = "";
			let spaceWidth = 0; // calculates the space
			// break if text overflows horizontally
			if (this.Y + this.height - this.y < this.fontSize - this.padding) break;
			// looping until every letter of text has been assigned a line
			for (let i = 0; i < text.length; i++) {
				// if line of text's width >= width of textbox, gotta wrap it to next line, then break i.e. end this line
				if (this.c.measureText(lineOfText).width >= this.width) {					
					lineOfText = lineOfText.slice(0, i - 1);
					text = text.slice(i - 1);
					let prevWord = "",
						nextWord = "";
					// wrap word by checking position of white space
					for (let k = 0; k < text.length; k++) {
						// to find the string after the last word of the line
						if (text[k] === " ") {
							nextWord = text.slice(0, k);
							// console.log(nextWord, nextWord.length)
							break;
						}
					}
					for (let l = lineOfText.length - 1; l >= 0; l--) {
						// to find the last string of the line
						if (lineOfText[l] === " ") {
							prevWord = lineOfText.slice(l, lineOfText.length);
							// add width of space when this string's first letter is a space which will be eventually trimmed
							if (prevWord[0] === " ") {
								// console.log('space here')
								spaceWidth += this.c.measureText(" ").width;
							}
							// console.log(prevWord, prevWord.length)
							// condition to when the word should wrap to next line
							if (
								nextWord.length - prevWord.length < 6 ||
								prevWord.length - nextWord.length < 6
							) {
								// adding the wrapped string to rest of the text
								text = prevWord.trim() + text;
								lineOfText = lineOfText.slice(0, l);
							}
							break;
						}
					}
					break;
				} else {
					// just adding next letter from text to this line
					lineOfText += text[i];
				}
			}
			// drawing the line of text
			this.c.fillText(lineOfText, this.x + this.padding, this.y + this.padding);
			// drawBoundingBox(this.x + this.padding, this.y + this.padding, lineOfText, this.c)
			// width of line = width of line + wrapped word's preceding space
			let lineWidth = this.c.measureText(lineOfText).width + spaceWidth;
			// deducting the line width from text width (!NOT PERFECT BUT WORKS, I GUESS)
			remainingWidth = Math.floor(remainingWidth - lineWidth);
			console.log(remainingWidth);
			// pointing the y to next abstract line
			this.y += this.lineHeight + this.fontSize;
		}
	}
	showBorder() {
		if (this.border) {
			this.c.strokeRect(
				this.x,
				this.y,
				this.width + 2 * this.padding,
				this.height + this.lineHeight + 2 * this.padding
			);
		}
	}
}

function drawBoundingBox(x, y, text, c) {
	c.strokeRect(
		x + c.measureText(text).actualBoundingBoxLeft,
		y - c.measureText(text).actualBoundingBoxAscent,
		c.measureText(text).actualBoundingBoxRight -
			c.measureText(text).actualBoundingBoxLeft,
		c.measureText(text).actualBoundingBoxAscent +
			c.measureText(text).actualBoundingBoxDescent
	);
}
