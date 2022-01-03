const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 3000
const registrar = require('./routes/registrar')
const applicants = require('./routes/applicants')
const awarded = require('./routes/awarded')

const app = express()
app.use(cors())

app.use(express.json())

app.use('/registrar', registrar)
app.use('/applicants', applicants)
app.use('/awarded', awarded)

app.get('/', function(req, res){
	res.send("Hello from server")
})

app.listen(PORT, function(){
	console.log("Server running on localhost: " + PORT)
})