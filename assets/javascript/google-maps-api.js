// Initialize variables
let map;
let service;
let infowindow;
let breweries = [];

/**
 * Create an initial map centered at Seattle.
 */
function initialize() {
    let neighborhood = new google.maps.LatLng(47.608013,-122.335167);

    map = new google.maps.Map(document.getElementById('map-results'), {
        center: neighborhood,
        zoom: 10
    });
}

/**
 * Get new map searching for brewery by given name.
 * Centers map around location found by the search query result.
 * @param {String} name 
 */
function getBreweryByName(name) {
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
    service.findPlaceFromQuery(request, nameCallback);
}

/**
 * Callback function returning an object containing information about the location/s found by getBreweryByName.
 * @param {Object} results 
 * @param {String} status 
 */
function nameCallback(results, status) {
    console.log(status)
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            let place = results[i];
            createMarker(results[i]);
        }
    }
    map.setCenter(results[0].geometry.location);
}

/**
 * Get new map searching for breweries around a given longitude and latitude.
 * Centers map around given longitude and latitude.
 * @param {Int} longitude 
 * @param {Int} latitude 
 */
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
    service.nearbySearch(request, getBreweriesCallback);
}

/**
 * Callback function returning an object containing information about the location/s found by getBreweries.
 * @param {Object} results 
 * @param {String} status 
 */
function getBreweriesCallback(results, status) {
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

/**
 * Creates a new marker on the map and adds an onclick function setting InfoWindow content.
 * @param {Object} place 
 */
function createMarker(place) {
    let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'mouseover', function() {
        let name = '<h3>' + place.name + '</h3>';
        let address = '<p><i class="fas fa-map-marker-alt"></i> ' + place.vicinity + '</p>';
        let hours = '<p>' + place.opening_hours + '</p>'
        let picture = '<img class="place-image" src="' + place.photos[0].getUrl() + '" />';
        let containerBeginning = '<div class="container">';
        let columns = '<div class="row"><div class="col-6">' + name + address + '</div><div class="col-6">' + picture + '</div></div>';
        let containerEnd = '</div class="container">' 
        infowindow.setContent(containerBeginning + columns + containerEnd);
        infowindow.open(map, marker);
    });
}