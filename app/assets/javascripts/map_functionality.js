var map;
var h_marker;
var d_marker;
var h_flag = false;
var d_flag = false;

function initMap() {
    var lat_lng = {lat: 17.08672, lng: 78.42444};

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    var onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
            origin: h_marker.position,
            destination: d_marker.position,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    if ($('div#map').length) {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: lat_lng,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        });
        directionsDisplay.setMap(map);

        map.addListener('click', function (event) {
            if (h_flag) {
                if (h_marker)
                    h_marker.setMap(null);
                h_addMarker(event.latLng);
                $("#trip_h_longitude").val(h_marker.position.lng());
                $("#trip_h_latitude").val(h_marker.position.lat());

                if (d_marker && h_marker)
                    onChangeHandler();
            }

            if (d_flag) {
                if (d_marker)
                    d_marker.setMap(null);
                d_addMarker(event.latLng);
                $("#trip_d_longitude").val(d_marker.position.lng());
                $("#trip_d_latitude").val(d_marker.position.lat());

                if (d_marker && h_marker)
                    onChangeHandler();
            }

        });

        // Adds a marker at the center of the map.

    }

    if ($('div#trip_map').length) {
        map = new google.maps.Map(document.getElementById('trip_map'), {
            zoom: 7,
            center: lat_lng,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        });
        directionsDisplay.setMap(map);


        if ($('input#h_lat').length && $('input#h_lat').val() !== "" &&
            $('input#h_lng').length && $('input#h_lng').val() !== "" &&
            $('input#d_lat').length && $('input#d_lat').val() !== "" &&
            $('input#d_lng').length && $('input#d_lng').val() !== "") {
            var h_latlng = new google.maps.LatLng($('input#h_lat').val(), $('input#h_lng').val());
            var d_latlng = new google.maps.LatLng($('input#d_lat').val(), $('input#d_lng').val());

            h_marker = new google.maps.Marker({
                position: h_latlng,
                title: 'home'
            });

            d_marker = new google.maps.Marker({
                position: d_latlng,
                title: 'destination'
            });
        }

        if (h_marker)
            h_marker.setMap(map);

        if (d_marker)
            d_marker.setMap(map);

        if (d_marker && h_marker)
            onChangeHandler();

    }


}

// Adds a marker to the map and push to the array.
function d_addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'destination'
    });
    d_marker = marker;
}

function h_addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Home'
    });
    h_marker = marker;
}

var t_data = null;

$(document).ready(function () {
    $(".owl-carousel").owlCarousel();

    $("button#destination").click(function () {
        h_flag = false;
        d_flag = true;
        $("button#home").css("background-color", "#4d90fe");
        $("button#destination").css("background-color", "orange");
    });

    $("button#home").click(function () {
        d_flag = false;
        h_flag = true;
        $("button#destination").css("background-color", "#4d90fe");
        $("button#home").css("background-color", "orange");
    });

    $('#search').keyup(function () {
        $('#result').html("");
        var s_key = $('#search').val();
        if(s_key.length >= 3) {
            var query = '/users/' + s_key;
            $.ajax({
                url: query
            }).done(function (data) {
                t_data = data;
                $.each(data, function (key, value) {
                    var li = '<li><a class="result" href="/user/' + value.username + '"><div class="result_user">'+ value.name + '</div></a></li>';
                    $('#result').append(li);
                })
            })
        }
    })
});

/*TODO:
* -Make map to load before refresh
* */