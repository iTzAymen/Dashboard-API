require('dotenv').config()
require('express-async-errors')

const cors = require('cors');
const express = require('express')
const app = express()

const connectDb = require('./db/connect')
const dataRouter = require('./routes/transactions')
const authRouter = require('./routes/auth')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddelware = require('./middleware/error-handler')

const authenticateUser = require('./middleware/auth')

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/transactions', authenticateUser, dataRouter)

app.use(notFoundMiddleware)
app.use(errorMiddelware)

const port = process.env.PORT || 3000

const start = async () => {
    try{
        await connectDb(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listening to port ${port}...`))
    }catch(error){
        console.log(error)
    }
}

start()
