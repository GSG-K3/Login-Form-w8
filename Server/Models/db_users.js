const db_connection = require('./db_config/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function getUserByEmail(user_email, callback) {
  const sql = {
    text: 'SELECT * FROM users WHERE user_email = $1;',
    values: [user_email]
  };
  db_connection.query(sql.text, sql.values, (err, result) => {
    if (err) callback(err);
    callback(null, result.rows);
  });
}

function getUserById(user_id, callback) {
  const sql = {
    text:
      'SELECT user_name,user_email,user_telephone,role FROM users WHERE user_id = $1;',
    values: [user_id]
  };
  db_connection.query(sql.text, sql.values, (err, result) => {
    if (err) callback(err);
    callback(null, result.rows);
  });
}

function deleteUserById(user_id, callback) {
  const sql = {
    text: 'DELETE FROM users WHERE user_id = $1;',
    values: [user_id]
  };
  db_connection.query(sql.text, sql.values, (err, result) => {
    if (err) callback(err);
    callback(null, result.rows);
  });
}

function checkPasswordSync(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function checkAuthentication(token, salt) {
  return jwt.verify(token, salt);
}

function insertUser(userData, callback) {
  console.log('hello');
  const hashedPassword = hashPasswordSync(userData.password);
  console.log(hashedPassword);
  const sql = {
    text: `INSERT INTO users(user_name,user_email,password,user_telephone,role) VALUES ($1,$2,$3,$4,$5)`,
    values: [
      userData.fullName,
      userData.Email,
      hashedPassword,
      userData.tel,
      'user'
    ]
  };
  db_connection.query(sql.text, sql.values, (err, results) => {
    if (err) {
      console.log(err);
      callback(err);
    }
    console.log(results);
    callback(null, results);
  });
}

function hashPasswordSync(password) {
  return bcrypt.hashSync(password, 10);
}

module.exports = {
  getUserByEmail,
  insertUser,
  checkAuthentication,
  checkPasswordSync,
  getUserById,
  deleteUserById
};
