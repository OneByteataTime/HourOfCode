var WorldMapper = function () { 
 
    var map;
    var geocoder;
    
    init = function() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.319776, lng: -81.626790},
          zoom: 10
        }); 
        
        geocoder = new google.maps.Geocoder();
    }
    
    findLocation = function() {
        var address = document.getElementById('address').value;
        codeAddress(address);
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
    
    function codeAddress(address) {
        
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') { 
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
    return {
        init: init,
        findLocation: findLocation,
        viewLocation: viewLocation
    };
}();