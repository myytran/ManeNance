'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');



const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const configDB = require('./config/database.js');
const moment = require('moment');
moment().format();



//configuration
mongoose.connect(configDB.url); //connect to our database
require('./config/passport')(passport); // pass passport for configuration


app.use(express.static('public'));
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs') // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
// session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); //// use connect-flash for flash messages stored in session
// routes
require('./app/routes.js')(app, passport); //// load our routes and pass in our app and fully configured passport

//launch
app.listen(port);
console.log('The magic happens on port ' + port);
