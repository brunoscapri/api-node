'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidatorContract = require('../validators/fluent-validator')


exports.get = (req, res) => {
    Product.find({
            active: true
        }, "title price slug").then(x => {
            res.status(200).send({
                itens: x.length,
                products: x
            })
        })
        .catch(e => {
            res.status(400).send({
                message: "falha ao encontrar produto",
                data: e
            })
        });
}


exports.getBySlug = (req, res) => {
    Product.findOne({
        active: true,
        slug: req.params.slug
    }, "title description price slug tags").then(data => {
        res.status(200).send(data)
    }).catch(e => {
        res.status(400).send({
            message: "falha ao encontrar produto",
            data: e
        })
    })
}

exports.getById = (req, res) => {
    Product.findById(req.params.id, "title price description").then(data => {
        res.status(200).send(data)
    }).catch(e => {
        res.status(400).send({
            message: "falha ao encontrar produto",
            data: e
        })
    });
}

exports.getByTag = (req, res) => {
    Product.find({
        tags: req.params.tag,
        active: true
    }, "title description price tags").then(data => {
        res.status(200).send({
            products: data
        });
    }).catch(e => {
        res.status(400).send({
            message: "falha ao encontrar o produto",
            data: e
        })
    });
}


exports.post = (req, res) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.title, 3, "O titulo devera ter no minimo 3 caracteres");
    contract.hasMinLen(req.body.slug, 3, "O slug devera ter no minimo 3 caracteres");
    contract.hasMinLen(req.body.description, 3, "A description devera ter no minimo 3 caracteres");
    contract.hasMaxLen(req.body.title, 50, "O titulo nao devera exceder 50 caracteres");

    if (contract.isValid()) {
        let product = new Product(req.body);
        product
            .save()
            .then((x => {
                res.status(201).send({
                    message: "Produto cadastrado com sucesso"
                });
            })).catch(e => {
                res.status(400).send({
                    message: "Falha: ",
                    data: e
                });
            });
    } else {
        res.status(400).send(contract.errors()).end();
    }



}


exports.put = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        }
    }).then(x => {
        res.status(200).send({
            message: "Produto atualizado com sucesso."
        })
    }).catch(e => {
        res.status(400).send({
            message: "Ocorreu um erro ao atualizar produto",
            data: e
        })
    });
}

exports.delete = (req, res) => {
    Product.findByIdAndDelete(req.body.id).then(x => {
        res.status(200).send({
            message: "produto deletado com sucesso"
        })
    }).catch(e => {
        res.status(400).send({
            message: "erro ao deletar item",
            error: e
        })
    });
}