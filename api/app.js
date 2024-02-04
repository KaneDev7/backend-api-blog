const express = require('express')
const cookieParser = require('cookie-parser');
const { route } = require('./routes/routes')
const cors = require('cors')
const  bodyParser = require('body-parser')
const { log } = require('./middleweres/log')
const { testConnection } = require('./config/sequelize')
const app = express()

const port = 3001

testConnection()

// Middleweres
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(route)
app.use(cookieParser())



app.listen(port , (err) =>{
    if(err) {
        console.log(err)
    }else{
        console.log('server run on port ' + port)
    }
})