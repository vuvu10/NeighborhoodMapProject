//This is a declaration of the variables..
var map;
var infowindow;
var my_markers = [];
var my_infoWindows = [];
var marker;
var restaurantData = [];

// This the array of my locations..
var myLocations = [{
        name: 'Aangan',
        address: '2701 Broadway, New York, NY 10025',
        lat: 40.799369,
        long: -73.968775
    }, {
        name: 'Bar Boulud',
        address: '1900 Broadway, New York, NY 10023',
        lat: 40.77172,
        long: -73.981684
    }, {
        name: 'Big Daddy',
        address: '2454 Broadway, New York, NY 10024',
        lat: 40.791246,
        long: -73.973842
    }, {
        name: 'Candle Cafe West',
        address: '2427 Broadway, New York, NY 10024',
        lat: 40.790505,
        long: -73.975161
    }, {
        name: 'City Diner',
        address: '2441 Broadway, New York, NY 10024',
        lat: 40.790505,
        long: -73.975161
    }, {
        name: 'Chipotle Mexican Grill',
        address: '2298 Broadway, New York, NY 10024',
        lat: 40.786191,
        long: -73.977863
    }, {
        name: 'Cibo & Vino',
        address: '2418 Broadway, New York, NY 10024',
        lat: 40.79001,
        long: -73.974851
    }, {
        name: 'Carmine Italian Restaurant',
        address: '2450 Broadway, New York, NY 10024',
        lat: 40.791096,
        long: -73.973991

    }, {
        name: 'Hnery\s',
        address: '2745 Broadway, New York, NY 10025',
        lat: 40.800825,
        long: -73.968245
    }, {
        name: 'Serafina Uppwer West Side',
        address: '2178 Broadway, New York, NY 10024',
        lat: 40.782219,
        long: -73.98059

    }, {
        name: 'Sugar Factory',
        address: '991 Broadway, New York, NY 10023',
        lat: 40.775252,
        long: -73.982592
    }, {
        name: 'Metro Diner',
        address: '2641 Broadway #1, New York, NY 10025',
        lat: 40.797438,
        long: -73.970146
    }, {
        name: 'La Caridad',
        address: '2199 Broadway, New York, NY 10024',
        lat: 40.783204,
        long: -73.980799
    }, {
        name: 'Le Monde',
        address: '2885 Broadway, New York, NY 10025',
        lat: 40.783204,
        long: -73.980799
    }, {
        name: 'Le Piff NYC',
        address: '2058 Broadway, New York, NY 10023',
        lat: 40.777528,
        long: -73.981723
    }, {
        name: 'Luce',
        address: '2014 Broadway, New York, NY 10023',
        lat: 40.775902,
        long: -73.981849
    }, {
        name: 'The Mermaid Inn',
        address: '570 Amsterdam Ave, New York, NY 10024',
        lat: 40.788766,
        long: -73.974454
    }, {
        name: 'French Roast',
        address: '2340 Broadway #85, New York, NY 10024',
        lat: 40.787632,
        long: -73.976769
    }, {
        name: '5 Napkin Burger',
        address: '2315 Broadway, New York, NY 10024',
        lat: 40.787076,
        long: -73.978092
    }, {
        name: 'Regional',
        address: ' 2607 Broadway, New York, NY 10025',
        lat: 40.796368,
        long: -73.970983
    }


];


function loadRestaurantsDataOnMap(){

        restaurantData = fourSquare(40.796368,-73.970983);

}


//loading the map with the creation of this map.
function initMap() {
    //creating & instantiating the map
    var NYC = {
        lat: 40.795011,
        lng: -73.975368
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: NYC,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 12

    });

    var contentString = '<div class="content"><div id="title"><b> + "place.name" + </b></div> + "place.address" + </div> + "self.foursquareURL"';

    var infoWindow = new google.maps.InfoWindow({
        content: contentString
    });







/* Loading restaurant data from Four Square and plotting it on Map */

loadRestaurantsDataOnMap();






};

//getting info from foursquare

function fourSquare(lat,lng) {
                        var places = [];
                        //Forsquare ajax request
                        var foursquareURL = 'https://api.foursquare.com/v2/venues/search?query=restaurant&ll='+lat+','+lng+'&client_id=U3YLKS5ZAVN21DZGDS3D01T50BJV3CYGVY0DJKPSBFUUFIYU&client_secret=PAHHUGNSGTLXLP3VNG3YJ44DLXBTVNBCLOH0OOH3VMJ4X5YN&v=20170101&limit=20';


                        $.ajax({
                                url: foursquareURL,
                                data: {
                                    format: 'json'
                                },
                                datatype: 'jsonp',
                            })
                            .done(function(data) {

                                var venue_data = data.response.venues;
                                console.log(venue_data[0]);

                                //Change : data has loaded now lets plot it on map

                                for (var i = 0; i < venue_data.length;  i++) {
                                    marker = new google.maps.Marker({
                                      position: new google.maps.LatLng(venue_data[i]['location']['lat'], venue_data[i]['location']['lng']),
                                      map: map
                                    });

                                     //Push markers to my_markers to control the visibility later
                                     //We are adding the markers by name so that they are easy to toggle
                                    my_markers[venue_data[i]["name"]] = marker;

                                    //We will also create infowindwos and push it to an array as objects to use later
                                    infoWindowContent = venue_data[i]["name"] + "<br/>" + venue_data[i]["location"]["address"];
                                    my_infoWindows[venue_data[i]["name"]] = createInfoWindow(marker,infoWindowContent);


                                }






                                //After plotting on map lets load the data in the list on the left

                                console.log(venue_data);

                                //We apply the bindings here because we want the data to load first
                                ko.applyBindings (new myViewModel(venue_data));
                                return (venue_data);


                            })
                            .fail(function(jqxhr, textStatus, error) {
                                var err = textStatus + ", " + error;
                                console.log('Failure in the request: ' + err);

                            });
                        };


function createInfoWindow(marker,content){

    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent(content);
    return infowindow;


}

//Knockout to filter places and display list of items
function myViewModel(venue_data) {
                            var self = this;

                            self.searchFilter = ko.observable("");

                            self.locationsList = ko.observableArray(venue_data);



                            this.myLocations = function(location) {
                                google.maps.event.tigger(location.marker, 'click');
                            };

                            this.clickMarker = function(customParam){
                                name = customParam.name;
                                console.log(name);


                                for(var marker_name in my_markers){

                                     markerName = marker_name.toString();
                                     if(markerName === name) {
                                        console.log("Found");

                                          my_infoWindows[marker_name].open(map, my_markers[marker_name] );

                                    } else {


                                         my_infoWindows[marker_name].close();
                                    }
                                }

                            };




                            this.filteredItems = ko.computed(function() {

                                  var filter = self.searchFilter().toLowerCase();

                                    if (!filter) {
                                        console.log("Not found")
                                        self.locationsList().forEach(function(locationItem){

                                            my_markers[locationItem.name].setVisible(true);
                                             my_infoWindows[locationItem.name].close();

                                        })
                                    return self.locationsList();
                                } else {

                                    console.log("Find");
                                    return ko.utils.arrayFilter(self.locationsList(), function(locationItem) {

                                        if (locationItem.name.toLowerCase().indexOf(filter) !== -1) {

                                            my_markers[locationItem.name].setVisible(true);

                                            my_infoWindows[locationItem.name].open(map, my_markers[locationItem.name] );

                                            return locationItem.name;
                                        } else {

                                             my_markers[locationItem.name].setVisible(false);
                                             my_infoWindows[locationItem.name].close();

                                        }
                                    });
                                }

                            }, myViewModel);
};

