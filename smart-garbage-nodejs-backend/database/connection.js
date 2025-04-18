const mysql = require("mysql2");
require("dotenv").config();

const conn = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

const db = mysql.createPool(conn);

db.getConnection((err, con) => {
    if (err) {
        console.log("MySQL Not Connected");
        console.log(err);
    } else {
        console.log("MySQL Connected");
    }
});

module.exports = db;