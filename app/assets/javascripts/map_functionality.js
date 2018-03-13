var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}

$(document).ready(function(){
    $("button#destination").click(function(){
        $("#trip_d_longitude").val(map.center.lng());
        $("#trip_d_latitude").val(map.center.lat());
    });

    $("button#home").click(function(){
        $("#trip_h_longitude").val(map.center.lng());
        $("#trip_h_latitude").val(map.center.lat());
    });
});