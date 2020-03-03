const fs = require('fs');
const path = require('path');
const buildDataBase = () => {
  const dbconnection = require('./connection');
  const sql = fs
    .readFileSync(path.join(__dirname, './db_build.sql'))
    .toString();

  dbconnection.query(sql, (err, result) => {
    if (err) {
      console.log(err, 'error');
    } else {
      console.log('database has been created');
      dbconnection.end(() => {
        console.log('the connection has been closed');
      });
    }
  });
};

buildDataBase();

module.exports = buildDataBase;
