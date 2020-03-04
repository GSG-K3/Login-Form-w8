const path = require('path');
const express = require('express');
const router = express.Router();

router.post('/user/login', (req, res) => {
  const userEmail = req.body.logInEmail;
  const password = req.body.logInPassword;
});

module.exports = router;
