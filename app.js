require('dotenv').config();
const express = require('express')
const helmet = require("helmet")
var cors = require('cors')
const fs = require('fs')
const app = express()
const port = 3000

app.use(helmet())
app.use(cors())
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

app.use(require('./routes'));

app.get('/', (req, res, next) => {
	res.send({ success: true, message: 'Print API' });
});

app.use(function (req, res, next) {
	console.log('affter', res.filename)
	try {
		if (res.filename) {
			fs.unlinkSync(res.filename)
		}
	} catch (err) {
		console.error(err)
	}
	next();
});

app.listen(port, () => {
	console.log(`PDF Print app listening at http://localhost:${port}`)
})


