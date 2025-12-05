const mongoose = require("mongoose")

function connectDb(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("MongoDB Connected"))
    .catch(err=>console.log("DB Error: ", err))
}

module.exports = connectDb