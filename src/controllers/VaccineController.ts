import { Request, Response, NextFunction } from 'express';
import { jsPDF } from "jspdf";
import { nanoid } from 'nanoid';
import fs from 'fs';
import PDF from '../pdf';
import HisModel from '../models/his';
import moment from 'moment';
import JsBarcode from 'jsbarcode';
import { createCanvas, loadImage } from 'canvas';

export type CreateItem = (doc: jsPDF, data: Array<any>, addPage: boolean) => any;

const model = new HisModel();

export class VaccineController {

	public static async ipd(req: Request, res: Response, next: NextFunction) {
		const db = req.db;
		let data: Array<any> = [];
		let sn = [];
		sn = req.params.sn.split(',');
		const copy = req.query.copy ? +req.query.copy : 1;

		if (db !== undefined) {
			data = await model.getVaccineBySn(db, sn);
		}
		const [content, tempName] = createPdf(data, copy, createItemTemplate);

		res.filename = tempName;
		res.set({ 'content-type': 'application/pdf; charset=utf-8' });
		res.send(content);
		next();
	}
}


function createPdf(data: Array<any>, copy: number, createItem: CreateItem) {
	const tempName: string = './temp/' + nanoid() + '.pdf';
	const pdf = new PDF({
		orientation: "landscape",
		unit: "mm",
		format: [76.2, 50.8]
	});
	if (data.length > 0) {
		const printItems: Array<any> = [];
		data.forEach((v, i) => {
			let item = JSON.parse(JSON.stringify(v));
			const maxDose = +v.max_tolerated_dose || 1;
			if (maxDose > 1) {
				for (let index = 0; index < maxDose; index++) {
					let newIitem = JSON.parse(JSON.stringify(item));
					newIitem.dose_no = index + 1;
					printItems.push(newIitem);
				}
			} else {
				printItems.push(item);
			}
		});

		printItems.forEach((value, index) => {
			for (let copyIndex = 0; copyIndex < copy; copyIndex++) {
				createItem(pdf.doc, value, (index === (printItems.length - 1) && copyIndex === (copy - 1) ? false : true));
			}
		});
	}
	pdf.doc.save(tempName);
	const pdfContent = fs.readFileSync(tempName);
	return [pdfContent, tempName];
}

function createItemTemplate(doc: jsPDF, data: any, addPage: boolean) {

	const canvas = createCanvas(100, 100);
	const pageWidth = doc.internal.pageSize.getWidth();
	const doseNo = +data.max_tolerated_dose > 1 ? data.dose_no.toString() : '1';
	JsBarcode(canvas, data.dose_id + '-' + doseNo, {
		height: 10,
		displayValue: false
	});

	doc.addImage(canvas.toDataURL(), 'PNG', 2, 24, 72, 28);

	doc.setFont("SarabunNew", 'normal');
	doc.setFontSize(18);
	doc.text("LN:", 5, 6);
	doc.setFont("SarabunNewBold", 'bold');
	doc.text(data.lot_number.toUpperCase(), 15, 6);

	doc.setFont("SarabunNew", 'normal');
	doc.text("SN:", 5, 14);
	doc.setFont("SarabunNewBold", 'bold');
	doc.text(data.vaccine_serial_no, 15, 14);

	doc.setFont("SarabunNew", 'normal');
	doc.text("Exp:", 5, 22);
	doc.setFont("SarabunNewBold", 'bold');
	doc.text(moment(data.expiration_date).format('YYYY-MM'), 15, 22);

	doc.setFont("SarabunNew", 'normal');
	doc.text("ขวดที่:", 33, 22);
	doc.setFont("SarabunNewBold", 'bold');
	doc.text(data.bottle_no || '1', 45, 22);

	doc.setFont("SarabunNew", 'normal');
	doc.text("โดสที่:", 53, 22);
	doc.setFont("SarabunNewBold", 'bold');
	doc.text(+data.max_tolerated_dose > 1 ? data.dose_no.toString() : '1', 64, 22);

	doc.setFontSize(20);
	doc.setFont("SarabunNewBold", 'bold');
	doc.text(data.vaccine_manufacturer_name, pageWidth / 2, 31, { align: 'center' });

	doc.setFontSize(18);
	doc.setFont("SarabunNewBold", 'bold');
	doc.text(data.dose_id.toString() + '-' + doseNo, pageWidth / 2, 48, { align: 'center' });


	if (addPage === true) {
		doc.addPage();
	}
}

