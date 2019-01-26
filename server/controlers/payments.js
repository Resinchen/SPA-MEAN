const fs = require('fs');
const path = require('path');

const RequestedPayment = require('../models/RequestedPayment');
const CardPayment = require('../models/CardPayment');

function getAll(paymentType, req, res) {
  paymentType.find({}, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    console.log('Отработала функция возврата всего');

    res.send(user);
  });
}

function getSearch(paymentType, req, res) {
  paymentType.findByField(req.query.field, req.query.filter, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    console.log('Отработала функция фильтрации');

    res.send(user);
  });
}

function getSort(paymentType, req, res) {
  paymentType.sortByField(req.query.field, req.query.sort, (err, user) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    console.log('Отработала функция сортировки');

    res.send(user);
  });
}
//---------------------Платеж по карте----------------------
const cardGetPayment = function(req, res) {
  console.log('Словили GET CardPayment');

  if (Object.keys(req.query).length == 0) {
    getAll(CardPayment, req, res);
  } else if (req.query.filter) {
    getSearch(CardPayment, req, res);
  } else if (req.query.sort) {
    getSort(CardPayment, req, res);
  }
};

const cardPostPayment = function(req, res) {
  console.log('Словили POST CardPayment');
  const payment = new CardPayment({
    number: req.body.number,
    howmuch: req.body.howmuch,
    ttl: req.body.ttl,
    cvc: req.body.cvc,
    comment: req.body.comment,
    email: req.body.email
  });
  payment.save();

  res.sendStatus(200);
};

const cardUpdatePayment = function(req, res) {
  CardPayment.findById(req.body._id, (err, query) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    const obj = {};
    obj[req.body.field] = !query[req.body.field];

    CardPayment.updateOne(query, { $set: obj }, err => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }

      console.log('Object patched!');
      res.sendStatus(200);
    });
  });
};

//---------------------Платеж от клиента банка----------------------
const clientDownloadFile = function(req, res) {
  console.log('Словили POST ClientPayment');
  const filename = 'payment-' + Date.now() + '.txt';
  const filepath = path.join(__dirname, '../files/') + filename;

  console.log(filepath);
  fs.writeFileSync(filepath, createFileText(req.body));

  console.log('Файл создан');

  res.sendFile(filepath, 
    err => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    console.log('Файл отправлен');

    fs.unlink(filepath, err => {
      if (err) {
        console.log('Не удалось удалить файл');
        console.log(err);
      }
      console.log('Файл удален');
    });
  });
};

function createFileText(formData) {
  return `                Платеж
----------------------------------------
От кого:             ${formData.inn}
Бик:                 ${formData.bic}
Номер счета:         ${formData.number}
За что:              ${formData.nds}
Сколько:             ${formData.howmuch}
----------------------------------------
Спасибо что пользуетесь нашими услугами!`;
}

//---------------------Запросы на платеж----------------------
const requestGetPayment = function(req, res) {
  console.log('Словили GET RequestedPayment');

  if (Object.keys(req.query).length == 0) {
    getAll(RequestedPayment, req, res);
  } else if (req.query.filter) {
    getSearch(RequestedPayment, req, res);
  } else if (req.query.sort) {
    getSort(RequestedPayment, req, res);
  }
};

const requestPostPayment = function(req, res) {
  console.log('Словили POST RequestedPayment');
  const payment = new RequestedPayment({
    inn: req.body.inn,
    bic: req.body.bic,
    number: req.body.number,
    nds: req.body.nds,
    howmuch: req.body.howmuch,
    phone: req.body.phone,
    email: req.body.email
  });
  payment.save();

  res.sendStatus(200);
};

module.exports = {
  cardGetPayment,
  cardPostPayment,
  cardUpdatePayment,
  clientDownloadFile,
  requestGetPayment,
  requestPostPayment
};
