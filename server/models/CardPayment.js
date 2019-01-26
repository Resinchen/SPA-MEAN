const mongoose = require('mongoose');

const cardPaymentSchema = new mongoose.Schema({
    number: { type: String, required: true, minlength: 16, maxlength: 16},
    howmuch: { type: Number, required: true, min: 1000, max: 75000 },
    ttl: { type: String, required: true, minlength: 5, maxlength: 5, validate: /\d\d\/\d\d/ },
    cvc: { type: String, required: true , minlength: 3, maxlength: 3, validate: /\d{3}/ },
    comment: { type: String, default: '', maxlength: 150 },
    email: { type: String, required: true, validate: /[A-Za-z0-1\s]*@[a-z]*\.[a-z]*/ },
    notsafe: { type: Boolean, default: false },
    notcorrect: { type: Boolean, default: false }
});

cardPaymentSchema.statics.findByField = function (field, item, cb) {
    const obj = {}
    obj[field] = item
    return this.find(obj, cb)
};

cardPaymentSchema.statics.sortByField = function (field, sortParam, cb) {
    const obj = {}
    obj[field] = sortParam
    return this.find({}, cb).sort(obj)
};

const CardPaymentModel = mongoose.model('CardPayment', cardPaymentSchema);

module.exports = CardPaymentModel;