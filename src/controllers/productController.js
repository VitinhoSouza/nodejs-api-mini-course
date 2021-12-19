const db = require('../db');

module.exports = {

    async registerProduct(req, res) {

        await db.registerProduct(req.body);
        res.json(req.body);
    },
    
}