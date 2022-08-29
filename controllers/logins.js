const Login = require('../models/Login.js')

const getAllData = async (req, res) => {
    console.log('getting data')
    try {
        const login = await Login.find({})
        res.status(200).json({success: true, data: login})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: error})
    }
}

module.exports = {
    getAllData
}
