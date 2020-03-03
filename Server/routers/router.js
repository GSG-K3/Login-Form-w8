const path = require('path');
const express = require('express');
const router = express.Router();


router.get('/t',(req,res)=>{
    res.send('hi')
})
module.exports = router;