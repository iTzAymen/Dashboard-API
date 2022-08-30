const express = require('express')
const router = express.Router()
const {getAllData, getSmallData} = require('../controllers/transactions')

router.route('/')
    .get(getAllData)

router.route('/small')
    .get(getSmallData)

module.exports = router
