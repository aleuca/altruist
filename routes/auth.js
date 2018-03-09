let express = require("express");
let router = express.Router();
let passport = require("passport");
const db = require('../altruist_database');
const { passwordValidator} = require('./validators');
const { authenticateLogin: userAuth } = require('./authentication');
const { authenticateSession: sessionAuth } = require('./authentication');
const { encrypt, secret } = require('./authentication');


router.get('/signup', function(req, res) {
    if(!req.user) {
        res.render('signup');
    }

    res.redirect('/favors');
});

router.get('/users', function(req, res) {
    console.log(req.body)
    const query = 'SELECT * FROM db.users'

    db.query(query)
    .then ((dbResponse) => {
        res.send(dbResponse.rows)
    })
    .catch((err) => {
        res.status(400).send(err);
    })
});

router.post('/users', function(req, res) {
    const query = 'INSERT INTO db.users(user_name, user_password, user_email) VALUES($1, $2, $3)'
    const values = [req.body.user_name, encrypt(req.body.user_password, secret), req.body.user_email]

    db.query(query, values)
    .then ((dbResponse) => {
        console.log('DB Response for user creation', dbResponse)
        res.redirect('/favors')
    // need validator for user email and if it exists in the database already
    // need validator for password and confirm password match
    })
    .catch((err) => {
        res.status(400).send(err);
    })
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