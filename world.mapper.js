var WorldMapper = function () { 
 
    var map;
    
    init = function() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });    
    }
    
    findLocation = function() {
        alert('Looking now...' + apiKey);
    }
    
    viewLocation = function() {
        alert('Getting image...');
    }
    
    return {
        init: init,
        findLocation: findLocation,
        viewLocation: viewLocation
    };
}();