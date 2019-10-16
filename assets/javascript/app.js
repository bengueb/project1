'use strict';


$(document).ready(function() {
    $('.dropdown-item').on('click', function(event) {
        let longitude = $(event.target).data('long');
        let latitude = $(event.target).data('lat');
        getBreweries(longitude, latitude);
    });

     // Event listner for brewMe button
     $('#brewMe').on('click', function(event){

        event.preventDefault();

        $('#beerlist-result').empty();

        var breweryName = $('#brew-search').val().trim();
        $('#brew-search').val('');

        displayBreweryInfo(breweryName);
        getBrewery(breweryName);
        getBreweryByName(breweryName);


        
    });
});