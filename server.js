// ******************************************
// INITIALIZATION
// ******************************************
// Dependencies
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Express and Port
const app = express();
const port = process.env.PORT || 3000;

// Connect to database via mongoose
mongoose.connect(config.database)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
const users = require('./routes/users');

// ******************************************
// MIDDLEWARE
// ******************************************
// Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Passport
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// ******************************************
// ROUTES
// ******************************************
// API calls go here
app.use('/users', users);

// Serve static files
app.use(express.static(`${__dirname}/public`));


// Index Route
app.get('/', (req, res) => {
  res.send("Invalid Endpoint");
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
// ******************************************
// API ERROR HANDLER
// ******************************************
// Error handler for 404 - Page Not Found
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    res.status(404).json({
        status: 404,
        message: err.message,
        name: err.name
    });
});

// Error handler for all other errors
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).json({
        status: 500,
        message: err.message,
        name: err.name
    });
});

// ******************************************
// SERVER START
// ******************************************
app.listen(port, () => console.log(`Server started on port ${port}`));
