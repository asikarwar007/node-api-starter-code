const mongoose = require('mongoose')

const schema = mongoose.Schema

const addUserScheme = schema(
    {
        "name":String,
        "mobile":Number,
        "email":String,
        "password":String
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("users",addUserScheme,"users")