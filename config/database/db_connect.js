const mysql = require("mysql2/promise");

const config = require("./db_config").local;

const pool = mysql.createPool({
    ...config,
    waitForConnections: true,
    connectionLimit: 5,
});

module.exports = pool;
