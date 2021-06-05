
import { Request, Response, Application, NextFunction } from 'express';
import fs from 'fs';
import footnote from './Footnote';
import vacine from './Vaccine';
export default class Routes {
	public routes(app: Application): void {

		app.use('/footnote', footnote);
		app.use('/vaccine', vacine);

		app.get('/', (req: Request, res: Response) => {
			res.send({ success: true, message: 'Print API' });
		});

		app.use((req: Request, res: Response, next: NextFunction) => {
			try {
				if (res.filename) {
					fs.unlinkSync(res.filename);
				}
			} catch (err) {
				console.log(err)
			}
			next();
		});
	}
}
