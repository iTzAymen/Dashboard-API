const express = require('express')
const dataRouter = require('./routes/transactions')
const loginRouter = require('./routes/logins')
//const cors = require('cors');
require('dotenv').config()
const connectDb = require('./db/connect')

const app = express()

//app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/api/v1/transactions', dataRouter)
app.use('/api/v1/login', loginRouter)

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
