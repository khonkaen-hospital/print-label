import express, { Request, Response, NextFunction } from 'express';
import * as cavas from 'canvas';
import JsBarcode from 'jsbarcode';

const port = 3000;
const app = express();



app.get('/home', (req, res) => {
	res.send({ success: true });
});

app.get('/canvas', (req, res) => {
	const canvas = cavas.createCanvas(100, 100);
	JsBarcode(canvas, '123456789', {
		height: 20,
		displayValue: false
	});
	res.send({ success: true, data: canvas.toDataURL });
});

app.listen(port, () => {
	console.log(`PDF Print app listening at http://localhost:${port}`)
})


