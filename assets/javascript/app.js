'use strict';


$(document).ready(function() {
    $('.dropdown-item').on('click', function(event) {
        let longitude = $(event.target).data('long');
        let latitude = $(event.target).data('lat');
        getBreweries(longitude, latitude);
    });
});