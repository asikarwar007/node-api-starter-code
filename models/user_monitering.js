const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = schema(
    {
        user_id: String,
        user_type: String,
        lat: String,
        lng: String,
        ip: String,
        url: String,
        device_type: String,
        os: String,
        os_version: String,
        status: Boolean
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("userMoniter", userSchema, "userMoniter")