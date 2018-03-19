let express = require("express");
let router = express.Router();
let passport = require("passport");
const db = require('../altruist_database');
const { insertUser } = require('../altruist_database/queries');
const { passwordValidator } = require('./validators');
const {
    encrypt,
    secret,
    authenticateLogin: userAuth,
    authenticateSession: sessionAuth
} = require('./authentication');


router.get('/signup', function(req, res) {
    if(!req.user) {
        res.render('signup');
        return;
    }

    res.redirect('/favors');
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', userAuth, (req, res) => {
    res.redirect('/favors');
});

router.post('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy((err) => {
            res.redirect('/favors');
        })
        return;
    }
    res.redirect('/favors');
});

module.exports = router;