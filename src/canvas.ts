
import * as cavas from 'canvas';
import JsBarcode from 'jsbarcode';

const canvas = cavas.createCanvas(100, 100);
JsBarcode(canvas, '123456789', {
	height: 20,
	displayValue: false
});

console.log(canvas.toDataURL);


