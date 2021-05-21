---
---
{% include init.html %}

var myMap = {
  /**
   * Add a location.
   *
   * @param location a location which must contain a latlon property which
   *   itself is a collection of objects, each having lat and lon, and
   *   potentially "new" which can be bool. This is the case for polygons
   *   with discontiguous areas such as Alaska is to the United States.
   */
  addLocation: function(location) {
    if (location.latlon.length <= 0) {
      // No location to show, moving on.
    }
    else if (location.latlon.length == 1) {
      // This location is a single latitude and longitude on the map, show a
      // marker.
      this.addSingleMarker(location.latlon[0]);
    }
    else {
      this.addPolygonGroup(location.latlon);
    }
  },
  /**
   * Add a polygon which might be discontiguous (such as USA and Alaska).
   *
   * @param latlons array of objects, which each have lat, lon, and can have
   *   new (meaning we are starting a discontiguous area).
   */
  addPolygonGroup: function(latlons) {
    var mypolygons = this.addPolygonGroupRecursive(latlons);

    var i;
    var polygon;
    for (i = 0; i < mypolygons.length; i++) {
      polygon = mypolygons[i];
      L.polygon(polygon).addTo(this.mymap);
    }
  },
  /**
   * Add a polygon which might be discontiguous (such as USA and Alaska).
   *
   * @param latlons array of objects, which each have lat, lon, and can have
   *   new (meaning we are starting a discontiguous area).
   * @param polygons array of existing polygons to add a polygon.
   *
   * @return array of polygons.
   */
  addPolygonGroupRecursive(latlons, polygons = []) {
    var mypolygon = [];

    var latlon;
    while (latlon = latlons.shift()) {
      if (latlon.new == true) {
        polygons.push(mypolygon)
        return addPolygonGroupRecursive(latlons, polygons);
      }
      var marker = L.marker([latlon.lat, latlon.lon]);
      mypolygon.push([latlon.lat, latlon.lon]);
      this.markers.push(marker);
    }

    polygons.push(mypolygon);
    return polygons;
  },
  /**
   * Add a marker.
   *
   * @param location a location which must contain a latlon property which
   *   itself is a collection of objects, each having lat and lon, and
   *   potentially "new" which can be bool. This is the case for polygons
   *   with discontiguous areas such as Alaska is to the United States.
   */
  addSingleMarker: function(latlon) {
    // This location is a single latitude and longitude, so create a marker.
    var marker = L.marker([latlon.lat, latlon.lon]);
    this.markers.push(marker);
    this.singlemarkers.addLayer(marker);
  },
  /**
   * Display the map.
   */
  display: function() {
    var group = new L.featureGroup(this.markers);
    this.mymap.addLayer(this.singlemarkers);
    this.mymap.fitBounds(group.getBounds());
  },
  /**
   * Initialize some parameters.
   */
  init: function() {
    this.mymap = L.map('mapid');
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={{ keys.mapbox }}', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(this.mymap);
    this.markers = [];
    this.singlemarkers = L.markerClusterGroup();
  }
};

myMap.init();

{% for location in locations %}
  myMap.addLocation({{ location | jsonify }});
{% endfor %}

myMap.display();
