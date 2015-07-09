/*global google, electionData */

var map;
var i = 0;
var lastInfoWindow = null;

var initial_zoom = 5;
var initial_lat = 50;
var initial_lng = 15;

if (window.innerWidth < 1024) {
    initial_zoom = 4;
    initial_lat = 50;
    initial_lng = 15;
}

function _getInfoWindowString (area) {
    'use strict';
    var result = '';

    //Add title
    result += '<h1 style="font-size=24px">'+area+'</h1>';

    //Add real infoWindow content
    return result;
}

function drawBoundary(data, targetMap) {
    'use strict';
    for (i=0;i<data.length;i++) {
        var entry = data[i];
        entry.mapLayer = new google.maps.Data();
        entry.mapLayer.loadGeoJson(entry.boundaryGeojsonPath);
        entry.mapLayer.setMap(targetMap);
    }
}

function styleLayers(data) {
    'use strict';
    // Fill in the real style settings
    for (i=0;i<data.length;i++) {
        var entry = data[i];
        entry.mapLayer.setStyle({
            strokeColor: 'black',
            fillColor: 'black'
        });
    }
}

function setInfoWindow(data, targetMap) {
    'use strict';
    for (i=0;i<data.length;i++) {
        var entry = data[i];
        var infoWindowPosition = new google.maps.LatLng(entry.infoWindowAnchor[0],
                                                        entry.infoWindowAnchor[1]);
        entry.infoWindow = new google.maps.InfoWindow({
            position: infoWindowPosition
        });

        google.maps.event.addListener(entry.mapLayer, 'click', function(entry){
            return function() {
                if (lastInfoWindow !== null) {
                    lastInfoWindow.close();
                }
                entry.infoWindow.open(targetMap, entry.mapLayer);
                lastInfoWindow = entry.infoWindow;
            };
        }(entry));
    }
}

function styleInfoWindows(data) {
    'use strict';
    for (i=0;i<data.length;i++) {
        var entry = data[i];
        entry.infoWindow.setContent(_getInfoWindowString(entry.area));
    }
}

function initialize() {
    'use strict';
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: initial_zoom,
        center: {lat: initial_lat,
                 lng: initial_lng},
        mapTypeId: google.maps.MapTypeId.HYBRID
    });

    drawBoundary(electionData, map);
    styleLayers(electionData);
    setInfoWindow(electionData, map);
    styleInfoWindows(electionData);
}

google.maps.event.addDomListener(window, 'load', initialize);
