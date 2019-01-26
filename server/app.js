require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('express-jwt');

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

require('./config/passportConfig');


const paymentsControl = require('./controlers/payments');
const authControl = require('./controlers/auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, noAuth, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH');
  next();
});
app.use(passport.initialize());
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    console.log(err);
    res.status(401).json({ "message": err.name + ": " + err.message });
  }
});

// ----------------Заглушка----------------
app.get('/', function(req, res) {
  res.redirect('http://localhost:4200/');
});

//---------------------Логин----------------------
app.post('/login', authControl.login);
app.post('/addUser', authControl.addUser)
app.get('/userProfile', auth, authControl.userProfile)

//---------------------Платеж по карте----------------------
app.get('/card-payment', auth, paymentsControl.cardGetPayment);
app.post('/card-payment', auth, paymentsControl.cardPostPayment);
app.patch('/card-payment', auth, paymentsControl.cardUpdatePayment);

//---------------------Платеж от клиента банка----------------------
app.post('/client-payment', auth, paymentsControl.clientDownloadFile);

//---------------------Запросы на платеж----------------------
app.get('/requested-payment', auth, paymentsControl.requestGetPayment);
app.post('/requested-payment', auth, paymentsControl.requestPostPayment);

//-----------------Запуск сервера-------------------------
const startServer = () => {
  app.listen(3012);
  console.log('API app started on 3012 port!');
};

const connectDB = () => {
  mongoose.connect(
    'mongodb://localhost:27017/myapi',
    { useNewUrlParser: true }
  );

  return mongoose.connection;
};

connectDB()
  .on('error', console.log)
  .on('disconnected', connectDB)
  .once('open', startServer);
