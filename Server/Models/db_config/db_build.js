const fs = require('fs');
const path = require('path');
const { insertUser } = require('./../db_users');

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

      console.log('Create Admin');
      dbconnection.end(() => {
        console.log('the connection has been closed');
      });
    }
  });
  
  insertUser(
    {
      fullName: 'Admin',
      Email: 'admin@no.com',
      password: '0',
      tel: '059000000',
      role: 'admin'
    },
    (err, result) => {
      if (err) throw err;
      console.log('Admin is Created');
    }
  );
};

buildDataBase();

module.exports = buildDataBase;
