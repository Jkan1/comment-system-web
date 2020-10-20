"use strict"

global.config = require('config');
const express = require('express');
const app = express();

app.set('port', config.get('PORT'));
app.use(express.json());
app.use(function (req, res, next) {
    console.log(`API ${req.method}${req.url}`);
    next();
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-api-key');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const mongoLib = require('./utility/mongoLib');
const router = require('./routes/routes');

app.use('', router);

(function startInitialProcess() {
    const http = require('http');
    mongoLib.connect().then().catch(error => console.log(error));
    http.createServer(app).listen(app.get('port'), function () {
        console.log(`Express server listening on ${config.get('PORT')}`);
    });
})();

