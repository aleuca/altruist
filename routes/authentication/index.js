// passport config
const db = require('../../altruist_database')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secret = "secret_secret";
// eventually, secret should be an environment variable

passport.use(new LocalStrategy({
    usernameField: 'user_name',
    passwordField: 'user_password'
},
    // get user from db by username
    // check password
    // if correct: done(null, user)
    // else: done(err)
    // to validate a login
    (username, password, done) => {
        console.log("have username and password:", username, password)
        const query = `SELECT * FROM db.users WHERE user_name = $1`
        const values = [username]

        db.query(query, values)
        .then((dbResponse) => {
            console.log("Local strategy response:", dbResponse.rows)
            const hash = encrypt(password, secret);
            const user = dbResponse.rows[0];

            if(user) {
                console.log("input password:", password, "hash:", hash, "user password:", user.user_password);
            }

            if (user && hash === user.user_password) {
              done(null, user);
              return;
            }

           done(new Error('username and/or password incorrect'));
        })
        .catch((err) => {
            console.log("Error:", err)
            done(err);
        })
    }

))

passport.serializeUser((user, done) => {
    // to create a session
    done(null, user.user_id);
})

passport.deserializeUser((userId, done) => {
    // to validate a session
    const query = `SELECT * from db.users WHERE user_id = $1`
    const values = [userId]

    db.query(query, values)
    .then((dbResponse) => {
       if(dbResponse.rows.length) {
           done(null, dbResponse.rows[0]);
           return;
       }
       done('No user in a valid session');
    })
    .catch((err) => {
        done(err)
    })
})

const authenticateLogin = passport.authenticate('local', {});

function authenticateSession(req, res, next) {
    if(!req.session.passport) {
        res.redirect('/favors');
        return;
    }
    // find user from database by id
    const id = req.user.user_id
    const query = `SELECT * from db.users WHERE user_id = $1`
    const values = [id]
    db.query(query, values)
    .then((dbResponse) => {
       if(dbResponse.rows.length) {
           next();
           return;
       }
       const err = new Error('unauthenticated session request');
       next(err);
    })
    .catch((err) => {
        next(err);
    })
}


function encrypt(password, secret) {
  let cipher = crypto.createCipher('aes-256-ctr', password)
  let crypted = cipher.update(secret,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

module.exports = {
    authenticateLogin,
    authenticateSession,
    encrypt,
    secret
}