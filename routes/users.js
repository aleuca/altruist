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

//SHOW -- show users
router.get('/', function(req, res) {
    const query = 'SELECT * FROM db.users'

    db.query(query)
    .then ((dbResponse) => {
        res.send(dbResponse.rows)
    })
    .catch((err) => {
        res.status(400).send(err);
    })
});

//CREATE -- create user
router.post('/', function(req, res) {
    const validPassword = passwordValidator(req.body.user_password, req.body.user_password_confirmation);
    const query = 'SELECT user_email FROM db.users'
    return db.query(query)
    .then((dbResponse) => {
        for (row in dbResponse.rows) {
            if(row.user_email === req.body.user_email) {
                return false
            }
        }
        return true
    })
    .catch((err) => {
        if(err) {
            console.log('exists');
            // user exists in the database -- handle this
            return false
        }
    })
    .then((validEmail) => {
        if(validPassword && validEmail) {
            insertUser(req, res);
            return;
        }
        //Need to fix this error
        res.redirect('/favors')
    })

});


// SHOW -- user page with all favors
router.get('/:id', sessionAuth, function(req, res) {
    const ownedQuery = 'SELECT * FROM db.favors where user_id_owner = $1'
    const acceptedQuery = 'SELECT * FROM db.favors where user_id_accepted = $1'

    const userValues = [req.user.user_id]

    Promise.all([
        db.query(ownedQuery, userValues),
        db.query(acceptedQuery, userValues),
    ])
    .then (([ownedResponse, acceptedResponse]) => {
        res.render('favors/userpage', { currentUser: req.user, ownedFavors: ownedResponse.rows, acceptedFavors: acceptedResponse.rows });
    })
    .catch((err) => {
        res.status(400).send(err);
    })
});

module.exports = router;