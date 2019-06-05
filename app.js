// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  // for (var i = 0; i < cpuCount; i += 1) {
  //     cluster.fork();
  // }
  cluster.fork();
  // Listen for terminating workers
  cluster.on('exit', function (worker) {

    // Replace the terminated workers
    console.log('Worker ' + worker.id + ' died :(');
    cluster.fork();

  });

  // Code to run if we're in a worker process
} else {
  var AWS = require('aws-sdk');
  var express = require('express');
  var bodyParser = require('body-parser');
  var mongoose = require('mongoose');
  var fs = require('fs');
  var cookieParser = require('cookie-parser');
  var ip = require("ip");
  var path = require('path');
  const jwt = require('jsonwebtoken');
  const config = require('./config/common.config');
  const helper = require('./helper/helper')

  // AWS.config.region = process.env.REGION
  //
  // var sns = new AWS.SNS();
  // var ddb = new AWS.DynamoDB();
  //
  // var ddbTable =  process.env.STARTUP_SIGNUP_TABLE;
  // var snsTopic =  process.env.NEW_SIGNUP_TOPIC;

  var indexRouter = require('./routes/index'); //file improting
 


  var app = express();
  app.use(cookieParser());

  const db = require('./config/db.config')

  mongoose.promise = global.promise;

  mongoose.connect(db.url, {
    useNewUrlParser: true
  }).then(() => {
    console.log("db is connected")
  })
    .catch(error => {
      console.log("db not connecred", error)
    })
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  }));
  app.use(bodyParser.json({
    limit: '50mb',
    extended: true
  }))
  app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,authorization');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var ua = req.headers['user-agent']

    let userinfo = {}
    let token = req.headers.authorization
    if (token) {
      jwt.verify(req.headers.authorization, config.SECRET, function (err, decoded) {
        userinfo.user_id = ''
        userinfo.user_type = 'guest'

        if (decoded) {
          userinfo.user_id = decoded.user_id
          userinfo.user_type = decoded.user_id
        }
        userinfo.ip = req.ip
        // userinfo.lat = ''
        // userinfo.lng = ''
        userinfo.url = req.url
        helper.BrowserInfo(ua, userinfo)
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    } else {
      let checkurl = req.url.split('/')
      //  console.log(checkurl)
      checkurl.shift()
      if (checkurl[0] == 'auth') {
        next();
      } else if (checkurl[0] == 'uploads') {
        next();
      } else {
        return res.status(403).send({
          success: false,
          message: 'No token provided.'
        });

      }
    }
    // console.log(req.headers.authorization)


    // next();
    // res.cookie("userData", users, { expire: 4000 + Date.now() }); 
    // res.cookie("userData2", users, { expire: 4000 + Date.now() }); 
    // res.cookie("userData23", users, { expire: 4000 + Date.now() }); 

    // res.send(req.cookies)
    // res.send(req.ip)
    // console.log(req.url)
  });
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/', indexRouter);
  // app.use('/users', usersRouter);
  // app.use('/admin', adminRouter);

  app.get('/', function (req, res) {
    res.render('index');
  });


  var port = process.env.PORT || 3001;

  var server = app.listen(port, function () {
    console.log('Server running at http://127.0.0.1:' + port + '/');
  });
}
