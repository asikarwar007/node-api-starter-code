const adminModel = require('../models/admin.model')



exports.searchall = (req, res) => {

    adminModel.find()
        .then(
            adminData => {
                res.send({
                    data: adminData
                })
            }
        )
}


exports.postData = (req, res) => {

    const adminPost = adminModel({
        admin_name: "jashan",
        admin_city: "chd",
        mobile: 213298322
    })

    adminPost.save((error, dok) => {
        if (error) {
            res.send({
                error: true
            })
        }
        res.send({
            error: false,
            data: dok
        })
    });
}