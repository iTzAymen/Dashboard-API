const express = require('express')
const dataRouter = require('./routes/transactions')
//const cors = require('cors');
require('dotenv').config()
const connectDb = require('./db/connect')

const app = express()

//app.use(cors());
app.use('/api/v1', dataRouter)

const port = process.env.PORT

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
