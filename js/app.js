var appViewModel;
// array of locations
var loc1 = [{
    title: "Carmine's Italian Restaurant",
    name: 'Aangan',
    address: '2701 Broadway, New York, NY 10025',
    location: {
        lat: 40.799369,
        lng: -73.968775
        }
    },
    {
    title: "Malecon Restaurant II",
    name: 'Bar Boulud',
    address: '1900 Broadway, New York, NY 10023',
    location: {
        lat: 40.77172,
        lng: -73.981684
        }
    },
    {
    title: "Gabriela's Restaurant & Tequila Bar",
    name: 'Big Daddy',
    address: '2454 Broadway, New York, NY 10024',
    location: {
        lat: 40.791246,
        lng: -73.973842
        }
    },
    {
    title: "Tom's Restaurant",
    name: 'Candle Cafe West',
    address: '2427 Broadway, New York, NY 10024',
    location: {
        lat: 40.790505,
        lng: -73.975161
        }
    },    
    {
    title: "Junior's Restaurant & Bakery",
    name: 'City Diner',
    address: '2441 Broadway, New York, NY 10024',
    location: {
        lat: 40.790505,
        lng: -73.975161
        }
    },    
    {
    title: "Fred's Restaurant",
    name: 'Chipotle Mexican Grill',
    address: '2298 Broadway, New York, NY 10024',
    location: {
        lat: 40.786191,
        lng: -73.977863
        }
    },    
    {
    title: "Kouzan Japanese Restaurant",
    name: 'Cibo & Vino',
    address: '2418 Broadway, New York, NY 10024',
    location: {
        lat: 40.79001,
        lng: -73.974851
        }
    },    
    {
    title: "Gennaro Restaurant",
    name: 'Carmine Italian Restaurant',
    address: '2450 Broadway, New York, NY 10024',
    location: {
        lat: 40.791096,
        lng: -73.973991
        }
    },    
    {
    title: "Carmine’s Italian Restaurant",
    name: 'Hnery\s',
    address: '2745 Broadway, New York, NY 10025',
        location: {
            lat: 40.800825,
            lng: -73.968245
        }
    },   
    {
    title: "The View Restaurant & Lounge",
    name: 'Serafina Uppwer West Side',
    address: '2178 Broadway, New York, NY 10024',
    location: {
        lat: 40.782219,
        lng: -73.98059
        }
    },    
    {
    title: "Acosta Deli - Restaurant",
    name: 'Sugar Factory',
    address: '991 Broadway, New York, NY 10023',
    location: {
        lat: 40.775252,
        lng: -73.982592
        }
    },    
    {
    title: "Waverly Restaurant",
    name: 'Metro Diner',
    address: '2641 Broadway #1, New York, NY 10025',
    location: {
        lat: 40.797438,
        lng: -73.970146
    }
    },    
    {
    title: "El Ranchito Restaurant",
    name: 'La Caridad',
    address: '2199 Broadway, New York, NY 10024',
    location: {
        lat: 40.783204,
        lng: -73.980799
        }
    },    
    {
    title: "Junior's Restaurant",
    name: 'Le Monde',
    address: '2885 Broadway, New York, NY 10025',
    location: {
        lat: 40.783204,
        lng: -73.980799
        }
    },    
    {
    title: "3 Guys Restaurant",
    name: 'Le Piff NYC',
    address: '2058 Broadway, New York, NY 10023',
    location: {
        lat: 40.777528,
        lng: -73.981723
        }
    },    
    {
    title: "L'ybane Restaurant",
    name: 'Luce',
    address: '2014 Broadway, New York, NY 10023',
    location: {
        lat: 40.775902,
        lng: -73.981849
        }
    },    
    {
    title: "Westside Restaurant",
    name: 'The Mermaid Inn',
    address: '570 Amsterdam Ave, New York, NY 10024',
    location: {
        lat: 40.788766,
        lng: -73.974454
        }
    },    
    {
    title: "Sylvia's Restaurant",
    name: 'French Roast',
    address: '2340 Broadway #85, New York, NY 10024',
    location: {
        lat: 40.787632,
        lng: -73.976769
        }
    },    
    {
    title: "Connolly's Pub & Restaurant",
    name: '5 Napkin Burger',
    address: '2315 Broadway, New York, NY 10024',
    location: {
        lat: 40.787076,
        lng: -73.978092
        }
    },    
    {
    title: "Demarchelier Restaurant",
    name: 'Regional',
    address: ' 2607 Broadway, New York, NY 10025',
    location: {
        lat: 40.796368,
        lng: -73.970983
        }
    }   
];


// create a map variable that will be used in initMap()
var map;

// create array for listing markers in map
var markers = [];

