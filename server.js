const express = require('express')
// call my controller
const appRoutes = require('./routes/AppRoutes')

const app = express()

const port = 3009

app.use(express.json())

// routes
app.use('/api', appRoutes)

app.listen(port,()=>{
    console.log("Server running at port " + port)
})