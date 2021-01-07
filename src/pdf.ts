import { jsPDF, jsPDFOptions } from "jspdf";
import fs from 'fs';
import path from 'path';

export default class PDF {
	public doc: jsPDF;

	constructor(options: jsPDFOptions) {
		this.doc = new jsPDF(options);
		this.setFonts();
	}

	setFonts() {
		const fontNomal = fs.readFileSync(path.join(__dirname, '../assets/fonts/THSarabunNew.ttf'), { encoding: 'base64' });
		const fontBold = fs.readFileSync(path.join(__dirname, '../assets/fonts/THSarabunNew Bold.ttf'), { encoding: 'base64' });
		this.doc.addFileToVFS('THSarabunNew.ttf', fontNomal.toString());
		this.doc.addFileToVFS('THSarabunNew Bold.ttf', fontBold.toString());
		this.doc.addFont("THSarabunNew.ttf", "SarabunNew", "normal");
		this.doc.addFont("THSarabunNew Bold.ttf", "SarabunNewBold", "bold");
	}
	getDoc() {
		return this.doc;
	}
}
