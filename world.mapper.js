var WorldMapper = function () {

    var map;
    var geocoder;
    var myPosition;

    init = function() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.319776, lng: -81.626790},
          zoom: 10,
          streetViewControl: false,
          mapTypeControl: false,
        });

        geocoder = new google.maps.Geocoder();
    }

    getLocationMap = function() {
        var location = document.getElementById('address').value;
        getCoordinates(location);
    }

    viewLocation = function() {
        var address = document.getElementById('address').value;
        geocodeAddress(address);
    }

    function geocodeAddress(address) {
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == 'OK') {
            var position = results[0].geometry.location;

            var myPlace = {lat: position.lat(), lng: position.lng()};
            var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('street-view'),
                {
                  position: myPlace,
                  pov: {heading: 165, pitch: 0},
                  zoom: 1
                });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
        }

    // Convert location into Geo-Coordinates
    function getCoordinates(location) {
      geocoder.geocode( {'address': location}, function(results, status) {
          if (status == 'OK') {
            var position = results[0].geometry.location;
            myPosition = {lat: position.lat(), lng: position.lng()};
            refreshMap();
            addMarker();
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
      });
    }

    function refreshMap() {
        map.setCenter(myPosition);
    }

    function addMarker() {
      var marker = new google.maps.Marker({
          map: map,
          position: myPosition
      });
    }

    return {
        init: init,
        getLocationMap: getLocationMap,
        viewLocation: viewLocation
    };
}();
