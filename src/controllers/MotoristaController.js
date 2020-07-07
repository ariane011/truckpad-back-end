const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;

        const [count] = await connection('motoristas').count();

        const motoristas = await connection('motoristas')
            .limit(16)
            .offset((page - 1) * 5)
            .select([
                'id', 'nome', 'telefone', 'dtNascimento', 'cpf', 'cnh', 'categoria', 'status'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(motoristas)
    },

    async show(request, response){
        const {id} = request.params;

        const motorista = await connection('motoristas')
            .select([
                'id', 'nome', 'telefone', 'dtNascimento', 'cpf', 'cnh', 'categoria', 'status'
            ]).where('id', id).first();

        return response.json(motorista)
    },

    async create(request, response){
        const { nome, telefone, dtNascimento, cpf, cnh, categoria } = request.body;
        const id = crypto.randomBytes(4).toString('hex');
        const status = true;

        await connection('motoristas').insert({
            id,
            nome,
            telefone,
            dtNascimento,
            cpf,
            cnh,
            categoria,
            status,
        });

        return response.status(201).send();
    },

    async update(request, response){
        const {id} = request.params;
        const status = true;

        const motorista = await connection('motoristas')
            .where('id', id)
            .select('id')
            .first();

        const { nome, telefone, dtNascimento, cpf, cnh, categoria } = request.body;

        await connection('motoristas').update({
            nome,
            telefone,
            dtNascimento,
            cpf,
            cnh,
            categoria,
            status
        }).where('id', id);

        if(motorista == null){
            return response.status(401).json({ error: 'Operação não permitida' });
        }

        return response.status(200).send();
    },

    async disable(request, response){
        const {id} = request.params;

        const status = false;

        const motorista = await connection('motoristas')
            .where('id', id)
            .select('id')
            .first();

        await connection('motoristas').update({
            status
        }).where('id', id);

        if(motorista == null){
            return response.status(401).json({ error: 'Operação não permitida' });
        }

        return response.status(200).send();
    },
}
