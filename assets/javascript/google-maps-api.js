let map;
let service;
let infowindow;
let breweries = [];

function initialize() {
    let neighborhood = new google.maps.LatLng(47.608013,-122.335167);

    map = new google.maps.Map(document.getElementById('map-results'), {
        center: neighborhood,
        zoom: 12
    });
}

function getLocation(name) {
    let seattle = google.maps.LatLng(47.608013,-122.335167)
    map = new google.maps.Map(document.getElementById('map-results'), {
        center: seattle,
        zoom: 12
    });

    let request = {
        query: name,
        fields: ['formatted_address', 'geometry', 'icon', 'name', 'permanently_closed', 'photos', 'place_id', 'plus_code', 'types'],
    };

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, callback);
}

function getBreweries(longitude, latitude) {
    let neighborhood = new google.maps.LatLng(longitude, latitude);

    map = new google.maps.Map(document.getElementById('results'), {
        center: neighborhood,
        zoom: 13
    });

    let request = {
        location: neighborhood,
        radius: '2000',
        type: ['bar'],
        keyword: ['brewery']
    };

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function callback(results, status) {
    console.log(results)
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
        let name = '<h3>' + place.name + '</h3>';
        let address = '<p>' + place.vicinity + '</p>';
        let picture = '<img class="place-image" src="' + place.photos[0].getUrl() + '" />'
        let containerBeginning = '<div class="container">';
        let columns = '<div class="row"><div class="col-6">' + name + address + '</div><div class="col-6">' + picture + '</div></div>';
        let containerEnd = '</div class="container">' 
        infowindow.setContent(containerBeginning + columns + containerEnd);
        infowindow.open(map, marker);
    });
}