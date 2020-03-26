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

exports.authenticate = async (data) => {
    var res = await Customer.findOne({
        password: data.password,
        email: data.email
    });

    return res;
}

exports.getById = async (id) => {
    var res = await Customer.findOne(id);
    return res;
}