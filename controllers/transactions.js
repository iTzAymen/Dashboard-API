const Transaction = require('../models/Transaction')

const getAllData = async (req, res) => {
    console.log('getting data')
    try {
        const d = new Date()
        const transaction = await Transaction.find({})
        const t = new Date() - d
        console.log(`query successful after ${t} ms`)
        res.status(200).json({success: true, data: transaction})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: error})
    }
}

module.exports = {
    getAllData
}
