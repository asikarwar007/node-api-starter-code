const addUserModel = require('../models/adduser.model')


exports.addData = (req, res) => {

    const addDetail = addUserModel({
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        password: req.body.password
    })

    addDetail.save((error, document) => {
        if (error) {
            res.send({
                error: true,
                message:"something went wrong"
            })
        } else {
            res.send({
                error: false,
                data: document,
                message:"success"
            })
        }
    })

}

exports.getAllData = (req, res) => {

    addUserModel.find()
    .then(data => {
        res.send({
            error: false,
            data: data,
            message:"success"
        })})
    .catch(error => {
        console.log(error);
        res.send({
            error: true,
            message:"something went wrong"
        })
    })

}

exports.getDatabyId = (req, res) => {

    addUserModel.findOne({_id:req.body._id})
    .then(data => {
        res.send({
            error: false,
            data: data,
            message:"success"
        })
    })
    .catch(error => {
        console.log(error);
        res.send({
            error: true,
            message:"something went wrong"
        })
    })
}

exports.updateDatabyId = (req, res) => {

    addUserModel.findOneAndUpdate({
        _id: req.body.user_id
    }, {
        $set: {
            name: req.body.name,
            mobile: req.body.mobile
        }
    }, {
        new: true}, (error, document) => {
        if (error) {
            res.send({
                error: true,
                message:"something went wrong"
            })
        } else {
            res.send({
                error: false,
                data: document,
                message:"success"
            })
        }
    })

}

exports.updateData = (req, res) => {

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
                error: true,
                message:"something went wrong"
            })
        } else {
            res.send({
                error: false,
                data: document,
                message:"success"
            })
        }
    })

}

exports.deleteData = (req,res) => {
    addUserModel.findOneAndDelete({
        _id: req.body.user_id
    },(error,document)=>{
        if(error){
            res.send({
                error:true,
                message:"something went wrong"
            })
        }else{
            res.send({
                error:false,
                data:document,
                message:"success"
            })
        }
    })
}
