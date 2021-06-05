import { Request, Response, NextFunction } from 'express';
import { jsPDF } from "jspdf";
import { nanoid } from 'nanoid';
import fs from 'fs';
import PDF from '../pdf';
import HisModel from '../models/his';
import JsBarcode from 'jsbarcode';
import { createCanvas } from 'canvas';
import moment from 'moment';
export type CreateItem = (doc: jsPDF, data: Array<any>, addPage: boolean) => any;

const model = new HisModel();

export class VaccineController {
	public static async ipd(req: Request, res: Response, next: NextFunction) {
		const db = req.db;
		let data: Array<any> = [];
		let sn = [];
		sn = req.params.sn.split(',');

		if (db !== undefined) {
			data = await model.getVaccineBySn(db, sn);
		}
		const [content, tempName] = createPdf(data, createItemTemplateIpd);

		res.filename = tempName;
		res.set({ 'content-type': 'application/pdf; charset=utf-8' });
		res.send(content);
		next();
	}
}


function createPdf(data: Array<any>, createItem: CreateItem) {
	const tempName: string = './temp/' + nanoid() + '.pdf';
	const pdf = new PDF({
		orientation: "landscape",
		unit: "mm",
		format: [76.2, 50.8]
	});
	console.log(data);
	if (data.length > 0) {
		data.forEach((value, index) => {
			createItem(pdf.doc, value, index === 0 ? false : true)
		});
	}
	pdf.doc.save(tempName);
	const pdfContent = fs.readFileSync(tempName);
	return [pdfContent, tempName];
}

function createItemTemplateIpd(doc: jsPDF, data: any, addPage: boolean) {
	const canvas = createCanvas(100, 100);
	JsBarcode(canvas, data.dose_id, {
		height: 25,
	});
	doc.addImage(canvas.toDataURL(), 'PNG', 2, 23, 72, 28);

	doc.setFont("SarabunNew", 'normal');
	doc.setFontSize(18);
	doc.text("LN:", 5, 6);
	doc.text(data.lot_number.toUpperCase(), 16, 6);

	doc.setFont("SarabunNew", 'normal');
	doc.text("SN:", 5, 14);
	doc.text(data.vaccine_serial_no, 16, 14);

	doc.setFont("SarabunNew", 'normal');
	doc.text("Exp:", 5, 22);
	doc.text(moment(data.expiration_date).format('YYYY-MM'), 18, 22);

	doc.setFont("SarabunNew", 'normal');
	doc.text("ขวดที่:", 38, 22);
	doc.text(data.bottle_no || '1', 50, 22);

	doc.addPage();
}


