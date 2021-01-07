
const router = require('express').Router()

router.use(`/footnote`, require('./footnotes'))

module.exports = router
