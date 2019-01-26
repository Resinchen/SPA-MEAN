const mongoose = require('mongoose');

const requestedPaymentSchema = new mongoose.Schema({
    inn: { type: String, required: true, minlength:10, maxlength: 12},
    bic: { type: String, required: true, minlength: 9, maxlength: 9},
    number: { type: String, required: true , minlength: 20, maxlength: 20},
    nds: { type: String, required: true },
    howmuch: { type: Number, required: true, min: 1000, max: 75000},
    phone: { type: String, required: true, validate: /\+7 \d\d\d \d\d\d-\d\d-\d\d/ },
    email: { type: String, required: true, validate: /[A-Za-z0-1\s]*@[a-z]*\.[a-z]*/}
});

requestedPaymentSchema.statics.findByField = function (field, item, cb) {
    const obj = {}
    obj[field] = item
    return this.find(obj, cb)
};

requestedPaymentSchema.statics.sortByField = function (field, sortParam, cb) {
    const obj = {}
    obj[field] = sortParam
    return this.find({}, cb).sort(obj)
};


const RequestedPaymentModel = mongoose.model('RequestedPayment', requestedPaymentSchema);

module.exports = RequestedPaymentModel;