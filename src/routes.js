const express = require('express');

const HomeController = require('./controllers/HomeController');
const MotoristaController = require('./controllers/MotoristaController');

const routes = express.Router();

routes.get('/', HomeController.index);
routes.get('/motoristas', MotoristaController.index);
routes.get('/motoristas/:id', MotoristaController.show);
routes.post('/motoristas', MotoristaController.create);
routes.put('/motoristas/:id', MotoristaController.update);
routes.delete('/motoristas/:id', MotoristaController.disable);

module.exports = routes;