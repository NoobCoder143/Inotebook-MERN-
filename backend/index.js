const connectToMongo=require("./db");
var cors = require('cors')




connectToMongo();
const express = require('express')
const app = express()
app.use(cors())
const port = 5000
app.use(express.json());
//available routes
app.use('/api/auth',require('./Routes/auth'));
app.use('/api/notes',require('./Routes/notes'));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})