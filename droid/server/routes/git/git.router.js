const Router = require('express').Router();
const controller = require('./git.controller.js');

//Router.post('/access', controller.access);
Router.get('/complete', controller.complete);
//Router.get('/me', controller.me);

module.exports = Router;