"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlExecute = exports.dbInit = void 0;
const mysql_1 = require("mysql");
let pool;
const dbInit = () => {
    try {
        pool = (0, mysql_1.createPool)({
            connectionLimit: 4,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME
        });
        console.log('Database connected successfully!');
    }
    catch (error) {
        console.error("Database connection failed!");
    }
    ;
};
exports.dbInit = dbInit;
/**
 * sqlExecute executes queries in MySQl database
 *
 * @param { string[] | Object } params - provides the parameterized values
 * @param { string } query provides sql query
 */
const sqlExecute = (query, params) => {
    try {
        if (!pool) {
            throw new Error('Database not connected!');
        }
        return new Promise((resolve, reject) => {
            pool.query(query, params, (err, res) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
    catch (error) {
        console.error(error);
    }
};
exports.sqlExecute = sqlExecute;
