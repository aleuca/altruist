// passport config
const db = require('../../altruist_database')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



passport.use(new LocalStrategy({},
    // get user from db by username
    // check password
    // if correct: done(null, user)
    // else: done(err)
    // to validate a login
    (username, password, done) => {
        const query = `SELECT * FROM db.users WHERE user_name = $1`
        const values = [username]

        db.query(query, values)
        .then((dbResponse) => {
           if(dbResponse.rows.length && dbResponse.rows[0].user_password === password) {
               done(null, dbResponse.rows[0]);
               return;
           }
           done('username and/or password incorrect');
        })
        .catch((err) => {
            done(err)
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
        // throw error
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

module.exports = {
    authenticateLogin,
    authenticateSession
}