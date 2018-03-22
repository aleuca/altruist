const { encrypt, secret } = require('../routes/authentication');
const db = require('./index.js')
const passport = require('passport')

function insertUser(req, res) {
    const query = 'INSERT INTO db.users(user_name, user_password, user_email) VALUES($1, $2, $3)'
    const values = [req.body.user_name, encrypt(req.body.user_password, secret), req.body.user_email]

    console.log("values", values)

    db.query(query, values)
    .then ((dbResponse) => {
        console.log("dbResponse", dbResponse)
        passport.authenticate("local")(req, res, function() {
            req.flash('success', `Welcome to Altruist, ${req.body.user_name}`)
            res.redirect("/favors");
        });
    // need validator for user email and if it exists in the database already
    // need validator for password and confirm password match
    })
    .catch((err) => {
        req.flash('error', 'Error signing up, contact system administrator if this persists.')
        res.redirect('/favors')
    })
}

module.exports = {
    insertUser
}