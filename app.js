'use strict';

// Initialise the Express server
const express = require('express');
const app = express();

// Import our Pug and SASS compilers
const pugCompiler = require(__dirname + '/scripts/compilers/pug');
const sassCompiler = require(__dirname + '/scripts/compilers/sass');

// Compile Pug and SASS files in /app
pugCompiler.compilePugFiles(__dirname + '/app');
sassCompiler.compileSassFile(__dirname + '/app/sass/main.scss');

// Set our routing to the /public directory
app.use('/', express.static(__dirname + '/public'));

// For Bower, set the routing from /lib to /bower_components
app.use('/lib', express.static(__dirname + '/bower_components'));

// Listen for connections on port 8585
app.listen(8585, () => {
    console.log('Server running on http://localhost:8585');
});
