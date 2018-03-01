const express = require('express'),
      app = express(),
      parser = require('body-parser'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      encrypt = require('bcrypt'),
      methodOverride = require('method-override');
      port = 5000;

const favorRoutes = require('./routes/favors');
const commentRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');


app.use(parser.urlencoded({extended: true}));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));


app.get('/', function(req, res) {
    res.render('landing')
});

app.use(authRoutes);
app.use('/favors/:favorId/comments', commentRoutes);
app.use('/favors', favorRoutes);


app.listen(process.env.PORT || port, function(){
    console.log("server running");
});


// ====================
// PASSPORT CONFIG