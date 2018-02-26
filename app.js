const express = require('express'),
      app = express(),
      parser = require('body-parser'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      encrypt = require('bcrypt'),
      methodOverride = require('method-override');

const favorRoutes = require('./routes/favors');
const commentRoutes = require('./routes/comments');
const authRoutes = require('./routes/auth');

app.use(parser.urlencoded({extended: true}));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));


// ====================
// PASSPORT CONFIG


app.listen(process.env.PORT || 5000, function(){
    console.log("server running");
});
