var WorldMapper = function () {

    var map;
    var map2;
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

        map2 = new google.maps.Map(document.getElementById('terrain-view'), {
          streetViewControl: false,
          mapTypeControl: false,
          zoom: 14
        });
    }

    getLocationMap = function() {
        var location = document.getElementById('address').value;
        getCoordinates(location);
    }

    getTerrainMap = function() {
        showTerrainMap();
    }

    viewLocation = function() {
        showStreetview();
    }

    toggleMap = function(mapTypeId) {
      map2.setMapTypeId(mapTypeId);
    }

    function showStreetview() {
        var panorama = new google.maps.StreetViewPanorama(
          document.getElementById('street-view'),
          {
            position: map.getCenter(),
            pov: {heading: 165, pitch: 0},
            zoom: 1
          }
        );
        streetviewLoaded();
    }

    function showTerrainMap() {

      map2.setCenter(map.getCenter());
      map2.setOptions({
        streetviewControl: false,
        mapTypeControl: false,
        mapTypeId: 'terrain'
      });

      terrainLoaded();
    }

    // Convert location into Geo-Coordinates
    function getCoordinates(location) {
      geocoder.geocode( {'address': location}, function(results, status) {
          if (status == 'OK') {
            var position = results[0].geometry.location;
            myPosition = {lat: position.lat(), lng: position.lng()};
            refreshMap();
            addMarker();
            mapLoaded();
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
        viewLocation: viewLocation,
        getTerrainMap: getTerrainMap,
        toggleMap: toggleMap
    };
}();