// initialize map
function initMap() {
    // intial map view when loaded
    var NYC = {
        lat: 40.795011,
        lng: -73.975368
    };
    // create a map object and get map from DOM for display
    map = new google.maps.Map(document.getElementById("map"), {
        center: NYC,
        zoom: 14
    });
    // attach a click event listener to the marker objects and open an info window on click
    // creates infowindow for each place pin
    var infoWindow = new google.maps.InfoWindow();

    // iterates through all locations and drop pins on every single location
    for (j = 0; j < loc1.length; j++) {
        (function() {
            // store title and location iteration in variables
            var title = loc1[j].title;
            var location = loc1[j].location;
            var address1 = loc1[j].address;

            // drop marker after looping
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                title: title,
                animation: google.maps.Animation.DROP,
                address: address1
            });
            // pushes all locations into markers array
            markers.push(marker);

            appViewModel.myLocations()[j].marker = marker;

            // Create an onclick event to open an infowindow at each marker.
            marker.addListener('click', function() {
                
                // show info inside infowindow when clicked
                populateInfoWindow(this, infoWindow);
                // displays all data retrieved from foursquare api down below
                infoWindow.setContent(contentString);
            });

            // This function populates the infowindow when the marker is clicked. We'll only allow
            // one infowindow which will open at the marker that is clicked, and populate based
            // on that markers position.
            function populateInfoWindow(marker, infoWindow) {
                // Check to make sure the infowindow is not already opened on this marker.
                
                if (infoWindow.marker != marker) {                    
                    infoWindow.marker = marker;
                    infoWindow.setContent('<div class="title">' + marker.title + '</div>' + marker.contentString);
                    // sets animation to bounce 2 times when marker is clicked
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png'); 
                    setTimeout(function() {
                        marker.setAnimation(null);
                        marker.setIcon('');      
                    }, 2130);
                    infoWindow.open(map, marker);
                    // Make sure the marker property is cleared if the infowindow is closed.
                    infoWindow.addListener('closeclick', function() {   
                        infoWindow.setMarker = null;                        
                    });
                }                  
            } // end of populateInfoWindow

            // foursquare client-id and client-secret
            // var client_id = "FZPMCSEYO134W0XYREE1QGP5TE4OXP2Z4QXCNAATK3MKIME0";
            var client_id = "U3YLKS5ZAVN21DZGDS3D01T50BJV3CYGVY0DJKPSBFUUFIYU";
            // var client_secret = "YGNCPSLBHXFWEFRWR3E3I4JUV3YHMKT0J3I53GDNTAVOUTXM";
            var client_secret = "PAHHUGNSGTLXLP3VNG3YJ44DLXBTVNBCLOH0OOH3VMJ4X5YN";

            // foursquare api url
            var foursquareUrl = "https://api.foursquare.com/v2/venues/search"; // + marker.position.lat() + "," + marker.position.lng();
            // creating variables outside of the for ajax request for faster loading
            var venue, address, category, foursquareId, contentString;

            // ajax request - foursquare api data (https://developer.foursquare.com/docs/)
            $.ajax({
                //	type: 'GET',
                url: foursquareUrl,
                dataType: "json",
                data: {
                    client_id: client_id,
                    client_secret: client_secret,
                    query: marker.title, // gets data from marker.title (array of object)
                    near: "New York",
                    v: 20190119 // version equals date
                },
                success: function(data) {
                    console.log(data);
                    // get venue info
                    venue = data.response.venues[0];
                    // get venue address info
                    address = venue.location.formattedAddress[0];
                    // get venue category info
                    category = venue.categories[0].name;
                    // gets link of place
                    foursquareId = "https://foursquare.com/v/" + venue.id;
                    // populates infowindow with api info
                    contentString = "<div class='name'>" + "Name: " + "<span class='info'>" + title + "</span></div>" +
                        "<div class='category'>" + "Catergory: " + "<span class='info'>" + category + "</span></div>" +
                        "<div class='address'>" + "Location: " + "<span class='info'>" + address1 + "</span></div>" +
                        "<div class='information'>" + "More info: " + "<a href='" + foursquareId + "'>" + "Click here" + "</a></div>";

                    marker.contentString;                      
                },
                error: function() {
                    contentString = "<div class='name'>Data is currently not available. Please try again.</div>";
                }
            });

        })(j);

    } // end of for loop through markers [j]
}

function mapError() {
    alert("Map could not be loaded at this moment. Please try again");
}

// Location Constructor
var Location = function(data) {
    var self = this;
    this.title = data.title;
    this.location = data.location;
    this.show = ko.observable(true);
};

// VIEW MODEL //
var AppViewModel = function() {
    var self = this;
    // define Location observable array () // Observables and Observable Arrays are JS Functions
    this.myLocations = ko.observableArray();
    this.filteredInput = ko.observable('');
    // this.locationsList = ko.observableArray();
    for (i = 0; i < loc1.length; i++) {
        var place = new Location(loc1[i]);
        self.myLocations.push(place);
    }
    // from http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
    this.searchFilter = ko.computed(function() {
        var filter = self.filteredInput().toLowerCase(); // listens to what user types in to the input search bar
        // iterates through myLocations observable array
        for (j = 0; j < self.myLocations().length; j++) {
            // it filters myLocations as user starts typing
            if (self.myLocations()[j].title.toLowerCase().indexOf(filter) > -1) {
                self.myLocations()[j].show(true); // shows locations according to match with user key words
                if (self.myLocations()[j].marker) {
                    self.myLocations()[j].marker.setVisible(true); // shows/filters map markers according to match with user key words
                 }
            } else {                
                self.myLocations()[j].show(false); // hides locations according to match with user key words
               if (self.myLocations()[j].marker) {
                    self.myLocations()[j].marker.setVisible(false); // hides map markers according to match with user key words
                }
            }
        }
    });

    // map marker bounces when location is clicked on list
    // https://developers.google.com/maps/documentation/javascript/events
    this.showLocation = function(locations) {
        google.maps.event.trigger(locations.marker, 'click');
    };
};

// instantiate the ViewModel using the new operator and apply the bindings (aka activate KO)
appViewModel = new AppViewModel();

// activate knockout apply binding
ko.applyBindings(appViewModel);