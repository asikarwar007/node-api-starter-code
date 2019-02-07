var express = require('express');
var router = express.Router();
var adminController = require('../controllers/admin.controller')

/* GET home page. */
router.get('/', adminController.searchall);

/* GET home page. */
router.post('/hello', adminController.postData);



module.exports = router;