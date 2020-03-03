const express = require('express');
const app = express();
const routes = require('./routers/router');

const cookie = require('cookie-parser'); 

//app.use(routes); 

app.use(cookie()); 
app.use(express.json())
app.use(express.urlencoded({extended: false }))

app.set("port", process.env.PORT || 3000)
module.exports = app; 
