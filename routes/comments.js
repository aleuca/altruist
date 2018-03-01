const express = require('express');
const app = express();
let router  = express.Router({ mergeParams: true });
let favors = [
    {
        id: 1,
        name:'one idea',
        description: 'this and this and this and that',
        user: 1
    },

    {
        id: 2,
        name:'second idea',
        description: 'nightvale',
        user: 2
    },

    {
        id: 3,
        name:'third idea',
        description: 'wrong description',
        user: 1
    }
]


router.get('/new', function(req, res) {
    res.render('comments/new')
})

router.post('/', function(req, res) {
    const favor = favors.find((item) => {
        return item.id === Number(req.params.favorId)
    })
    res.redirect('/favors/' + favor.id)
})


// EDIT COMMENT ROUTE
router.get('/:commentId/edit', function(req, res) {
    res.render('comments/edit');
});

// UPDATE COMMENT ROUTE
router.put(':/commentId', function (req, res) {
    res.redirect('comments/' + req.params.id);
});

// DESTROY COMMENT ROUTE
router.delete('/:commentId', function(req, res) {
    res.redirect('/favors' + req.params.id);
});


module.exports = router;