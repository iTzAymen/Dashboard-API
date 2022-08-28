const express = require('express')
const dataRouter = require('./routes/transactions')
require('dotenv').config()
const connectDb = require('./db/connect')

const app = express()

app.use('/api/v1', dataRouter)

const port = 5000

const start = async () => {
    try{
        await connectDb(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening to port ${port}...`)
        })
    }catch(error){
        console.log(error)
    }
}

start()