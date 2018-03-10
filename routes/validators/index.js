const db = require('../../altruist_database')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secret = "secret_secret";
const { insertUser } = require('../../altruist_database/queries')

function passwordValidator(password, confirmation) {
    if (password === confirmation) {
        return true
    }
    return false
}


module.exports = {
    passwordValidator
}