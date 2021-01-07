const fs = require('fs');
const { jsPDF } = require("jspdf");
const { nanoid } = require('nanoid');

const methods = {
	async ipd(req, res, next) {
		let an = req.params.an;
		res.set({ 'content-type': 'application/pdf; charset=utf-8' });
		let [content, filename] = createPdf(an);
		res.send(content);
		res.filename = filename;
		next();
	},
	async opd(req, res, next) {
		let vn = req.params.vn;
		res.set({ 'content-type': 'application/pdf; charset=utf-8' });
		let [content, filename] = createPdf(vn);
		res.send(content);
		res.filename = filename;
		next();
	}
}

function createPdf(id) {
	const tempName = './temp/' + nanoid() + '.pdf';
	const doc = new jsPDF({
		orientation: "landscape",
		unit: "mm",
		format: [88.9, 25.4]
	});

	const fontNomal = fs.readFileSync('./assets/fonts/THSarabunNew.ttf', { encoding: 'base64' });
	const fontBold = fs.readFileSync('./assets/fonts/THSarabunNew Bold.ttf', { encoding: 'base64' });
	doc.addFileToVFS('THSarabunNew.ttf', fontNomal.toString());
	doc.addFileToVFS('THSarabunNew Bold.ttf', fontBold.toString());
	doc.addFont("THSarabunNew.ttf", "SarabunNew", "normal");
	doc.addFont("THSarabunNew Bold.ttf", "SarabunNewBold", "bold");
	const data = {
		fullname: 'นายสาธิต สีถาพล',
		age: '36 ปี',
		ward: 'ICU ',
		hn: '52298168 ',
		an: '45902818 ',
	};
	createItemIpd(doc, data, false);
	createItemIpd(doc, data, true);
	createItemIpd(doc, data, true);
	createItemIpd(doc, data, true);
	createItemIpd(doc, data, true);

	doc.save(tempName);
	const pdfContent = fs.readFileSync(tempName);
	return [pdfContent, tempName];
}

function createItemIpd(doc, data, addPage) {
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

function createItemOpd(doc, data, addPage) {
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


module.exports = { ...methods }

