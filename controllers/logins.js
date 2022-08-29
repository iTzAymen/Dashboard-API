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

const checkAuth = async (req, res) => {
    try {
        const {email, password} = req.body
        const login = await Login.findOne({email})
        console.log(login)
        if(!login){
            return res.status(200).json({success: false, msg: 'Account does not exist'})
        }
        if(password !== login.password){
            return res.status(200).json({success: false, msg: 'Wrong password'})
        }
        res.status(200).json({success: true, data: {login}})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, msg: error})
    }
}

const createAcc = async (req, res) => {
    try {
        const {email, username, password} = req.body
        const existing_email = await Login.findOne({email})
        const existing_username = await Login.findOne({username})
        console.log(existing_email)
        console.log(existing_username)
        if(existing_email){
            return res.status(200).json({success: false, msg: 'Email already exists'})
        }

        if(existing_username){
            return res.status(200).json({success: false, msg: 'Username already taken'})
        }

        const login = await Login.create(req.body)
        console.log(login)
        res.status(200).json({success: true, data: {login}})
    } catch (error) {
        res.status(500).json({success: false, msg: error})
    }
}

module.exports = {
    getAllData,
    checkAuth,
    createAcc
}
