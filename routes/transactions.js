const express = require('express')
const router = express.Router()
const {
    getAllData, 
    getSmallData, 
    getOnePage, 
    getOverviewData,
    getDailyData} = require('../controllers/transactions')

router.route('/')
    .get(getAllData)

router.route('/small')
    .get(getSmallData)

router.route('/page/:page')
    .get(getOnePage)

router.route('/overview')
    .get(getOverviewData)

router.route('/daily')
    .get(getDailyData)

module.exports = router
