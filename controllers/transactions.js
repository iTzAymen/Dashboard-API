const Transaction = require('../models/Transaction')

const getAllData = async (req, res) => {
    console.log('getting data')
    try {
        const d = new Date()
        const transaction = await Transaction.find({})
        const t = new Date() - d
        console.log(`getAllData successful after ${t} ms`)
        res.status(200).json({success: true, data: transaction})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: error})
    }
}

const getSmallData = async (req, res) => {
    console.log('getting small data')
    try {
        const d = new Date()
        const transaction = await Transaction.find({})
        
        let maxDate = null
        let minDate = null
        let dataset = [...transaction]
        dataset.forEach((value, index) => {
            const dateString = value["DATE DE CREATION"]
            const transactionDate = dateString ? new Date(dateString) : null
            if (transactionDate && (!maxDate || transactionDate > maxDate)) {
                maxDate = transactionDate
            }
            if (transactionDate && (!minDate || transactionDate < minDate)) {
                minDate = transactionDate
            }
        })
        let newMinDate = maxDate
        newMinDate.setMonth(newMinDate.getMonth() - 1)
        newMinDate = newMinDate < minDate ? minDate : newMinDate
        const smallData = transaction.filter((data) => {
            const dateString = data["DATE DE CREATION"]
            const transactionDate = dateString ? new Date(dateString) : null
            return (transactionDate && transactionDate >= newMinDate)
        })
        console.log(smallData.length)
        const t = new Date() - d
        console.log(`getSmallData successful after ${t} ms`)
        res.status(200).json({success: true, data: smallData})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: error})
    }
}

const getOnePage = async (req, res) => {
    console.log('getting one page')
    const {page} = req.params
    try {
        const d = new Date()
        const transaction = await Transaction.find({})
            .sort({"DATE DE DERNIERE MODIFICATION": -1})
            .skip(page * 10)
            .limit(10)
        const t = new Date() - d
        console.log(`getOnePage successful after ${t} ms`)
        res.status(200).json({success: true, data: transaction})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: error})
    }
}

module.exports = {
    getAllData,
    getSmallData,
    getOnePage
}
