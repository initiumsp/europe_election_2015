/*global google */

var map;
var infoWindows = [];
var layers = [];
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



function get_infoWindow_string (country) {
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

function show_infoWindow (country) {
    'use strict';
    return function () {
        if (lastInfoWindow !== null) {
            lastInfoWindow.close();
        }
        for (var rank = 0; rank < countryList.length; rank++) {
            if (countryList[rank] === country) {
                break;
            }
        }
        infoWindows[rank].open(map, layers[rank]);
        lastInfoWindow = infoWindows[rank];
    };
}

function drawBoundary()

function initialize() {
    'use strict';
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: initial_zoom,
        center: {lat: initial_lat,
                 lng: initial_lng}
    });

    //Add legend
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
        document.getElementById('legend'));

    for (i=0;i<countryList.length;i++) {
        var country = countryList[i];
        var wing = baseColorData[country];
        var color = wingColorCoding[wing];

        layers[i] = new google.maps.Data();
        layers[i].loadGeoJson('./json/'+country+'.json');
        layers[i].setStyle({
            strokeColor: color,
            fillColor: color
        });

        var contentString = get_infoWindow_string(country);
        var infoWindowPosition = capitalCoordinate[country];
        infoWindows[i] = new google.maps.InfoWindow({
            content: contentString,
            position: infoWindowPosition
        });

        google.maps.event.addListener(layers[i], 'click', show_infoWindow(country));

        layers[i].setMap(map);
    }
}
google.maps.event.addDomListener(window, 'load', initialize);
