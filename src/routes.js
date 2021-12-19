const express = require('express');
const storeController = require('./controllers/storeController')

const routes = express.Router();
const db = require('./db');

routes.get('/', (req,res)=>{
    res.send("Hello World!");
})

routes.post('/register-store',storeController.registerStore)

routes.get('/stores', storeController.fetchStores)

routes.put('/store/:id', storeController.modifyStore)

routes.delete('/store/:id', storeController.removeStore )


module.exports = routes;