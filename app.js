const express = require('express'),
      app = express(),
      parser = require('body-parser'),
      passport = require('passport'),
      session = require('express-session'),
      flash = require('connect-flash'),
      LocalStrategy = require('passport-local').Strategy,
      methodOverride = require('method-override');
      port = 5000;


const favorRoutes = require('./routes/favors');
const commentRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');


app.use(parser.urlencoded({extended: true}));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());


// ====================
// PASSPORT CONFIG
// ====================

app.use(session({
    rolling: true,
    saveUninitialized: true,
    secret: 'fuckety fuck',
}));

app.use(passport.initialize());
app.use(passport.session());


// FLASH CONFIG

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});



app.get('/', function(req, res) {
    res.render('landing')
});

app.use(authRoutes);
app.use('/users', userRoutes);
app.use('/favors/:favorId/comments', commentRoutes);
app.use('/favors', favorRoutes);



app.listen(process.env.PORT || port, function(){
    console.log(`server running on ${process.env.PORT || port}`);
});


