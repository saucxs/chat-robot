const mysql = require('mysql');
const dbConfig = require('../config').db;
const mysqlPool = mysql.createPool({
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host,
});

let query = function (sql, values) {
    return new Promise((resolve => {
        mysqlPool.getConnection(function (err, connection) {
            if(err){
                resolve(err);
            }else{
                connection.query(sql, values, (err, rows) => {
                    if(err){
                        reject(err)
                    }else{
                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    }))
}

module.exports = {
    query
}
