const express = require('express');
const app = express();
let router  = express.Router();

//INDEX - show all favors

router.get('/', function(req, res) {
    if(err) {
        console.log(err);
    } else {
        res.render('favors/favors');
    }
});

module.exports = router;

//CREATE - add new favor to DB

//NEW - show form to create new favors

// SHOW - shows more info about one favor

// EDIT FAVOR ROUTE

// UPDATE FAVOR ROUTE

// DESTROY FAVOR ROUTE