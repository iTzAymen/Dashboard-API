const Transaction = require('../models/Transaction')

const getAllData = async (req, res) => {
    console.log('getting data')
    try {
        const transaction = await Transaction.find({})
        res.status(200).json({success: true, data: transaction})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: error})
    }
}

module.exports = {
    getAllData
}