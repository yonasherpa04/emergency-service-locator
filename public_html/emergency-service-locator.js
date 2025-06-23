function locateMe() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showMap, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showMap(position) {
    const userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    const map = new google.maps.Map(document.getElementById("map"), {
        center: userLocation,
        zoom: 14
    });

    const userMarker = new google.maps.Marker({
        position: userLocation,
        map: map,
        title: "You are here",
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    });

    const service = new google.maps.places.PlacesService(map);
    const request = {
        location: userLocation,
        radius: '5000',
        type: ['hospital', 'police', 'fire_station']
    };

    service.nearbySearch(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i], map);
            }
        } else {
            alert("Failed to find emergency services.");
        }
    });
}

function createMarker(place, map) {
    new google.maps.Marker({
        map,
        position: place.geometry.location,
        title: place.name
    });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
