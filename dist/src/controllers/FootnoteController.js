"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FootnoteController = void 0;
const nanoid_1 = require("nanoid");
const fs_1 = __importDefault(require("fs"));
const pdf_1 = __importDefault(require("../pdf"));
const his_1 = __importDefault(require("../models/his"));
const model = new his_1.default();
class FootnoteController {
    static ipd(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield model.getOpdByVn(req.db, 6401580);
                let amount = 3;
                const data = {
                    fullname: 'นายสาธิต สีถาพล',
                    age: '36 ปี',
                    ward: 'ICU ',
                    hn: '52298168 ',
                    an: '45902818 ',
                };
                let [content, tempName] = createPdf(data, amount);
                res.filename = tempName;
                res.set({ 'content-type': 'application/pdf; charset=utf-8' });
                res.send(content);
                next();
            }
            catch (e) {
                throw e;
            }
        });
    }
    static opd(req, res, next) {
        try {
            res.send({ success: true, data: 'opd' });
        }
        catch (e) {
            throw e;
        }
    }
}
exports.FootnoteController = FootnoteController;
function createPdf(data, amount = 1) {
    const tempName = './temp/' + nanoid_1.nanoid() + '.pdf';
    const pdf = new pdf_1.default({
        orientation: "landscape",
        unit: "mm",
        format: [88.9, 25.4]
    });
    for (let index = 0; index < amount; index++) {
        createItemTemplateIpd(pdf.doc, data, index === 0 ? false : true);
    }
    pdf.doc.save(tempName);
    const pdfContent = fs_1.default.readFileSync(tempName);
    return [pdfContent, tempName];
}
function createItemTemplateIpd(doc, data, addPage) {
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
//# sourceMappingURL=FootnoteController.js.map