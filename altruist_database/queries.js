const { encrypt, secret } = require('../routes/authentication');
const db = require('./index.js')

function insertUser(req, res) {
    const query = 'INSERT INTO db.users(user_name, user_password, user_email) VALUES($1, $2, $3)'
    const values = [req.body.user_name, encrypt(req.body.user_password, secret), req.body.user_email]

    console.log("values", values)

    db.query(query, values)
    .then ((dbResponse) => {
        console.log("dbResponse", dbResponse)
        res.redirect('/favors')
    // need validator for user email and if it exists in the database already
    // need validator for password and confirm password match
    })
    .catch((err) => {
        res.status(400).send(err);
    })
}

module.exports = {
    insertUser
}