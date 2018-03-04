const express = require('express'),
      app = express(),
      parser = require('body-parser'),
      passport = require('passport'),
      session = require('express-session'),
      LocalStrategy = require('passport-local').Strategy,
      methodOverride = require('method-override');
      port = 5000;

const favorRoutes = require('./routes/favors');
const commentRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');


app.use(parser.urlencoded({extended: true}));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use((req, res, next) => {
    console.log("Request:", req.path, req.method, req.body)
    next()
})

// ====================
// PASSPORT CONFIG
// ====================

app.use(session({
    rolling: true,
    saveUninitialized: false,
    secret: 'fuckety fuck',
}));

app.use(passport.initialize());
app.use(passport.session());



app.get('/', function(req, res) {
    res.render('landing')
});

app.use(authRoutes);
app.use('/favors/:favorId/comments', commentRoutes);
app.use('/favors', favorRoutes);


app.listen(process.env.PORT || port, function(){
    console.log("server running");
});


