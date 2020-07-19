const express = require('express');
const router = express.Router();
const postgres = require('../postgres');

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    postgres.pool.query('SELECT * FROM produto', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    });
});


//INSERE UM PRODUTO
router.post('/inserir', (req, res, next) => {
    /*const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    };

    res.status(201).send({
        mensagem: 'Insere um produto',
        produtoCriado: produto
    });*/

    const { id_produto, nome, preco} = req.body;
    const { rows } = postgres.pool.query(
        'INSERT INTO produto (id_produto, nome, preco) VALUES ($1, $2, $3)',
        [id_produto, nome, preco], (err, result) => {
            if(err){
                res.status(err.status || 500);
            }
            else{
                res.status(201).send({
                    message: 'Produto adicionado com sucesso',
                    body: {
                        product: { id_produto, nome, preco }
                    },
                }); 
            }
        }
    );
});

//RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;
    res.status(200).send({
        mensagem: 'Detalhes do produto',
        id_produto: id
    });
});

//ALTERA UM PRODUTO
router.patch('/alterar', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'Produto alterado'
    });
});

//DELETA UM PRODUTO
router.delete('/excluir', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto excluido'
    });
});


module.exports = router;