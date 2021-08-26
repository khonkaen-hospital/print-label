import * as express from 'express';
import { VaccineController } from '../controllers/VaccineController';
const router = express.Router();

router.get('/:sn', VaccineController.print);

export default router;
