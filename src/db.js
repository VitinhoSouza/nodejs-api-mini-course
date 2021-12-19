const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config({path: 'src/.env'})

async function connect(){

    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const connection = await mysql.createConnection({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database:process.env.DATABASE
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

async function login(email, password){
    
    if(!email || !password){
        return {message : 'Please, provide an email and password!'}
    }

    const conn = await connect();
    const sql = `SELECT * FROM inventory.tbstore WHERE email = '${email}';`
    
    try {
        const result = await conn.query(sql);
        console.log(result[0][0]);
        if(result.length == 0 || password != result[0][0].password){
            return {message : 'Email or password is incorrect'}
        } else {
            const id = result[0][0].store_id;
            const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                expiresIn : process.env.JWT_EXPIRES_IN
            });

            console.log(`The token is : ${token}`);
            return { token, id }
        }
    } catch (error) {
        throw error;
    }
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

module.exports = {registerStore,fetchStores,modifyStore,removeStore,login,registerProduct,registerSection}