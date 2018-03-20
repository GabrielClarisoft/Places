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

    $('#password').keyup(function() {
        $('#password_str').html(checkStrength($('#password').val()))
    })
    function checkStrength(password) {
        var strength = 0
        if (password.length < 6) {
            $('#password_str').removeClass()
            $('#password_str').addClass('short')
            return 'Weak'
        }
        if (password.length > 7) strength += 1
// If password contains both lower and uppercase characters, increase strength value.
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1
// If it has numbers and characters, increase strength value.
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1
// If it has one special character, increase strength value.
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
// If it has two special characters, increase strength value.
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
// Calculated strength value, we can return messages
// If value is less than 2
        if (strength < 2) {
            $('#password_str').removeClass()
            $('#password_str').addClass('weak')
            return 'Weak'
        } else if (strength == 2) {
            $('#password_str').removeClass()
            $('#password_str').addClass('good')
            return 'Good'
        } else {
            $('#password_str').removeClass()
            $('#password_str').addClass('strong')
            return 'Strong'
        }
    }
});

/*TODO:
* -Make map to load before refresh
* */