const express = require('express')
const router = express.Router()
const {getAllData} = require('../controllers/logins.js')

router.route('/')
    .get(getAllData)

module.exports = router
