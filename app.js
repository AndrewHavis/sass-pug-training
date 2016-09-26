'use strict';

// Initialise the Express server
const express = require('express');
const app = express();

// Import our Pug and SASS compilers
const pugCompiler = require(__dirname + '/scripts/compilers/pug');
const sassCompiler = require(__dirname + '/scripts/compilers/sass');

// Import fs-extra
const fse = require('fs-extra');

// Compile Pug and SASS files in /app
pugCompiler.compilePugFiles(__dirname + '/app');
sassCompiler.compileSassFile(__dirname + '/app/sass/main.scss');

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

// Listen for connections on port 8585
app.listen(8585, () => {
    console.log('Server running on http://localhost:8585');
});
