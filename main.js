/*global google, electionData */

var map;
var infoWindows = [];
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

var countryList = [
    "Croatia",
    "Italy"  ,
    "Greece" ,
    "Estonia",
    "France" ,
    "Finland",
    "Andorra",
    "UK"     ,
    "Poland" ,
    "Spain"  ,
    "Turkey" ,
    "Denmark"
];

var baseColorData = {
    "Croatia":"middle_right",
    "Italy"  :"middle_left",
    "Greece" :"far_left",
    "Estonia":"middle_right",
    "France" :"middle_right",
    "Finland":"middle",
    "Andorra":"middle_right",
    "UK"     :"middle_right",
    "Poland" :"middle_right",
    "Spain"  :"middle_right",
    "Turkey" :"middle_right",
    "Denmark":"middle_left"
};

var wingColorCoding = {
    'far_right'   :'#008',
    'middle_right':'#00F',
    'middle'      :'#060',
    'middle_left' :'#F00',
    'far_left'    :'#800'
};

var capitalCoordinate = {
    "Croatia": new google.maps.LatLng(45.81, 15.98),
    "Italy"  : new google.maps.LatLng(41.90, 12.50),
    "Greece" : new google.maps.LatLng(37.96, 23.72),
    "Estonia": new google.maps.LatLng(59.44, 24.75),
    "France" : new google.maps.LatLng(48.86,  2.35),
    "Finland": new google.maps.LatLng(60.17, 24.94),
    "Andorra": new google.maps.LatLng(42.50,  1.52),
    "UK"     : new google.maps.LatLng(51.51, -0.12),
    "Poland" : new google.maps.LatLng(52.23, 21.02),
    "Spain"  : new google.maps.LatLng(40.40, -3.72),
    "Turkey" : new google.maps.LatLng(41.01, 28.98),
    "Denmark": new google.maps.LatLng(55.68, 12.57)
};



function _getInfoWindowString (country) {
    'use strict';
    var result = '';

    //Add title
    result += '<h1 style="font-size=24px">'+country+'</h1>';

    //Add parties and their vote rates
    for (var x=0;x<electionData.length;x++) {
        var record = electionData[x];
        if (record.country === country) {
            var color = wingColorCoding[record.political_wing];
            result += '<p style="font-weight: bold; font-size: 18px; text-align: right;">';
            result += '<span style="color:'+ color + '";>' + record.party_name_eng + '&nbsp;&nbsp;</span>';

            var vote_rate = record.vote_rate;
            if (parseInt(vote_rate) >= 10.0) {
                result += record.vote_rate;
            } else {
                // Insert a space to align colons;
                result += "<span style='color:white'>&nbsp;</span>"+record.vote_rate;
            }
            result += '</p>';
        }
    }
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

function styleMap(data, targetMap) {
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
        var contentString = _getInfoWindowString(entry.area);
        var infoWindowPosition = new google.maps.LatLng(entry.infoWindowAnchor[0],
                                                        entry.infoWindowAnchor[1]);
        entry.infoWindow = new google.maps.InfoWindow({
            content: contentString,
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

function initialize() {
    'use strict';
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: initial_zoom,
        center: {lat: initial_lat,
                 lng: initial_lng},
        mapTypeId: google.maps.MapTypeId.HYBRID
    });

    drawBoundary(electionData, map);
    styleMap(electionData, map);
    setInfoWindow(electionData, map);

}
google.maps.event.addDomListener(window, 'load', initialize);
