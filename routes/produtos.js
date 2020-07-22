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
router.get('/byId/:id_produto', (req, res, next) => {
    const id_produto = req.params.id_produto;
    postgres.pool.query('SELECT * FROM produto WHERE id_produto = $1', [id_produto], (error, results) => {
        if (error) {
            res.status(error.status || 500);
        }else{
            res.status(200).json(results.rows)
        }
    });
});

//ALTERA UM PRODUTO
router.put('/alterar', (req, res, next) =>{
    const { id_produto, nome, preco} = req.body;
    postgres.pool.query(
        'UPDATE produto SET nome = $1, preco = $2 WHERE id_produto = $3',
        [nome, preco, id_produto], (err, result) => {
            if(err){
                res.status(err.status || 500);
            }
            else{
                res.status(201).send({
                    message: 'Produto alterado com sucesso',
                    body: {
                        product: { nome, preco, id_produto }
                    },
                }); 
            }
        }
    );
});

//DELETA UM PRODUTO
router.delete('/excluir/:id_produto', (req, res, next) => {
    const id_produto = req.params.id_produto;
    postgres.pool.query('DELETE FROM produto WHERE id_produto = $1', [id_produto], (error, results) => {
        if (error) {
            res.status(error.status || 500);
        }else{
            res.status(200).send({
                message: 'Produto excluido com sucesso'
            })
        }
    });
});


module.exports = router;