'use strict';

// Import environment variables
require('dotenv').config();

// Initialise the Express server
const express = require('express');
const app = express();

// Import our Pug and SASS compilers
const pugCompiler = require(__dirname + '/scripts/compilers/pug');
const sassCompiler = require(__dirname + '/scripts/compilers/sass');

// Import fs-extra
const fse = require('fs-extra');

// Import and configure body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json({
    extended: true
}));

// Compile Pug and SASS files in /app
pugCompiler.compilePugFiles(__dirname + '/app');
sassCompiler.compileSassFile(__dirname + '/app/sass/main.scss');

// Import Flickr API (for proxying)
const flickrAPI = require('flickrapi');

// Copy js files
let copyOptions = {
    clobber: true // Overwrite existing files in public/js *without* prompting
};
fse.copy(__dirname + '/app/js', __dirname + '/public/js', copyOptions, (err) => {
    if (!!err) {
        console.error('Error copying scripts');
    }
});

// Set our routing to the /public directory
app.use('/', express.static(__dirname + '/public'));

// For Bower, set the routing from /lib to /bower_components
app.use('/lib', express.static(__dirname + '/bower_components'));

// Flickr API proxying
let flickrOptions = {
    api_key: process.env.FLICKR_API_KEY,
    secret: process.env.FLICKR_API_SECRET,
    user_id: process.env.FLICKR_USER_ID,
    access_token: process.env.FLICKR_ACCESS_TOKEN,
    access_token_secret: process.env.FLICKR_ACCESS_TOKEN_SECRET
};

flickrAPI.authenticate(flickrOptions, (error, flickr) => {
    if (!error) {
        flickr.proxy(app, '/api/flickr/');
    }
    else {
        console.error('Cannot set up Flickr API', error);
    }
});

// Listen for connections on port 8585
app.listen(8585, () => {
    console.log('Server running on http://localhost:8585');
});
