const path = require('path');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db_user = require('../Models/db_users');
const salt = 'GyrfG#$#1254U.ygt';

router.get('/user/profile/:userId', (req, res) => {
  if (isUserLogin(req)) {
    res.sendFile(path.join(__dirname, '..', '..', 'Public', 'profile.html'));
  } else {
    res.sendFile(path.join(__dirname, '..', '..', 'Public', 'notlogin.html'));
  }
});

router.get('/api/user/profile/:userId', (req, res) => {
  console.log(req.cookies);
  if (isUserLogin(req)) {
    db_user.getUserById(req.params.userId, (err, result) => {
      res.send(result[0]);
    });
  } else {
    res.sendFile(path.join(__dirname, '..', '..', 'Public', 'notlogin.html'));
  }
});

router.post('/user/login', (req, res) => {
  const userEmail = req.body.logInEmail;
  const password = req.body.logInPassword;
  db_user.getUserByEmail(userEmail, (err, result) => {
    if (err) throw err;
    if (result != null && result.length > 0) {
      const hashedPassword = result[0].password;
      if (db_user.checkPasswordSync(password, hashedPassword)) {
        var token = jwt.sign({ email: userEmail }, salt);
        res.cookie('token', token);
        res.redirect(`/user/profile/${result[0].user_id}`);
      } else {
        res.sendFile(
          path.join(__dirname, '..', '..', 'Public', 'notlogin.html')
        );
      }
    } else {
      // the user not found in db
      res.sendFile(path.join(__dirname, '..', '..', 'Public', 'notlogin.html'));
    }
  });
});

router.post('/user/logout', (req, res) => {
  clearToken(res);
  res.redirect('/');
});

router.get('/user/Registration', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'Public', 'Registration.html'));
});

router.post('/user/Registration', (req, res) => {
  const userData = req.body;
  db_user.insertUser(userData, (err, data) => {
    // err
    // resu[slt
    if (err) {
      //
      //return
    }
    res.redirect('/');
  });
});

router.delete(`/api/delete/user/profile/:userId`, (req, res) => {
  if (isUserLogin(req)) {
    db_user.deleteUserById(req.params.userId, (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }
      clearToken(res);
      res.send({ status: 'ok', message: 'user Deleted' });
    });
  } else {
    res.sendFile(path.join(__dirname, '..', '..', 'Public', 'notlogin.html'));
  }
});

function clearToken(res) {
  res.clearCookie('token');
}

// to check if user log in
// if user log in the return  true to continue
// otherwise return false and the user will redirect ot log in
function isUserLogin(req) {
  const token = req.cookies === undefined ? null : req.cookies.token;
  if (token == undefined || token === null) return false;

  return db_user.checkAuthentication(token, salt);
}

module.exports = router;
