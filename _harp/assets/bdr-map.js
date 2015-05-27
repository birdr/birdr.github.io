$(document).ready(function() {
    map = new L.Map('map');
    map.setView(new L.LatLng(40.7127, -74.0059), 4);
    map.addLayer(new L.TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        minZoom: 4,
        maxZoom: 19,
        attribution: "Map data © <a href=\"https://openstreetmap.org\">OpenStreetMap</a> contributors"})
        );
    var markers = [];
    $.getJSON("https://birdr-zaaach.rhcloud.com/unAuFeed.php", function(data) {
        if (data.status == 200) {
            for (var i = 0; i < data.posts.length; i++) {
                var post = data.posts[i];
                markers.push(L.marker([post.lat, post.lng]).addTo(map).on("click", markerClicked));
            }
        }
        function markerClicked(event) {
            var post = data.posts[markers.indexOf(event.target)];
            $("#post").html(function() {
                var html = "<p class='username'>@" + post.author_username.toUpperCase() + "</p>";
                html += "<p class='body'>" + post.body + "</p>";
                html += "<p class='time'><span class='timeago' title='" + formatedDateFrom(post.timestamp) + "'></span></p>";
                return html;
            });
            $(".timeago").timeago();
        }
        function formatedDateFrom(time) {
            var date = new Date(time*1000);
            return date.toISOString();
        }
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 13, {
                animation: true
            });
        });
    }
});
