// Function for AJAX call to Brewery DB API
$(document).ready(function(){
     
    var brewId = [];
    var beerName = '';
    var i, obj;
    var key = 'd3ce3953f3ce707f75971d6af7b1053c';
    var baseUrl = 'https://sandbox-api.brewerydb.com/v2/';

   

    // Event listner for brewMe button
    $('#brewMe').on('click', function(event){

        event.preventDefault();

        $('#results').empty();

        var breweryName = $('#brew-search').val().trim();

        displayBreweryInfo(breweryName);
        getBrewery(breweryName);
        getBreweryByName(breweryName)
        

    });

    
});

 // AJAX call to retrieve data regarding the brewery
 function displayBreweryInfo (arr){

    var queryURL = 'https://api.openbrewerydb.org/breweries?by_name=' + arr;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response){
        
        var responseBody = response;

        var newBrewSection = $('<div>').append(
            $('<p>').text('Brewery Name: ' + responseBody[0].name),
            $('<p>').text('Address: ' + responseBody[0].street),
            $('<p>').text('City: ' + responseBody[0].city),
            $('<p>').text('State: ' + responseBody[0].state),
            $('<p>').text('Postal Code: ' + responseBody[0].postal_code),
            $('<p>').text('Phone: ' + responseBody[0].phone),
            $('<p>').text('Site: ' + responseBody[0].website_url)
        )

        newBrewSection.attr('id','brewery-result');
        $('#bearlist-results').append(newBrewSection);
    
    });

    
}

// AJAX call to get beer list from a particular brewery
function getBrewery (arr) {

    // var queryURL = 'https://sandbox-api.brewerydb.com/v2/breweries?key=' + key + '&name=Harmon%20Brewing%20Company';
    var queryURL = 'https://sandbox-api.brewerydb.com/v2/breweries?key=' + key + '&name=' + encodeURI(arr);

    $.ajax({
        url:queryURL,
        method: 'GET',
        success: function(response) {
            handleResponse(response);
        }
    });
}

function handleResponse(response){

    var responseBody = JSON.stringify(response);
    obj = JSON.parse(responseBody);
        
    brewId.push(obj.data[0].id);

    console.log(brewId);

    getBeerList(brewId);

}

function getBeerList (arr){

    var queryURL = baseUrl + 'brewery/' + brewId + '/beers?key=' + key;
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: 'GET',
        success: function(response){
            displayBeerList(response);
        }
    });
    
}

function displayBeerList(response){

    var responseBody = response;

    for (i in responseBody.data){
        beerName = responseBody.data[i].name;
        console.log(beerName);  

        $('#beerlist-results').append('<p>' + beerName + '</p>');

    }
    
}
