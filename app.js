const express = require('express');
const app = express(); //instancia do express

app.use((req, res, next) => {
    res.status(200).send({
        mensagem: 'Ok!'
    });
});

module.exports = app;