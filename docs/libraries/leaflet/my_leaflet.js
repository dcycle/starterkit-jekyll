---
---
{% include init.html %}
var mymap = L.map('mapid');
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={{ keys.mapbox }}', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mymap);

var markers = [];
var singlemarkers = L.markerClusterGroup();
{% for location in locations %}
  {% if location.latlon.size == 0%}
    {% comment %}
      No latitude longitude, moving on.
    {% endcomment %}
  {% elsif location.latlon.size == 1%}
    var marker = L.marker([{{ location.latlon[0].lat }}, {{ location.latlon[0].lon }}]);
    markers.push(marker);
    singlemarkers.addLayer(marker);
  {% else %}
    var mypolygon = [];
    {% for latlon in location.latlon %}
      var marker = L.marker([{{ latlon.lat }}, {{ latlon.lon }}]);
      mypolygon.push([{{ latlon.lat }}, {{ latlon.lon }}]);
      markers.push(marker);
    {% endfor %}
    var polygon = L.polygon(mypolygon).addTo(mymap);
  {% endif %}
{% endfor %}

var group = new L.featureGroup(markers);

mymap.addLayer(singlemarkers);

mymap.fitBounds(group.getBounds());
