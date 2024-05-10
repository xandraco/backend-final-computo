const express = require('express')
const cors = require('cors')
const routes = require('./src/routes/routes')

// variable del servidor web
const app =express()

// middleware
app.use(cors())
app.use(express.json())
app.use('/', routes)

const PORT = process.env.PORT || 3100
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})
