
import express from "express";
import knex from "knex";
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

import Routes from './routes/Index';

dotenv.config();
const app = express();
const port = process.env.PORT;
const routes = new Routes();
app.use((req: Request, res: Response, next: NextFunction) => {
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
app.use(helmet())
app.use(cors())
routes.routes(app);

app.listen(port, () => {
	console.log(`PDF Print app listening at http://localhost:${port}`)
})
