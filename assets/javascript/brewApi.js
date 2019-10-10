// Function for AJAX call to Brewery DB API
$(document).ready(function(){

    function displayBreweryInfo (){

        // var brewery = $(this).attr('');
        // var queryURL = "https://api.openbrewerydb.org/breweries?by_name=" + brewery;
        var queryURL = "https://api.openbrewerydb.org/breweries?by_name=fremont%20brewing";
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response){
            console.log(response);
        });
    
    }
    
    $('#brew-search').on('submit', function(event){

        var breweryName = $('#brew-search').val().trim();
        console.log(breweryName);
    });

});
