'use strict';

function findBreweriesByNeiborhood(longitude, latitude) {
    let queryURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + longitude + ',' + latitude + '&radius=3000&keyword=breweries&key=' + config.placesKey;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        let breweries = [];
        response.results.forEach(function(brewery) {
            breweries.push(brewery.name);
        });
        console.log(breweries);
    })
}

findBreweriesByNeiborhood(47.6792172,-122.3860312);