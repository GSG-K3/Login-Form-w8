const db_user = require('./../Models/db_users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function loginUser(email, password) {
  db_user.getUserByEmail(email, (err, result) => {
    if (err) throw err;
    if (result != null && result.length > 0) {
      const hash = result[0].password;
      if (bcrypt.compareSync(password, hash)) {
      } else {
      }
    }
  });
}

loginUser();
