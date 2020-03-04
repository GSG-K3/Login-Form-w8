const path = require('path');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db_user = require('../Models/db_users');
const salt = 'GyrfG#$#1254U.ygt';

router.get('/user/profile/:userId', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'Public', 'profile.html'));
});

router.get('/api/user/profile/:userId', (req, res) => {
  
  db_user.getUserById(req.params.userId ,(err, result)=>{
   res.send(result[0])
  })
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
        if (db_user.checkAuthentication(token, salt)) {
          res.redirect(`/user/profile/${result[0].user_id}`);
        } else {
          res.sendFile(
            path.join(__dirname, '..', '..', 'Public', 'notlogin.html')
          );
        }
      } else {
        res.sendFile(
          path.join(__dirname, '..', '..', 'Public', 'notlogin.html')
        );
      }
    } else {
      res.sendFile(path.join(__dirname, '..', '..', 'Public', 'notlogin.html'));
    }
  });
});

router.get('/user/logout', (req, res) => {
  res.clearCookie('token');
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

module.exports = router;
