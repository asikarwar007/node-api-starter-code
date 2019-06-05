const userMoniteringModel = require('../models/user_monitering')

module.exports = {
    addData: async (req, res) => {
        let body = req.body
        body.status = true
        const addDetail = userMoniteringModel(body)
        // let previousData = await userMoniteringModel.findOne({ email: body.email })
        // if (previousData) {
        //     return res.send({
        //         error: true,
        //         message: "Email Already Exist"
        //     })
        // }
        let saveData = await addDetail.save()
        if (saveData) {
            return res.send({
                error: false,
                message: "success"
            })
        } else {
            return res.send({
                error: true,
                message: "something went wrong"
            })
        }


    },
    getAllData: async (req, res) => {
        let AllData = await userMoniteringModel.find()
        if (!AllData) {
            return res.send({
                error: true,
                message: "something went wrong"
            })
        } else {
            res.send({
                error: false,
                data: AllData,
                message: "success"
            })
        }
    },
    getDatabyId: async (req, res) => {
        const { id } = req.body
        let AllData = await userMoniteringModel.findOne({ _id: id })
        if (!AllData) {
            return res.send({
                error: true,
                message: "something went wrong"
            })
        } else {
            res.send({
                error: false,
                data: AllData,
                message: "success"
            })
        }
    },
    updateDatabyId: async (req, res) => {

        const payload = req.body

        const { id } = req.body
        let AllData = await userMoniteringModel.findOneAndUpdate({ _id: id }, { $set: payload })
        if (!AllData) {
            return res.send({
                error: true,
                message: "something went wrong"
            })
        } else {
            res.send({
                error: false,
                message: "success"
            })
        }

    },
    updateData: async (req, res) => {

        const payload = req.body
        const { id } = req.body
        let AllData = await userMoniteringModel.findOneAndUpdate({ _id: id }, { $set: payload })
        if (!AllData) {
            return res.send({
                error: true,
                message: "something went wrong"
            })
        } else {
            res.send({
                error: false,
                message: "success"
            })
        }

    },
    deleteData: async (req, res) => {
        const { id } = req.body
        let AllData = await userMoniteringModel.findOneAndUpdate({ _id: id }, { $set: { status: false } })
        if (!AllData) {
            return res.send({
                error: true,
                message: "something went wrong"
            })
        } else {
            res.send({
                error: false,
                message: "success"
            })
        }

    }
}