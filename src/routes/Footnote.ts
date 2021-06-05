import * as express from 'express';
import { FootnoteController } from '../controllers/JobController';
const router = express.Router();

router.get('/ipd/:an/:copies', FootnoteController.ipd);
router.get('/opd/:vn/:copies', FootnoteController.opd);

export default router;
