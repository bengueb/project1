<<<<<<< HEAD

// Variables
////////////////////////////////////////////////////////////////////////////

=======
>>>>>>> 02789279443b36321e1c985b319d0470ec0ed1ed
var brewId = [];
var beerName = '';
var i, obj;
var key = 'd3ce3953f3ce707f75971d6af7b1053c';
var baseUrl = 'https://sandbox-api.brewerydb.com/v2/';
<<<<<<< HEAD
=======

// Function for AJAX call to Brewery DB API
$(document).ready(function(){
  
    // Event listner for brewMe button
    $('#brewMe').on('click', function(event){
>>>>>>> 02789279443b36321e1c985b319d0470ec0ed1ed


<<<<<<< HEAD
// Functions
///////////////////////////////////////////////////////////////////////////


 // AJAX call to retrieve data regarding the brewery using OpenBrewery DB API
=======
        var breweryName = $('#brew-search').val().trim();

        displayBreweryInfo(breweryName);
        getBrewery(breweryName);
        getBreweryByName(breweryName)
        
    });
 
});

 // AJAX call to retrieve data regarding the brewery
>>>>>>> 02789279443b36321e1c985b319d0470ec0ed1ed
 function displayBreweryInfo (arr){

    var queryURL = 'https://api.openbrewerydb.org/breweries?by_name=' + arr;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response){
        
        var responseBody = response;

        var beerListModal = $('<button>');
        beerListModal.attr('type', 'button');
        beerListModal.addClass('btn btn-primary beer-list-btn');
        beerListModal.attr('data-toggle', 'modal');
        beerListModal.attr('data-target', '#beer-list-modal');
        beerListModal.text('Beer List');

        var newBrewSection = $('<div>').append(
            $('<p>').text('Brewery Name: ' + responseBody[0].name),
            $('<p>').text('Address: ' + responseBody[0].street),
            $('<p>').text('City: ' + responseBody[0].city),
            $('<p>').text('State: ' + responseBody[0].state),
            $('<p>').text('Postal Code: ' + responseBody[0].postal_code),
            $('<p>').text('Phone: ' + responseBody[0].phone),
            $('<p>').text('Site: ' + responseBody[0].website_url),
            beerListModal
        )

        

        newBrewSection.attr('id','brewery-result');
<<<<<<< HEAD
        $('#resultsArea').prepend(newBrewSection);
=======
        $('#bearlist-result').append(newBrewSection);
>>>>>>> 02789279443b36321e1c985b319d0470ec0ed1ed
    
    });

    
}


// AJAX call to get beer list from a particular brewery using BreweryBD API
function getBrewery (arr) {

    var queryURL = 'https://sandbox-api.brewerydb.com/v2/breweries?key=' + key + '&name=' + encodeURI(arr);

    $.ajax({
        url:queryURL,
        method: 'GET',
        success: function(response) {
            handleResponse(response);
        }
    });
}

// Function to handle the AJAX Call Response
function handleResponse(response){

    var responseBody = JSON.stringify(response);
    obj = JSON.parse(responseBody);
        
    brewId.push(obj.data[0].id);

    console.log(brewId);

    getBeerList(brewId);

}


// Function to call API to get current beer list
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

// Function to get current beer list and display it as a table in the beer list modal
function displayBeerList(response){

    var responseBody = response;

    for (i in responseBody.data){
        beerName = responseBody.data[i].name;
        console.log(beerName);  
        for (j in responseBody.data){
            abv = responseBody.data[i].abv;
            console.log(abv);
        }
    
    var beerListTable = function(){
        
        var tRow = $('<tr>');
        var beerTd = $('<td>').text(beerName);
        var abvTd = $('<td>').text(abv);
        tRow.append(beerTd, abvTd);
        $('#beer-table').append(tRow);
    }
       
        $('#beer-table > tbody').append(beerListTable());

<<<<<<< HEAD
        
=======
        $('#beerlist-result').append('<p>' + beerName + '</p>');

>>>>>>> 02789279443b36321e1c985b319d0470ec0ed1ed
    }
    
}
