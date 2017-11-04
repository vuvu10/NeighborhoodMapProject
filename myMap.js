
//initializating the map function
var map;
//adding a blank array marker globally!
var markers = [];

//loading the map with the creation of this function...
function initMap() {
	//instantiating the map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 40.786754, lng: -73.977476},
		zoom: 14

	});
	//These are the locations of the restaurants which the user will see.
	var myLocations = [
	{
		name: 'Aangan',
		lat: 40.799369,
		long: -73.968775
	},
	{
		name: 'Bar Boulud',
		lat: 40.77172,
		long: -73.981684
	},
	{
		name: 'Big Daddy',
		lat: 40.791246,
		long: -73.973842
	},
	{
		name: 'Candle Cafe West',
		lat: 40.790505,
		long: -73.975161
	},
	{
		name: 'City Diner',
		lat: 40.790505,
		long:-73.975161
	},
	{
		name: 'Chipotle Mexican Grill',
		lat: 40.786191,
		long: -73.977863
	},
	{
		name: 'Cibo & Vino',
		lat: 40.79001,
		long: -73.974851
	},
	{
		name: 'Carmine Italian Restaurant',
		lat: 40.791096,
		long: -73.973991

	},
	{
		name: 'Hnery\s',
		lat: 40.800825,
		long: -73.968245
	},
	{
		name: 'Serafina Uppwer West Side',
		lat: 40.782219,
		long: -73.98059

	},
	{
		name: 'Sugar Factory',
		lat: 40.775252,
		long: -73.982592
	},
	{
		name: 'Metro Diner',
		lat: 40.797438,
		long: -73.970146
	},
	{
		name: 'La Caridad',
		lat: 40.783204,
		long: -73.980799
	},
	{
		name: 'Le Monde',
		lat: 40.783204,
		long: -73.980799
	},
	{
		name: 'Le Piff NYC',
		lat: 40.777528,
		long: -73.981723
	},
	{
		name: 'Luce',
		lat: 40.775902,
		long: -73.981849
	},
	{
		name: 'The Mermaid Inn',
		lat: 40.788766,
		long: -73.974454
	},
	{
		name: 'French Roast',
		lat: 40.787632,
		long: -73.976769
	},
	{
		name: '5 Napkin Burger',
		lat: 40.787076,
		long: -73.978092
	},
	{
		name: 'Regional',
		lat: 40.796368,
		long: -73.970983
	},
		


	var biginfoWindow = new google.maps.InfoWindow();
	var bounds = new google.maps.LatLngBounds();

	//Looping through the locations so I can create one marker per location.
	for (var i = 0; i < myLocations.length; i++) {
		//Getting positions from the myLocations list.
		var position = {lat: myLocations[i].location.lat, lng: myLocations[i].long};//
		var title = myLocations[i].title;
		//Adding my markers per location into a markers array.
		var marker = new google.maps.Marker({
			position: position,
			title: title,
			animation: google.maps.Animation.DROP,
			id: i 
		});
		//taking the marker to a list of arrays.
		markers.push(marker);
		//making an event to open infowindow after each marker is clicked.
		marker.addListener('click', function(){
			populatedInfoWindow(this, bigInfoWindow);

		});
	   }
	   document.getElementById('show-listings').addEventListener('click, show-Listings');
	   document.getElementById('hide-listings').addEventListener('click, hide-Listings');

	  // map.fitBounds(bounds);
	}

	function populateInfoWindow(marker, infoWindow) {
		//here we're trying to see if the infowindow is nt opened on the marker!
		if (infowindow.marker != marker) {
		  infowindow.marker = marker;
		  infowindow.setContent('<div>' + marker.title + '</div>');
		  infoWindow.open(map, marker);
		  //this is to verify that the marker property is closed whenever the infowindow is shut down.
		  infoWindow.addListener('closeclick', function() {
		  	infoWindow.marker = null;
		  });
		}
	}

	function showListings() {
		var bounds = new google.maps.LatLngBounds();
		//here extending the boundary of the map.
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
			bounds.extend(markers[i].position);
		}
		map.fitBounds(bounds);
	}
	//looping through all the markers & displaying them!
	function hideListings() {
		for (var i = 0; i <markers.length; i++) {
			markers[i].setMap(null);
		}
	}

var ViewModel = function()	{
	this.restaurantList = ko.observableArray(myLocations);
};

var viewModel = new ViewModel();

ko.applyBindings(viewModel);







