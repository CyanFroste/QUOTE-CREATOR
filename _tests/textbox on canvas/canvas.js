import { TextBox } from "./TextBox.js";
const canvas = document.querySelector("canvas");
let W = innerWidth;
let H = innerHeight;
canvas.height = innerHeight;
canvas.width = innerWidth;
const c = canvas.getContext("2d");

// let p = new Path2D(
// 	"M40.8,47.3v36.5H0V54.9c0-15.6,2.3-26.9,6.8-33.8C12.7,11.8,22,4.8,34.9,0l9.3,12.2c-7.7,2.7-13.5,6.7-17.1,11.9    s-5.7,13-6.1,23.1H40.8z"
// );
// let n = new Path2D(
// 	"M96.6,47.3v36.5H55.8V54.9c0-15.6,2.3-26.9,6.8-33.8C68.5,11.8,77.9,4.8,90.7,0l9.3,12.2c-7.7,2.7-13.5,6.7-17.1,11.9    s-5.7,13-6.1,23.1H96.6z"
// );

// c.fill(p);
// c.save();
// c.translate(200, 200);
// c.scale(0.2, 0.2);
// c.fill(n);
// c.restore();
// NICE

// c.fillText(text, 0, 400);
// drawBoundingBox(0, 400, text);

function drawBoundingBox(x, y, text) {
	c.strokeRect(
		x + c.measureText(text).actualBoundingBoxLeft,
		y - c.measureText(text).actualBoundingBoxAscent,
		c.measureText(text).actualBoundingBoxRight -
			c.measureText(text).actualBoundingBoxLeft,
		c.measureText(text).actualBoundingBoxAscent +
			c.measureText(text).actualBoundingBoxDescent
	);
}


let text =
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Remegg whatever I write, bitches, will be drawn on the canvas, with word warp and shitaccusantium corporis.";
	
let textBox = new TextBox(c, 0, 0, 380, 140, "Raleway", 20, 10);
textBox.write(text);

// console.log(c.measureText(text), W, text.length);

// console.log(lineOfText, "|seperator|", text);
