'use strict';

const repository = require('../repositories/order-repository');
const guid = require('guid');

exports.get = async (req, res) => {
    try {
        var data = await repository.get()
        res.status(200).send(
            data
        );
    } catch (e) {
        res.status(500).send({
            message: "nao foi possivel completar requisicao",
            error: e
        });
    }
}


exports.post = async (req, res) => {
    try {
        await repository.create({ //compondo json
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });

        res.status(201).send({
            message: 'Pedido cadastrado com sucesso.'
        });

    } catch (e) {
        res.status(500).send({
            message: 'Erro ao processar pedido',
            error: e
        });
    }

}