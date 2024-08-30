
const mongoose = require('mongoose')

const connect = mongoose.connect('mongodb+srv://pandora:Bolu1234@bolucluster.qxab0vb.mongodb.net/?retryWrites=true&w=majority&appName=bolucluster')

connect.then(()=>{
    console.log('database connected successfully')
})
.catch(()=>{
    console.log("database unable to connect")
})

const LoginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = new mongoose.model("users",LoginSchema)

module.exports= collection;