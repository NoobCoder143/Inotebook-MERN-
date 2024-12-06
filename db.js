const mongoose = require('mongoose')
const mongouri ="mongodb://localhost:27017"

async function connectToMongo() {
    await mongoose.connect(mongouri).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }
  module.exports = connectToMongo