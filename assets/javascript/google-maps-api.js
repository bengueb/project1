let map;
let service;
let infowindow;
let breweries = [];

function getBreweries(longitude, latitude) {
    let neighborhood = new google.maps.LatLng(longitude, latitude);

    map = new google.maps.Map(document.getElementById('#results'), {
        center: neighborhood,
        zoom: 15
        });

    let request = {
        location: ballard,
        radius: '3000',
        type: ['bar'],
        keyword: ['brewery']
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            let place = results[i];
            createMarker(results[i]);
        }
    }
    results.forEach(function(result) {
        breweries.push(result.name);
    });
}

function createMarker(place) {
    let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}