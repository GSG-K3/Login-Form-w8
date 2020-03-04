const path = require("path");
const express = require("express");
const router = express.Router();
const db_user = require("../Models/db_users");

router.post("/user/login", (req, res) => {
  const userEmail = req.body.logInEmail;
  const password = req.body.logInPassword;
});

router.get("/user/Registration", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "..", "Public", "Registration.html"));
});

router.post("/user/Registration", (req, res) => {
  const userData = req.body;
  db_user.insertUser(userData, (err, data) => {
    // err
    // resu[slt
    if (err) {
      //
      //return
    }
    res.redirect("/");
  });
});

module.exports = router;
