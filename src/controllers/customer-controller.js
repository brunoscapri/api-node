'use strict';

const ValidatorContract = require('../validators/fluent-validator');
const repository = require("../repositories/customer-repository");
const md5 = require("md5");
const emailService = require('../services/email-service');
const auth = require('../services/auth-service');

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

    emailService.send(req.body.email, "Bien viueendo manito", global.EMAIL_TMPL.replace('{0}', req.body.name));

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles: ["user"]
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

exports.authenticate = async (req, res) => {
    try {
        var customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });
        if (!customer) {
            res.status(404).send({
                message: "senha ou email invalidos"
            });
            return;
        }
        var token = await auth.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(200).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Erro ao processar requisicao",
        });
    }
}

exports.refreshToken = async (req, res) => {
    try {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        var data = await auth.decodeToken(token);

        var customer = await repository.getById(data.id);

        if (!customer) {
            res.status(404).send({
                message: "cliente nao encontrado"
            });
            return;
        }

        var newToken = await auth.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(200).send({
            token: newToken,
            data: {
                email: customer.email,
                name: customer.name
            }
        });

    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "erro ao processar requisicao"
        });
    }



}