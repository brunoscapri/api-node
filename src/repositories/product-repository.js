'use strict';

const mongoose = require("mongoose");
const Product = mongoose.model("Product");


exports.get = async () => {
    var res = await Product.find({
        active: true
    }, "title price slug tags");

    return res;
}

exports.getBySlug = async (slug) => {
    var res = await Product.findOne({
        active: true,
        slug: slug
    }, "title description price slug tags")

    return res;
}

exports.getById = async (id) => {
    var res = await Product.findById(id, "title price description active")
    return res;
}

exports.getByTag = async (tag) => {
    var res = Product.find({
        tags: tag
    });

    return res;
}

exports.create = async (body) => {
    let product = new Product(body);
    await product
        .save()
}

exports.update = async (id, body) => {
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: body.title,
            description: body.description,
            price: body.price
        }
    })
}


exports.delete = async (id) => {
    await Product.findOneAndRemove(id);
}