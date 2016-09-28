'use strict';

// Import Bootstrap and jQuery
require.config({
    paths: {
        bootstrap: '/lib/bootstrap/dist/js/bootstrap.min',
        jquery: '/lib/jquery/dist/jquery.min'
    }
});

// Import our hover and Flickr functions
require(['functions/hover', 'functions/flickr'], (hover, flickr) => {
    console.log(hover);
    hover.changeDoughnutColour();
    console.log(flickr);
    flickr.getKittenPhoto();
});
