var express = require('express');
var router = express.Router();
var adduserController = require('../controllers/adduser.controller')

/* GET users listing. */

router.post('/addUser', adduserController.addUser);

router.get('/getUsers',adduserController.getUsers)

router.post('/updateUser',adduserController.updateUsers)

router.delete('/deleteUser',adduserController.deleteUser)

router.get('/all', adduserController.getAllData);

module.exports = router;
