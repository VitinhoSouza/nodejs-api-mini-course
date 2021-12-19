const db = require('../db');

module.exports = {
    async registerStore(req,res) {
        const store = await db.registerStore(req.body);
        res.json(store);
    },

    async fetchStores(req, res) {
        const stores = await db.fetchStores();
        res.send(stores[0]);
    },

    async modifyStore(req, res) {
        const {id} = req.params;
        const store = await db.modifyStore(id,req.body);
        res.send(store);
    },

    async removeStore(req,res) {
        const {id} = req.params;
        const store = await db.removeStore(id);
        res.send(store);
    },

    async login(req, res){
        const { email, password } = req.body;
        const result = await db.login(email, password);
        res.send(result);
    }


}