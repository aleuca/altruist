const express = require('express');
const app = express();
let router  = express.Router();
const db = require('../altruist_database');

//INDEX - show all favors
router.get('/', function(req, res) {
    const query = 'SELECT * FROM db.favors'
    db.query(query)
    .then((dbResponse) => {
        console.log(dbResponse.rows)
        res.render('favors/favors', { favors: dbResponse.rows })
    })
    .catch((err) => {
        res.status(400).send(err)
    })
});

//CREATE - add new favor to DB
router.post('/', function(req, res) {
    const query = 'INSERT INTO db.favors(favor_name, favor_description, favor_date, expiry_date, favor_difficulty) VALUES($1, $2, $3, $4, $5)'
    const date = new Date();
    const expiry_date = req.body.expiry_date;
    console.log(expiry_date)
    const values = [req.body.favor_name, req.body.favor_description, date, expiry_date, req.body.favor_difficulty]


    db.query(query, values)
    .then((dbResponse) => {
        res.redirect('/favors');
    })
    .catch((err) => {
        res.status(400).send(err);
    })
  });

//NEW - show form to create new favor
router.get('/new', function(req, res) {
    res.render('favors/new');
});

// SHOW - shows more info about one favor
router.get('/:favorId', function(req, res) {
    const query = `SELECT * FROM db.favors WHERE favor_id = ${req.params.favorId}`
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
router.get('/:favorId/edit', function(req, res) {
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
router.post('/:favorId', function (req, res) {
    const query = `UPDATE db.favors SET (favor_name, favor_description, expiry_date, favor_difficulty) = ($1, $2, $3, $4) WHERE favor_id = ${req.params.favorId}`
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
router.delete('/:favorId', function(req, res) {
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





