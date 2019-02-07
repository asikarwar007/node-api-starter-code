const mongoose = require('mongoose')

const schema = mongoose.Schema

const adminSchema = schema(
    {
        admin_name:String,
        admin_city:String,
        mobile:Number
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("admin",adminSchema,"admin_users")