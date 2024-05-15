require('dotenv').config()

const express = require('express')
const app = express()
port = 3000


const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log('Server is running on port: '+ port)
})