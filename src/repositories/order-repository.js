const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async () => {
    var res = await Order.find({}, 'number status items')
        .populate('customer', 'name email')
        .populate('items.product', 'title slug price')

    return res;
}

exports.create = async (data) => {
    var order = new Order(data);
    await order.save();
}