const addUserModel = require('../models/adduser.model')
const adminModel = require('../models/admin.model')

exports.addUser = (req, res) => {

    const addUserDetail = addUserModel({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password
    })

    addUserDetail.save((error, document) => {
        if (error) {
            res.send({
                error: true
            })
        } else {
            res.send({
                error: false,
                data: document
            })
        }
    })

}

exports.getUsers = (req, res) => {

    addUserModel.find().then(data => {
        res.send({
            error: false,
            data: data
        })
    }).catch(error => {
        console.log(error);
        res.send({
            error: true
        })
    })

}

exports.updateUsers = (req, res) => {

    addUserModel.findOneAndUpdate({
        _id: req.body.user_id
    }, {
        $set: {
            name: req.body.name,
            mobile: req.body.mobile
        }
    }, {
        new: true
    }, (error, document) => {
        if (error) {
            res.send({
                error: true
            })
        } else {
            res.send({
                error: false,
                data: document
            })
        }
    })

}

exports.deleteUser = (req,res) => {
    addUserModel.findOneAndDelete({
        _id: req.body.user_id
    },(error,document)=>{
        if(error){
            res.send({
                error:true
            })
        }else{
            res.send({
                error:false,
                data:document
            })
        }
    })
}

exports.getAllData = (req, res) => {

    addUserModel.find().then(userdata => {
        adminModel.find().then(admindata => {
            res.send({
                error: false,
                userdata: userdata,
                admindata: admindata
            })
        }).catch(error => {
            console.log(error);
            res.send({
                error: true
            })
        })
    }).catch(error => {
        console.log(error);
        res.send({
            error: true
        })
    })

    


}