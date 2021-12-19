const mysql = require('mysql2/promise');
/* const dotenv = require('dotenv');
const jwt = require('jsonwebtoken'); */

async function connect(){

    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '#Password123',
        database:'inventory'
    });
    console.log('conectou...');
    global.connection = connection;
    return connection
}
connect();

async function registerStore(store){
    const { store_name, store_owner, email, password } = store;
    const conn = await connect();
    const sql = 'INSERT INTO tbStore(store_name, store_owner, email, password) VALUES (?,?,?,?);';
    const values = [ store_name, store_owner, email, password ];
    await conn.query(sql, values);
}

async function fetchStores(){
    const conn = await connect();
    const sql = 'SELECT * FROM inventory.tbstore;';
    return conn.query(sql);
}

async function modifyStore(id, store){
    const { store_name, store_owner, email, password } = store;
    const conn = await connect();
    const sql = `UPDATE inventory.tbstore SET store_name = '${store_name}', store_owner = '${store_owner}', email = '${email}', password = '${password}' WHERE (store_id = '${id}');`;
    return conn.query(sql);
}

async function removeStore(id){
    const conn = await connect();
    const sql = `DELETE FROM inventory.tbstore WHERE (store_id = '${id}');`
    return conn.query(sql);
}

async function registerProduct(product) {
    const { product_name, product_image, minimum_quantity, current_quantity, section_id, store_id } = product;

    const conn = await connect();
    const sql = `INSERT INTO tbproduct(product_name, product_image, minimum_quantity, current_quantity, section_id, store_id) VALUES (?,?,?,?,?,?);`;
    const values = [ product_name, product_image, minimum_quantity, current_quantity, section_id, store_id ];

    return conn.query(sql, values);
}

async function registerSection(section) {
    const { section_name, store_id } = section;

    const conn = await connect();
    const sql = `INSERT INTO inventory.tbsection(section_name, store_id) VALUES (?,?);`;
    const values = [ section_name, store_id ];

    return conn.query(sql, values);
}

module.exports = {registerStore,fetchStores,modifyStore,removeStore,registerProduct,registerSection}