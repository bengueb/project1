function findBreweriesByNeiborhood(longitude, latitude) {
    let queryURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + longitude + ',' + latitude + '&radius=3000&keyword=breweries&key=AIzaSyCT8iFhwZiyzWRzWbplNt4gzAaMuSf14Bg';

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response);
    })
}

findBreweriesByNeiborhood(47.6792172,-122.3860312);