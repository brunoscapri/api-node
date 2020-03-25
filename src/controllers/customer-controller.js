'use strict';

const ValidatorContract = require('../validators/fluent-validator');
const repository = require("../repositories/customer-repository");
const md5 = require("md5");

exports.get = async (req, res) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: "falha ao processar requisicao",
            error: e
        })
    }
}

exports.post = async (req, res) => {

    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.name, 3, "O nome devera ter no minimo 3 caracteres");
    contract.isEmail(req.body.email, "Email invalido");
    contract.hasMinLen(req.body.password, 3, "A senha devera ter no minimo 3 caracteres");

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });
        res.status(201).send({
            message: "usuario criado com sucesso"
        })
    } catch (e) {
        res.status(500).send({
            message: "falha ao processar requisicao",
            error: e
        })
    }
}