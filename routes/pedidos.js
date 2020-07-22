const express = require('express');
const router = express.Router();
const postgres = require('../postgres');

//RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    postgres.pool.query('SELECT * FROM pedido', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    });
});

//INSERE UM PEDIDO
router.post('/inserir', (req, res, next) => {
    const { id_pedido, quantidade, id_produto} = req.body;
    const { rows } = postgres.pool.query(
        'INSERT INTO pedido (id_pedido, quantidade, id_produto) VALUES ($1, $2, $3)',
        [id_pedido, quantidade, id_produto], (err, result) => {
            if(err){
                res.status(err.status || 500);
            }
            else{
                res.status(201).send({
                    message: 'Pedido adicionado com sucesso',
                    body: {
                        pedido: { id_pedido, quantidade, id_produto }
                    },
                }); 
            }
        }
    );
});

//RETORNA OS DADOS DE UM PEDIDO
router.get('/byId/:id_pedido', (req, res, next) => {
    const id_pedido = req.params.id_pedido;
    postgres.pool.query('SELECT * FROM pedido WHERE id_pedido = $1', [id_pedido], (error, results) => {
        if (error) {
            res.status(error.status || 500);
        }else{
            res.status(200).json(results.rows)
        }
    });
});

//DELETA UM PEDIDO
router.delete('/excluir/:id_pedido', (req, res, next) => {
    const id_pedido = req.params.id_pedido;
    postgres.pool.query('DELETE FROM pedido WHERE id_pedido = $1', [id_pedido], (error, results) => {
        if (error) {
            res.status(error.status || 500);
        }else{
            res.status(200).send({
                message: 'Pedido excluido com sucesso'
            })
        }
    });
});


module.exports = router;