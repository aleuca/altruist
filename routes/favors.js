const express = require('express');
const app = express();
let router  = express.Router();
const db = require('../altruist_database');
const { authenticateSession: sessionAuth } = require('./authentication')

//INDEX - show all favors
router.get('/', function(req, res) {
    const query = 'SELECT * FROM db.favors'
    db.query(query)
    .then((dbResponse) => {
        let sortedFavors = dbResponse.rows.sort().reverse();
        res.render('favors/favors', { favors: sortedFavors, currentUser: req.user });
    })
    .catch((err) => {
        res.status(400).send(err);
    })
});

//CREATE - add new favor to DB
router.post('/', sessionAuth, function(req, res) {
    const query = 'INSERT INTO db.favors(favor_name, favor_description, favor_date, expiry_date, favor_difficulty, user_id) VALUES($1, $2, $3, $4, $5, $6)'
    const date = new Date();
    const expiry_date = req.body.expiry_date;
    const values = [req.body.favor_name, req.body.favor_description, date, expiry_date, req.body.favor_difficulty, req.user.user_id]

    db.query(query, values)
    .then((dbResponse) => {
        res.redirect('/favors');
    })
    .catch((err) => {
        res.status(400).send(err);
    })
  });

//NEW - show form to create new favor
router.get('/new', sessionAuth, function(req, res) {
    res.render('favors/new');
});

// SHOW - shows more info about one favor
router.get('/:favorId', sessionAuth, function(req, res) {
    const query = `SELECT * FROM db.favors WHERE favor_id = ${req.params.favorId} AND user_id = ${req.user.user_id}`
    db.query(query)
    .then((dbResponse) => {
        console.log(dbResponse.rows);
        res.render('favors/show', { favor: dbResponse.rows[0] });
    })
    .catch((err) => {
        res.status(400).send(err);
    })
});

// EDIT FAVOR ROUTE
router.get('/:favorId/edit', sessionAuth, function(req, res) {
    const query = `SELECT * FROM db.favors WHERE favor_id = ${req.params.favorId}`
    db.query(query)
    .then((dbResponse) => {
        res.render('favors/edit', { favor: dbResponse.rows[0] });
    })
    .catch((err) => {
        res.status(400).send(err);
    })
});

// UPDATE FAVOR ROUTE
router.post('/:favorId', sessionAuth, function (req, res) {

    const query = `UPDATE db.favors SET (favor_name, favor_description, expiry_date, favor_difficulty) = ($1, $2, $3, $4) WHERE favor_id = ${req.params.favorId} AND user_id = ${req.user.user_id}`
    const values = [req.body.favor_name, req.body.favor_description, req.body.expiry_date, req.body.favor_difficulty]
    db.query(query, values)
    .then((dbResponse) => {
        console.log("values:", values)
        res.redirect('/favors/' + req.params.favorId)
    })
    .catch((err) => {
        res.status(400).send(err);
    })
});

// DESTROY FAVOR ROUTE
router.delete('/:favorId', sessionAuth,  function(req, res) {
    const query = `DELETE FROM db.favors WHERE favor_id = ${req.params.favorId}`
    db.query(query)
    .then((dbResponse) => {
        res.redirect('/favors')
    })
    .catch((err) => {
        res.status(400).send(err);
    })
});

module.exports = router;





