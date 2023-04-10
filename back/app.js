var express = require('express');


const port = 4000;
var app = express();
app.disable('x-powered-by');
var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var mongoose = require('mongoose');
const serverless = require('serverless-http');
const fileUpload = require('express-fileupload');


var databaseConfig = require('./config/database');
mongoose.connect(databaseConfig.url ,
  {useNewUrlParser: true,},
  () => console.log("Connected to DB ---", databaseConfig.url)
);

var itemRouter = require('./routes/item');
var dataRouter = require('./routes/data');
var userRouter = require('./auth/routes/user');


http.listen(process.env.PORT || port);
console.log("App listening on port => 3000");
app.use(fileUpload());
app.use(express.static('public'));

app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({extended: false, limit: '200mb'}));
app.use(bodyParser.json());
app.use(cors());





const nf = '';

app.use(nf+'/item',itemRouter );
app.use(nf+'/data', dataRouter);
app.use(nf+'/auth', userRouter);

module.exports = app;
module.exports.handler = serverless(app);