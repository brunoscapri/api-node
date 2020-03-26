'use strict';

const repository = require('../repositories/order-repository');
const guid = require('guid');
const auth = require('../services/auth-service');

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
    var token = req.body.token || req.query.token || req.headers['x-access-token']

    var data = auth.decodeToken(token);

    try {
        await repository.create({ //compondo json
            customer: data.id,
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