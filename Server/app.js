const express = require('express');
const app = express();
const cookie = require('cookie-parser'); 
const path = require('path');
const routes = require('./routers/router');



app.use(cookie()); 
app.use(express.json())
app.use(express.urlencoded({extended: false }))
app.use(routes);
app.use(express.static(path.join(__dirname,'..','Public')));
app.set("port", process.env.PORT || 3000)
module.exports = app; 
