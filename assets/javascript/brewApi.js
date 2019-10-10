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
                $('<p>').text('Brewery Name: ' + responseBody[0].name),
                $('<p>').text('Address: ' + responseBody[0].street),
                $('<p>').text('City: ' + responseBody[0].city),
                $('<p>').text('State: ' + responseBody[0].state),
                $('<p>').text('Postal Code: ' + responseBody[0].postal_code),
                $('<p>').text('Phone: ' + responseBody[0].phone),
                $('<p>').text('Site: ' + responseBody[0].website_url)
            )

            $('#results').append(newBrewSection);
        
        });

        
    }
    
    $('#brewMe').on('click', function(event){

        event.preventDefault();

        $('#results').empty();

        var breweryName = $('#brew-search').val().trim();
        console.log(breweryName);

        displayBreweryInfo(breweryName);


    });

});
