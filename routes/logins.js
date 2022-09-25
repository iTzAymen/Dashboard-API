const express = require('express')
const router = express.Router()
const {
    getAllData,
    checkAuth,
    createAcc} = require('../controllers/logins.js')

router.route('/')
    .get(getAllData)

router.route('/auth')
    .get(checkAuth)
    .post(createAcc)

module.exports = router
