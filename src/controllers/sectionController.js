const db = require('../db');

module.exports = {
    async registerSection(req, res) {

        await db.registerSection(req.body);
        res.json(req.body);
    },
}