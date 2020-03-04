const db_connection = require('./db_config/connection');

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

module.exports = { getUserByEmail };
