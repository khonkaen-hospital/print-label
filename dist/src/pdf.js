"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jspdf_1 = require("jspdf");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class PDF {
    constructor(options) {
        this.doc = new jspdf_1.jsPDF(options);
        this.setFonts();
    }
    setFonts() {
        const fontNomal = fs_1.default.readFileSync(path_1.default.join(__dirname, '../assets/fonts/THSarabunNew.ttf'), { encoding: 'base64' });
        const fontBold = fs_1.default.readFileSync(path_1.default.join(__dirname, '../assets/fonts/THSarabunNew Bold.ttf'), { encoding: 'base64' });
        this.doc.addFileToVFS('THSarabunNew.ttf', fontNomal.toString());
        this.doc.addFileToVFS('THSarabunNew Bold.ttf', fontBold.toString());
        this.doc.addFont("THSarabunNew.ttf", "SarabunNew", "normal");
        this.doc.addFont("THSarabunNew Bold.ttf", "SarabunNewBold", "bold");
    }
    getDoc() {
        return this.doc;
    }
}
exports.default = PDF;
//# sourceMappingURL=pdf.js.map