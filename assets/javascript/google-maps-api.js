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

    // Create a new map centered around the chose neighborhood
    map = new google.maps.Map(document.getElementById('map-results'), {
        center: neighborhood,
        zoom: 13
    });

    // Set request parameters
    let request = {
        location: neighborhood,
        radius: '1500',
        type: ['bar'],
        keyword: ['brewery', 'brewing']
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
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            let place = results[i];
            window.setTimeout(function() {
                createMarker(results[i]);
            }, i * 200);
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
    let customMarker = {
        path: 'M 13,35 C13,35 27,21 27,13 C27,6 21,0 13,0 C6,0 0,6 0,13 C0,21 13,35 13,35 z',
        fillColor: 'red',
        fillOpacity: 1.0,
        scale: .9,
        strokeColor: 'black',
        strokeWeight: 1.5
    };

    // Create a new Marker
    let marker = new google.maps.Marker({
        map: map,
        icon: customMarker,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location
    });

    let request = {
        placeId: place.place_id
    };

    // Make a call to the places API to get more details about a given brewery
    service.getDetails(request, function(result, status) {
        console.log(result)
        google.maps.event.addListener(marker, 'mouseover', function() {
            let name = '<h3>' + result.name + '</h3>';
            let address = '<p><i class="fas fa-map-marker-alt"></i> ' + result.formatted_address + '</p>';
            var date = new Date();
            let hours = '<p><i class="fas fa-clock"></i> ' + result.opening_hours.weekday_text[date.getDay()] + '</p>';
            let phoneNumber = '<p><i class="fas fa-phone"></i> ' + result.formatted_phone_number + '</p>';
            let website = '<p><i class="fas fa-window-maximize"></i> ' + result.website + '</p>';
            let picture = '<img class="place-image" src="' + result.photos[0].getUrl() + '" />';
            let containerBeginning = '<div class="container">';
            let columns = '<div class="row"><div class="col-6">' + name + address + hours + phoneNumber + website + '</div><div class="col-6">' + picture + '</div></div>';
            let containerEnd = '</div class="container">' 
            infowindow.setContent(containerBeginning + columns + containerEnd);
            infowindow.open(map, marker);
        });
    });


    
   
}