let express = require("express");
let router = express.Router();
let passport = require("passport");
const db = require('../altruist_database');
const { insertUser } = require('../altruist_database/queries');
const { passwordValidator} = require('./validators');
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

router.get('/users', function(req, res) {
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
    const validated = passwordValidator(req.body.user_password, req.body.user_password_confirmation);

    console.log(validated, typeof req.body.user_password, typeof req.body.user_password_confirmation )

    if(validated) {
        insertUser(req, res);
        return;
    }

    //Need to fix this error
    res.redirect('/favors')

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