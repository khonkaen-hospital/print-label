import { Request, Response, NextFunction } from 'express';
import { jsPDF } from "jspdf";
import { nanoid } from 'nanoid';
import fs from 'fs';
import PDF from '../pdf';
import HisModel from '../models/his';

export type CreateItem = (doc: jsPDF, data: any, addPage: boolean) => any;

const model = new HisModel();

export class FootnoteController {
	public static async ipd(req: Request, res: Response, next: NextFunction) {

		const copies = +req.params.copies || 1;
		const db = req.db;
		let data = null;

		if (db !== undefined) {
			data = await model.getIpdLabel(db, req.params.an);
		}
		const [content, tempName] = createPdf(data, copies, createItemTemplateIpd);
		res.filename = tempName;
		res.set({ 'content-type': 'application/pdf; charset=utf-8' });
		res.send(content);
		next();

	}

	public static async opd(req: Request, res: Response, next: NextFunction) {
		const copies = +req.params.copies || 1;
		let data = null;
		const db = req.db;

		if (db !== undefined) {
			data = await model.getOpdLabel(db, req.params.vn);
		}
		const [content, tempName] = createPdf(data, copies, createItemTemplateOpd);
		res.filename = tempName;
		res.set({ 'content-type': 'application/pdf; charset=utf-8' });
		res.send(content);
		next();

	}
}


function createPdf(data: any, amount: number = 1, createItem: CreateItem) {
	const tempName: string = './temp/' + nanoid() + '.pdf';
	const pdf = new PDF({
		orientation: "landscape",
		unit: "mm",
		format: [88.9, 25.4]
	});
	if (data !== null) {
		for (let index = 0; index < amount; index++) {
			createItem(pdf.doc, data, index === 0 ? false : true)
		}
	}
	pdf.doc.save(tempName);
	const pdfContent = fs.readFileSync(tempName);
	return [pdfContent, tempName];
}

function createItemTemplateIpd(doc: jsPDF, data: any, addPage: boolean) {
	if (addPage === true) {
		doc.addPage();
	}

	doc.setFont("SarabunNew", 'normal');
	doc.setFontSize(22);
	doc.text("HN:", 7, 6);
	doc.setFont("SarabunNewBold", 'bold');
	doc.text(data.hn, 16, 6);
	doc.setFont("SarabunNew", 'normal');
	doc.text("AN:", 42, 6);
	doc.setFont("SarabunNewBold", 'bold');
	doc.text(data.an, 52, 6);

	doc.setFont("SarabunNew", 'normal');
	doc.text("ชื่อ-สกุล:", 7, 14);
	doc.setFont("SarabunNewBold", 'bold');
	doc.text(data.fullname, 26, 14);

	doc.setFont("SarabunNew", 'normal');
	doc.text("อายุ:", 7, 22);
	doc.setFont("SarabunNewBold", 'bold');
	doc.text(data.age, 18, 22);
	doc.setFont("SarabunNew", 'normal');
	doc.text("Ward:", 30, 22);
	doc.setFont("SarabunNewBold", 'bold');
	doc.text(data.ward, 44, 22);
}

function createItemTemplateOpd(doc: jsPDF, data: any, addPage: boolean) {
	if (addPage === true) {
		doc.addPage();
	}

	doc.setFont("SarabunNew", 'normal');
	doc.setFontSize(22);
	doc.text("HN:", 7, 6);
	doc.setFont("SarabunNewBold", 'bold');
	doc.text(data.hn, 16, 6);

	doc.setFont("SarabunNew", 'normal');
	doc.text("ชื่อ-สกุล:", 7, 14);
	doc.setFont("SarabunNewBold", 'bold');
	doc.text(data.fullname, 26, 14);
}

