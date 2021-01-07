"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Footnote_1 = __importDefault(require("./Footnote"));
class Routes {
    routes(app) {
        app.use('/footnote', Footnote_1.default);
        app.get('/', (req, res) => {
            res.send({ success: true, message: 'Print API' });
        });
        app.use((req, res, next) => {
            try {
                if (res.filename) {
                    fs_1.default.unlinkSync(res.filename);
                }
            }
            catch (err) {
                console.log(err);
            }
            next();
        });
    }
}
exports.default = Routes;
//# sourceMappingURL=Index.js.map