
const router = require('express').Router()
const controllers = require('../controllers/footnotes.controller')

router.get('/ipd/:an', controllers.ipd);
router.get('/opd/:vn', controllers.opd);

module.exports = router
