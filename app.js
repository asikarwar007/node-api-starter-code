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

    // AWS.config.region = process.env.REGION
    //
    // var sns = new AWS.SNS();
    // var ddb = new AWS.DynamoDB();
    //
    // var ddbTable =  process.env.STARTUP_SIGNUP_TABLE;
    // var snsTopic =  process.env.NEW_SIGNUP_TOPIC;

    var indexRouter = require('./routes/index'); //file improting
    var usersRouter = require('./routes/users');
    var adminRouter = require('./routes/admin');


    var app = express();

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

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.use(bodyParser.urlencoded({extended:false}));
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/admin', adminRouter);

    app.get('/', function(req, res) {
        res.render('index');
    });


    var port = process.env.PORT || 3001;

    var server = app.listen(port, function () {
        console.log('Server running at http://127.0.0.1:' + port + '/');
    });
}
