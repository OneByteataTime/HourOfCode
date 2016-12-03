var WorldMapper = function () { 
 
    var map;
    
    init = function() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.319776, lng: -81.626790},
          zoom: 12
        });    
    }
    
    findLocation = function() {
        var address = document.getElementById('address').value;
        alert('Attempting to find ' + address);
        codeAddress(address);
    }
    
    viewLocation = function() {
        alert('Getting image...');
    }
    
    function codeAddress(address) {
        
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') 
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