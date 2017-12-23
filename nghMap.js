
var markers = [];
	//initializating the map function
	var map;
	

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
	
		
	}];




//loading the map with the creation of this map.
function initMap() {
	//creating & instantiating the map
	var NYC = {lat: 40.787011, lng: -73.975368};
	map = new google.maps.Map(document.getElementById('map'), {
	center: NYC,
	mapTypeId: google.maps.MapTypeId.ROADMAP,  
	zoom: 14
	});

	//My infowindow to display the contents of the map.
	var InfowindowContent = [
		

];

	//Displaying multiple markers on a map
	var infoWindow = new google.maps.InfoWindow(), myLocations, i;

	//Looping through the array of locations & placing each one of them on the map.
	for( i = 0; i < myLocations.length; i++) {
		var position = new google.maps.LatLng(myLocations[i][1], myLocations[i][2], myLocations[i][3], myLocations[i][4]);
		bounds.extend(position);
		marker = new google.maps.Marker({
			position: position,
			map: map,
			title: myLocations[i][0]
		});

		//Allowing each marker to have an infowindow...
		google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {
			return function() {
				infoWindow.setContent(content);
				infowindow.open(map, marker);
			}
		})(marker,content,infowindow));

		//center the map so it can fit.
		map.fitBounds(bounds);
	} 

	function googleError () {
		alert('Unfortunately, an error occurred with your Map');
	}


	//getting info from foursquare
	function fourSquare() {
		var places = [];
		//Forsquare ajax request
		var foursquareURL = 'https://api.foursquare.com/v2/venues/search?query=restaurant&ll=40.787011, lng: -73.975368&client_id=U3YLKS5ZAVN21DZGDS3D01T50BJV3CYGVY0DJKPSBFUUFIYU&client_secret=PAHHUGNSGTLXLP3VNG3YJ44DLXBTVNBCLOH0OOH3VMJ4X5YN&v=20170101&limit=20';

		//
		$.ajax({
			url: foursquareURL,
			data: {
				format: 'json'
			},
			datatype: 'jsonp',
		})
		.done(function(data){
			var venue_data = data.response.venues;


		})
		.fail(function(jqxhr, textStatus, error){
			var err = textStatus + ", " + error;
			console.log('Failure in the request: ' + err);

		});

//Knockout to filter places and display list of items
function myViewModel() {
	var self = this;

	this.filter = ko.observaable("");

	this.locationsList = ko.observableArray([]);

	myLocations.forEach(function(locationItem){
		self.locationsList.push( new locations(locationItem) );
	});

	this.locationsList = ko.computed(function() {
		var filter = self.searchFilter().toLowerCase();
		if(filter) {
			return ko.outils.arrayFilter(self.locationsList(), function(locationItem) {
					var string = locationItem.name.toLowerCase();
					var result = (string.search(filter);
					locationItem.visible(result);
					return result;
				});

			self.locationsList().forEach(function(locationItem) {
					locationItem.visible(true);

			});
			return self.locationsList();
		}
	}, self);
}

ko.applyBindings(new myViewModel());
