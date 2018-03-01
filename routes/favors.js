const express = require('express');
const app = express();
let router  = express.Router();

let favors = [
    {
        id: 1,
        description: 'this and this and this and that',
        user: 1
    },

    {
        id: 2,
        description: 'nightvale',
        user: 2
    },

    {
        id: 3,
        description: 'wrong description',
        user: 1
    }
]

//INDEX - show all favors
router.get('/', function(req, res) {
    res.render('favors/favors', { favors });
});

//CREATE - add new favor to DB
router.post('/', function(req, res) {
    res.redirect('/favors');
      // need to redirect to all favors and display new favor that was just created
  });

//NEW - show form to create new favor
router.get('/new', function(req, res) {
    res.render('favors/new');
});

// SHOW - shows more info about one favor
router.get('/:favorId', function(req, res) {
    res.render('favors/show');
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





