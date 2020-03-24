const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async () => {
    var res = await Customer.find({});
    return res;
}

exports.create = async (body) => {
    var customer = new Customer(body);
    await customer.save();
}