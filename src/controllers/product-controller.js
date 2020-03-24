'use strict';

const ValidatorContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');


exports.get = async (req, res) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'falha ao processar requisicao',
            error: e
        });
    }
}


exports.getBySlug = async (req, res) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'falha ao processar requisicao',
            error: e
        });
    }
}

exports.getById = async (req, res) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'falha ao processar requisicao',
            error: e
        });
    }

}

exports.getByTag = async (req, res) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'falha ao processar requisicao',
            error: e
        });
    }
}


exports.post = (req, res) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.title, 3, "O titulo devera ter no minimo 3 caracteres");
    contract.hasMinLen(req.body.slug, 3, "O slug devera ter no minimo 3 caracteres");
    contract.hasMinLen(req.body.description, 3, "A description devera ter no minimo 3 caracteres");
    contract.hasMaxLen(req.body.title, 50, "O titulo nao devera exceder 50 caracteres");

    if (contract.isValid()) {
        try {
            repository.create(req.body)
            res.status(201).send({
                message: "Produto cadastrado com sucesso"
            });

        } catch (e) {
            res.status(500).send({
                message: 'falha ao processar requisicao',
                error: e
            });
        }
    } else {
        res.status(400).send(contract.errors()).end();
    }


}


exports.put = async (req, res) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.title, 3, "O titulo deve ter mais de 3 caracteres");
    contract.hasMinLen(req.body.description, 3, "A descricao deve ter mais de 3 caracteres");
    contract.isGreaterThanZero(req.body.price, "O preco nao pode ser menor que 0");

    if (contract.isValid()) {
        try {
            await repository.update(req.params.id, req.body)
            res.status(200).send({
                message: "Produto atualizado com sucesso."
            })
        } catch (e) {
            res.status(400).send({
                message: "Ocorreu um erro ao atualizar produto",
                data: e
            })
        }
    } else {
        res.status(400).send(contract.errors()).end();
    }


}

exports.delete = async (req, res) => {

    try {
        await repository.delete(req.body.id);
        res.status(200).send({
            message: "produto removido com sucesso"
        })

    } catch (e) {
        res.status(400).send({
            message: "Ocorreu um erro ao atualizar produto",
            data: e
        })
    }
}