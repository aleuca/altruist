const express = require('express');
const app = express();
let router  = express.Router();
const db = require('../db');

//INDEX - show all favors
router.get('/', function(req, res) {
    res.render('favors/favors', { favors: db.favors });
});

//CREATE - add new favor to DB
router.post('/', function(req, res) {
    let newFavor = {id: db.favors.length + 1, name: req.body.name, description: req.body.favor, user: null};
    db.favors.push(newFavor);
    res.redirect('/favors');
      // need to redirect to all favors and display new favor that was just created
  });

//NEW - show form to create new favor
router.get('/new', function(req, res) {
    res.render('favors/new');
});

// SHOW - shows more info about one favor
router.get('/:favorId', function(req, res) {
    console.log(db.favors)
    const favor = db.favors.find((item) => {
        return item.id === Number(req.params.favorId)
    })
    res.render('favors/show', { favor });
});

// EDIT FAVOR ROUTE
router.get('/:favorId/edit', function(req, res) {
    res.render('favors/edit');
});

// UPDATE FAVOR ROUTE
router.put(':/favorId', function (req, res) {
    res.redirect('favors/' + req.params.id);
});

// DESTROY FAVOR ROUTE
router.delete('/:favorId', function(req, res) {
    res.redirect('/favors');
});

module.exports = router;





