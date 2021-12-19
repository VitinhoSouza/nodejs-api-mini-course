const express = require('express');
const storeController = require('./controllers/storeController')
const productController = require('./controllers/productController')
const sectionController = require('./controllers/sectionController')

const auth = require('./middleware/auth');
const routes = express.Router();

routes.get('/', auth,(req,res)=>{
    res.send("Hello World!");
})

routes.post('/register-store',storeController.registerStore);

routes.get('/stores', storeController.fetchStores);

routes.put('/store/:id', storeController.modifyStore);

routes.delete('/store/:id', storeController.removeStore);

routes.post('/login',storeController.login);

routes.post('/register-product',auth,productController.registerProduct);

routes.post('/register-section',auth,sectionController.registerSection);


module.exports = routes;