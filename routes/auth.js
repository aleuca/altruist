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


router.get('/signup', function (req, res) {
    if (!req.user) {
        res.render('signup');
        return;
    }

    res.redirect('/favors');
});

router.get('/login', function (req, res) {
    res.render('login');
});

// second arrow function is error handler
router.post('/login', userAuth, (req, res, next) => {
    req.flash('success', "Welcome to ALtruist, " + req.user.user_name);
    res.redirect('/favors');
}, (err, req, res, next) => {
    if (err) {
        req.flash('error', err.message);
    }
    res.redirect('/login');
});

router.get('/logout', (req, res) => {
    console.log("TRYING TO LOG OUT", req.session)
    req.logout();
    req.flash('success', 'Successful logout!');
    res.redirect('/favors');
});

module.exports = router;