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

function checkPasswordSync(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function checkAuthentication(token, salt) {
  return jwt.verify(token, salt);
}

module.exports = { getUserByEmail, checkPasswordSync, checkAuthentication };
