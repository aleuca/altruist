let express = require("express");
let router = express.Router();
let passport = require("passport");
const db = require('../db');

router.get('/signup', function(req, res) {
    res.render('signup')
});

router.get('/login', function(req, res) {
    res.render('login')
});

module.exports = router;