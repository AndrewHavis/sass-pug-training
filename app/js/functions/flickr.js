'use strict';

const buildPhotoUrl = (farmId, serverId, photoId, secret, size) => {
    // Build the URL of a Flickr photo given the required information in the parameters
    let photoUrl = 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + photoId + '_' + secret + '_' + size + '.jpg';
    console.log(photoUrl);
    return photoUrl;
};

// Bring in jQuery
define(["jquery"], () => {

    let getKittenPhoto = () => {

        // Let's get a Flickr photo of a kitten

        // Specify our search query
        let searchQuery = {
            method: "flickr.photos.search",
            text: "kitten"
        };

        // Specify our request options
        let requestOptions = {
            type: "post",
            url: "/api/flickr",
            data: JSON.stringify(searchQuery), // We need to stringify JSON objects when sending them via jQuery
            dataType: "json",
            contentType: "application/json",
            processData: true
        };

        // Now set up the request
        let request = $.ajax(requestOptions);
        request.done((result) => {

            // First, let's get the information for our photo
            console.log(result);
            let photo = result.photos.photo[0];
            let farmId = photo.farm;
            let serverId = photo.server;
            let photoId = photo.id;
            let secret = photo.secret;
            let title = photo.title;
            let size = 'n'; // Medium size: 320 on longest side

            // If our request is successful, add an img element to the page with a picture of our kitten
            let imgElement = document.createElement('img');
            imgElement.setAttribute('src', buildPhotoUrl(farmId, serverId, photoId, secret, size));
            imgElement.setAttribute('alt', 'Kitten');
            imgElement.setAttribute('title', title);
            $('.col-middle').append(imgElement);

        });
        request.fail((error) => {
            console.error('There was an error getting a kitten photo!', error);
        });
    };

    return {
        getKittenPhoto: getKittenPhoto
    };

});
