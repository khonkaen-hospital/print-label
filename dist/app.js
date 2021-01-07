"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const Index_1 = __importDefault(require("./routes/Index"));
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.PORT;
const routes = new Index_1.default();
app.use((req, res, next) => {
    req.db = require('knex')({
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        },
        debug: true,
        acquireConnectionTimeout: 5000
    });
    next();
});
app.use(helmet_1.default());
app.use(cors_1.default());
routes.routes(app);
app.listen(port, () => {
    console.log(`PDF Print app listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map