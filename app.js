const express = require('express');
const app = express(); //instancia do express
const morgan = require('morgan');

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');

app.use(morgan('dev')); //retorna um log
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);
/*app.use('/teste', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Ok!'
    });
});*/

//Nao encontra nenhuma rota
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;