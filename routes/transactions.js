const express = require('express')
const router = express.Router()
const {getAllData, getSmallData, getOnePage} = require('../controllers/transactions')

router.route('/')
    .get(getAllData)

router.route('/small')
    .get(getSmallData)

router.route('/page/:page')
    .get(getOnePage)

module.exports = router
