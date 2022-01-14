import express, { Request, Response, NextFunction } from 'express';
import Knex from "knex";
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import Routes from './routes/Index';

dotenv.config();
const app = express();
const port = process.env.PORT;
const routes = new Routes();
app.use((req: Request, res: Response, next: NextFunction) => {
	req.db = Knex({
		client: 'mysql',
		connection: {
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD
		},
		debug: false,
		acquireConnectionTimeout: 5000
	});
	next();
});
app.use(helmet())
app.use(cors())

routes.routes(app);

app.set('views', path.join(__dirname, '../templates'));
app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.get('/home', (req, res) => {
	res.render('home');
});

app.listen(port, () => {
	console.log(`PDF Print app listening at http://localhost:${port}`)
})
