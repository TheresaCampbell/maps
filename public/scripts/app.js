// const knexConfig = require('../../server/knexfile.js')
// const knex = require('knex')(knexConfig.development);

var map;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var marker;
var infowindow;
var messagewindow;
let stagedMarkers = []


function initMap() {
  // console.log('knex', knex)
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 43.6446, lng: -79.3950}
  });
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;

  //click listener to make a new marker
  google.maps.event.addListener(map, "click", function(event) {
    marker = new google.maps.Marker({
      position: event.latLng,
      map: map
    });

    //FETCH lat lng from click
    var markerLat = marker.getPosition().lat();
    var markerLng = marker.getPosition().lng();
    stagedMarkers.push({markerLat, markerLng});
    console.log("staged:", stagedMarkers)
    

    //THIS HAS THE LAT LONG DATA CONSOLE LOGGED, SEND THIS TO THE COLLECTION 
    console.log(markerLat)
    console.log(markerLng)

    geocodeLatLng(geocoder, map, infowindow, markerLat, markerLng);
    
      //click listener on the marker that opens a window info on the marker
    google.maps.event.addListener(marker, "click", function() {
      infowindow.open(map, marker);
    });
    
  });
}

// function loadMarkerPayload(){
  
//   $.ajax({
//     method: 'GET',
//     url: /maps/markers,
//     success: function(markerArray){

//     }
//   })
// }

function submitMarkerPayload(markerArray) {
  $.ajax({
    method: 'POST',
    url: '/maps/markers',
    data: markerArray
  }).done(function(){

  })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
$('button#addMarker').on('click', function() {

})

// When a user creates a maker I want to push an item to the stagedMarkers List

// Then I want to re render the marker list of the right


//Function that populates list items on new_map and display_map pages using content from database.
function appendStagedMarker(location) {
  let listItem = `<li class="list-group-item list-group-item-action">${location}</li>`
  $("#newMapMarkers").append(listItem);

  // Append to the marker list container
}


function sendMarkers(mapID) {
  var payload = {
    markers: stagedMarkersList,
    mapId: "asd"
  }
  var body = JSON.stringify(payload)

  // Send over the body

}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




  //callback
  // geocodeLatLng(geocoder, map, infowindow);
  //TEST
  //   document.getElementById('submit').addEventListener('click', function() {
  //   geocodeLatLng(geocoder, map, infowindow);
  // });


// //saves the marker information
// function saveData() {
//   var name = escape(document.getElementById("name").value);
//   var address = escape(document.getElementByIdtoronto("address").value);
//   var type = document.getElementById("type").value;
//   var latlng = marker.getPosition();
//   var url = "phpsqlinfo_addrow.php?name=" + name + "&address=" + address +
//             "&type=" + type + "&lat=" + latlng.lat() + "&lng=" + latlng.lng();

//   downloadUrl(url, function(data, responseCode) {

//     if (responseCode == 200 && data.length <= 1) {
//       infowindow.close();
//       messagewindow.open(map, marker);
//     }
//   });
// }


//reverse geocoding
function geocodeLatLng(geocoder, map, infowindow, lat, lng) {
  var location = {lat: lat, lng: lng}
  geocoder.geocode({'location': location}, function(results, status) {
    if (status === 'OK') {
      if (results[0]) {
        
        var marker = new google.maps.Marker({
          position: location,
          map: map
        });
        //here is where the info is relayed in formatted address style

        var address = results[0].formatted_address;
        infowindow.setContent(address);
        appendStagedMarker(address)
        console.log(address); 
        //Jquery into the html
        $('#result-address').text(address)

        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}


      // //this is what marker info we should pull from the database, just the lat: latitudeDB and lng:LongitudeDB,
      // //the information of the location will be fetched by reverse geocoding


      // //this initializes the map, the only thing to remember is zoom and centre,
      // //zoom zooms closer to the map the higher the number, 14 is a good num
      // //centre is where the map will be centered
      // function initMap() {
      //   map = new google.maps.Map(
      //     document.getElementById('map'), {
      //       zoom: 14,
      //       center: toronto,
      //   });

      //   //this places the marker on the location that is entered, you can run this multiple times for different places
      // function placeMarker(location) {
      //   marker = new google.maps.Marker({
      //     position: location,
      //     map: map,
      //     title: 'The 6ix',
      //     draggable: true,
      //     animation: google.maps.Animation.DROP,
      //     label: labels[labelIndex++ % labels.length]
      //   });

      // // on click listener pin which shows information of the pin above it
      // marker.addListener('click', function() {
      //   infowindow.open(map, marker);
      // });

      // //lines below is the info for when you press the pin, place this into the database for when the user inputs
      // //information into the new pin

      //   var contentString = '<div id="content">'+
      //   '<div id="siteNotice">'+
      //   '</div>'+
      //   '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      //   '<div id="bodyContent">'+
      //   '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      //   'sandstone rock formation in the southern part of the '+
      //   'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      //   'south west of the nearest large town, Alice Springs; 450&#160;km '+
      //   '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      //   'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      //   'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      //   'Aboriginal people of the area. It has many springs, waterholes, '+
      //   'rock caves and ancient paintings. Uluru is listed as a World '+
      //   'Heritage Site.</p>'+
      //   '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      //   'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      //   '(last visited June 22, 2009).</p>'+
      //   '</div>'+
      //   '</div>';


      //   //this initializes the window when the click listener is activated on the ping, which pulls up content above,
      //   //decide if we need info boxes or not
      //   var infowindow = new google.maps.InfoWindow({
      //     content: contentString
      //   });

      // }

      // function geocodePlaceId(geocoder, map, infowindow) {
      //   var placeId = document.getElementById('place-id').value;
      //   geocoder.geocode({'placeId': placeId}, function(results, status) {
      //     if (status === 'OK') {
      //       if (results[0]) {
      //         map.setZoom(11);
      //         map.setCenter(results[0].geometry.location);
      //         var marker = new google.maps.Marker({
      //           map: map,
      //           position: results[0].geometry.location  <!-- <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBB8Rzd9fg-Ef8JwpUWcyz9jCdXRSqJWCM&callback=initMap"></script> -->

      //         });
      //         infowindow.setContent(results[0].formatted_address);
      //         infowindow.open(map, marker);
      //       } else {
      //         window.alert('No results found');
      //       }
      //     } else {
      //       window.alert('Geocoder failed due to: ' + status);
      //     }
      //   });
      // }

      
      
      // placeMarker(toronto);
      // geocodePlaceId(toronto)
      // }
