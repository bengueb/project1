// Function for AJAX call to Brewery DB API
$(document).ready(function(){

    function displayBreweryInfo (arr){

        var queryURL = "https://api.openbrewerydb.org/breweries?by_name=" + arr;
        // var queryURL = "https://api.openbrewerydb.org/breweries?by_name=fremont%20brewing";
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response){
            
            var responseBody = response;
            console.log(responseBody);

            var newBrewSection = $('<div>').append(
                $('<p>').text(responseBody[0].name),
                $('<p>').text(responseBody[0].street),
                $('<p>').text(responseBody[0].city),
                $('<p>').text(responseBody[0].state),
                $('<p>').text(responseBody[0].postal_code),
                $('<p>').text(responseBody[0].phone),
                $('<p>').text(responseBody[0].website_url)
            )

            $('#results').append(newBrewSection);
        
        });

        
    }
    
    $('#brew-me-btn').on('click', function(event){

        event.preventDefault();
        
        $('#results').empty();

        var breweryName = $('#brew-search').val().trim();
        console.log(breweryName);

        displayBreweryInfo(breweryName);


    });

});
