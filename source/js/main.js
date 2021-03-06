// select DOM items
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const menuBranding = document.querySelector('.menu-branding');
const navItems = document.querySelectorAll('.nav-item');
const home = document.querySelector('main');

// set initial state of menu

let showMenu = false;

menuBtn.addEventListener('click', toogleMenu);

function toogleMenu(){
  if(!showMenu){
    menuBtn.classList.add('close');
    menu.classList.add('show');
    menuNav.classList.add('show');
    menuBranding.classList.add('show');
    navItems.forEach(item => item.classList.add('show'));
    home.classList.add('hide');
    // set menu state
    showMenu = true;
  } else {
    menuBtn.classList.remove('close');
    menu.classList.remove('show');
    menuNav.classList.remove('show');
    menuBranding.classList.remove('show');
    navItems.forEach(item => item.classList.remove('show'));
    home.classList.remove('hide');
    // set menu state
    showMenu = false;
  }
}

var platform = new H.service.Platform({
  'app_id': 'sLqzIh1A33CgWUs1VHjE',
  'app_code': 'XpyO0nrddmXjFhvk8Y6v_A'
});

var targetElement = document.getElementById('mapContainer');

// Get default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate the map:
var map = new H.Map(
  document.getElementById('mapContainer'),
  defaultLayers.terrain.panorama,
  {
  zoom: 10,
  //center: { lat: 50.43, lng: 30.33 }
  });

  var ui = H.ui.UI.createDefault(map, defaultLayers);

// Create the parameters for the geocoding request:
var geocodingParams = {
     searchText: '200 S Mathilda Ave, Sunnyvale, CA'
  };

  // var svgMarkup = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 35.219 35.219" style="enable-background:new 0 0 35.219 35.219;" xml:space="preserve">';


// var svgMarkup = '<svg width="22" height="36" ' +
//   'xmlns="http://www.w3.org/2000/svg">' +
//   '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
//   'height="22" /><text x="12" y="18" font-size="12pt" ' +
//   'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
//   'fill="white">+</text></svg>';

// Create an icon, an object holding the latitude and longitude, and a marker:
 // var icon = new H.map.Icon(svgMarkup),
 var icon = new H.map.Icon('../images/location-pointer.png'),
  coords = {lat: 50.43576, lng: 30.33556},
  marker = new H.map.Marker(coords, {icon: icon});

// Add the marker to the map and center the map at the location of the marker:
map.addObject(marker);
map.setCenter(coords);

// Define a callback function to process the geocoding response:
var onResult = function(result) {
  var locations = result.Response.View[0].Result,
    position,
    marker;
  // Add a marker for each location found
  for (i = 0;  i < locations.length; i++) {
  position = {
    lat: locations[i].Location.DisplayPosition.Latitude,
    lng: locations[i].Location.DisplayPosition.Longitude
  };
  marker = new H.map.Marker(position);
  map.addObject(marker);
  }
};

// Get an instance of the geocoding service:
var geocoder = platform.getGeocodingService();

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
geocoder.geocode(geocodingParams, onResult, function(e) {
  alert(e);
});



