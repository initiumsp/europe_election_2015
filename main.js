var map;
var infoWindows = [];
var layers = [];
var i = 0;
var last_infoWindow = null;

var country_by_order = [
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
    "Denmark",
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
    "Denmark":"middle_left",
};

var wingColorCoding = {
    'far_right'   :'#008',
    'middle_right':'#00F',
    'middle'      :'#0F0',
    'middle_left' :'#F00',
    'far_left'    :'#800',
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
    "Denmark": new google.maps.LatLng(55.68, 12.57),
};

var electionData = [
    {
        "month": 1,
        "country": "Croatia",
        "election_type": "presidential",
        "party_name_eng": "Croatian Democratic Union",
        "party_name_chi": "",
        "political_wing": "middle_right",
        "vote_rate": "50.74%"
    },
    {
        "month": 1,
        "country": "Croatia",
        "election_type": "presidential",
        "party_name_eng": "Social Democratic Party of Croatia (SDP)",
        "party_name_chi": "",
        "political_wing": "middle_left",
        "vote_rate": "49.26%"
    },
    {
        "month": 1,
        "country": "Italy",
        "election_type": "presidential",
        "party_name_eng": "Democratic Party",
        "party_name_chi": "",
        "political_wing": "middle_left",
        "vote_rate": "65.91%"
    },
    {
        "month": 1,
        "country": "Italy",
        "election_type": "presidential",
        "party_name_eng": "Five Star Movement",
        "party_name_chi": "",
        "political_wing": "",
        "vote_rate": "TBD"
    },
    {
        "month": 2,
        "country": "Greece",
        "election_type": "parlimentary",
        "party_name_eng": "SYRIZA",
        "party_name_chi": "",
        "political_wing": "far_left",
        "vote_rate": "36.30%"
    },
    {
        "month": 2,
        "country": "Greece",
        "election_type": "parlimentary",
        "party_name_eng": "New Democracy",
        "party_name_chi": "",
        "political_wing": "middle_right",
        "vote_rate": "27.80%"
    },
    {
        "month": 2,
        "country": "Greece",
        "election_type": "parlimentary",
        "party_name_eng": "Golden Dawn",
        "party_name_chi": "",
        "political_wing": "far_right",
        "vote_rate": "6.30%"
    },
    {
        "month": 2,
        "country": "Greece",
        "election_type": "parlimentary",
        "party_name_eng": "The River",
        "party_name_chi": "",
        "political_wing": "middle_left",
        "vote_rate": "6.10%"
    },
    {
        "month": 3,
        "country": "Estonia",
        "election_type": "parlimentary",
        "party_name_eng": "Estonian Reform Party",
        "party_name_chi": "",
        "political_wing": "middle_right",
        "vote_rate": "27.70%"
    },
    {
        "month": 3,
        "country": "Estonia",
        "election_type": "parlimentary",
        "party_name_eng": "Estonian Centre Party",
        "party_name_chi": "",
        "political_wing": "middle_right",
        "vote_rate": "24.80%"
    },
    {
        "month": 3,
        "country": "Estonia",
        "election_type": "parlimentary",
        "party_name_eng": "Social Democratic Party",
        "party_name_chi": "",
        "political_wing": "middle_left",
        "vote_rate": "15.20%"
    },
    {
        "month": 3,
        "country": "Estonia",
        "election_type": "parlimentary",
        "party_name_eng": "Pro Patria and Res Publica Union",
        "party_name_chi": "",
        "political_wing": "middle_right",
        "vote_rate": "13.70%"
    },
    {
        "month": 3,
        "country": "France",
        "election_type": "local",
        "party_name_eng": "Union for a Popular Movement (UMP)",
        "party_name_chi": "",
        "political_wing": "middle_right",
        "vote_rate": "29.00%"
    },
    {
        "month": 3,
        "country": "France",
        "election_type": "local",
        "party_name_eng": "National Front",
        "party_name_chi": "",
        "political_wing": "far_right",
        "vote_rate": "25.00%"
    },
    {
        "month": 3,
        "country": "France",
        "election_type": "local",
        "party_name_eng": "Socialist Party",
        "party_name_chi": "",
        "political_wing": "middle_left",
        "vote_rate": "13.30%"
    },
    {
        "month": 4,
        "country": "Finland",
        "election_type": "parlimentary",
        "party_name_eng": "Centre Party",
        "party_name_chi": "",
        "political_wing": "middle",
        "vote_rate": "21.10%"
    },
    {
        "month": 4,
        "country": "Finland",
        "election_type": "parlimentary",
        "party_name_eng": "Finns Party",
        "party_name_chi": "",
        "political_wing": "far_right",
        "vote_rate": "17.70%"
    },
    {
        "month": 4,
        "country": "Finland",
        "election_type": "parlimentary",
        "party_name_eng": "National Coalition",
        "party_name_chi": "",
        "political_wing": "middle_right",
        "vote_rate": "18.20%"
    },
    {
        "month": 4,
        "country": "Finland",
        "election_type": "parlimentary",
        "party_name_eng": "Social Democratic Party",
        "party_name_chi": "",
        "political_wing": "middle_left",
        "vote_rate": "16.50%"
    },
    {
        "month": 4,
        "country": "Andorra",
        "election_type": "parlimentary",
        "party_name_eng": "Democrats for Andorra",
        "party_name_chi": "",
        "political_wing": "middle_right",
        "vote_rate": "37.03%"
    },
    {
        "month": 4,
        "country": "Andorra",
        "election_type": "parlimentary",
        "party_name_eng": "Liberal Party of Andorra",
        "party_name_chi": "",
        "political_wing": "middle_right",
        "vote_rate": "27.68%"
    },
    {
        "month": 4,
        "country": "Andorra",
        "election_type": "parlimentary",
        "party_name_eng": "Social Democratic, Green, Citizens' Initiative and independent candidates",
        "party_name_chi": "",
        "political_wing": "middle_left",
        "vote_rate": "23.53%"
    },
    {
        "month": 5,
        "country": "UK",
        "election_type": "parlimentary",
        "party_name_eng": "Conservtive",
        "party_name_chi": "",
        "political_wing": "middle_right",
        "vote_rate": "36.90%"
    },
    {
        "month": 5,
        "country": "UK",
        "election_type": "parlimentary",
        "party_name_eng": "Labour",
        "party_name_chi": "",
        "political_wing": "middle_left",
        "vote_rate": "30.40%"
    },
    {
        "month": 5,
        "country": "UK",
        "election_type": "parlimentary",
        "party_name_eng": "UKIP",
        "party_name_chi": "",
        "political_wing": "far_right",
        "vote_rate": "12.60%"
    },
    {
        "month": 5,
        "country": "UK",
        "election_type": "parlimentary",
        "party_name_eng": "Liberal Democrats",
        "party_name_chi": "",
        "political_wing": "middle",
        "vote_rate": "7.90%"
    },
    {
        "month": 5,
        "country": "UK",
        "election_type": "parlimentary",
        "party_name_eng": "SNP",
        "party_name_chi": "",
        "political_wing": "middle_left",
        "vote_rate": "4.70%"
    },
    {
        "month": 5,
        "country": "Poland",
        "election_type": "presidential",
        "party_name_eng": "Law and Justice (PiS)",
        "party_name_chi": "",
        "political_wing": "middle_right",
        "vote_rate": "51.55%"
    },
    {
        "month": 5,
        "country": "Poland",
        "election_type": "presidential",
        "party_name_eng": "Civic Platform",
        "party_name_chi": "",
        "political_wing": "middle_right",
        "vote_rate": "48.45%"
    },
    {
        "month": 5,
        "country": "Spain",
        "election_type": "local",
        "party_name_eng": "People's Party",
        "party_name_chi": "",
        "political_wing": "middle_right",
        "vote_rate": "29.20%"
    },
    {
        "month": 5,
        "country": "Spain",
        "election_type": "local",
        "party_name_eng": "Spanish Socialist Workers' Party (PSOE)",
        "party_name_chi": "",
        "political_wing": "middle_left",
        "vote_rate": "24.10%"
    },
    {
        "month": 5,
        "country": "Spain",
        "election_type": "local",
        "party_name_eng": "Podemos",
        "party_name_chi": "",
        "political_wing": "far_left",
        "vote_rate": "13.50%"
    },
    {
        "month": 6,
        "country": "Turkey",
        "election_type": "parlimentary",
        "party_name_eng": "Justice and Development Party",
        "party_name_chi": "",
        "political_wing": "middle_right",
        "vote_rate": "40.87%"
    },
    {
        "month": 6,
        "country": "Turkey",
        "election_type": "parlimentary",
        "party_name_eng": "Republican People's Party",
        "party_name_chi": "",
        "political_wing": "middle_left",
        "vote_rate": "24.95%"
    },
    {
        "month": 6,
        "country": "Turkey",
        "election_type": "parlimentary",
        "party_name_eng": "Nationalist Movement Party",
        "party_name_chi": "",
        "political_wing": "far_right",
        "vote_rate": "16.29%"
    },
    {
        "month": 6,
        "country": "Turkey",
        "election_type": "parlimentary",
        "party_name_eng": "Peoples' Democratic Party",
        "party_name_chi": "",
        "political_wing": "middle_left",
        "vote_rate": "13.12%"
    },
    {
        "month": 6,
        "country": "Denmark",
        "election_type": "parlimentary",
        "party_name_eng": "Social Democrats",
        "party_name_chi": "",
        "political_wing": "middle_left",
        "vote_rate": "26.30%"
    },
    {
        "month": 6,
        "country": "Denmark",
        "election_type": "parlimentary",
        "party_name_eng": "Danish People's Party",
        "party_name_chi": "",
        "political_wing": "far_right",
        "vote_rate": "21.10%"
    },
    {
        "month": 6,
        "country": "Denmark",
        "election_type": "parlimentary",
        "party_name_eng": "Venstre",
        "party_name_chi": "",
        "political_wing": "middle_right",
        "vote_rate": "19.50%"
    },
    {
        "month": 6,
        "country": "Denmark",
        "election_type": "parlimentary",
        "party_name_eng": "Red–Green Alliance",
        "party_name_chi": "",
        "political_wing": "far_left",
        "vote_rate": "7.80%"
    }
];

function get_infoWindow_string (country) {
    'use strict';
    var result = '';

    //Add title
    result += '<h1 style="font-size=24px">'+country+'</h1>';

    //Add parties and their vote rates
    for (var x=0;x<electionData.length;x++) {
        var record = electionData[x];
        if (record["country"] === country) {
            var color = wingColorCoding[record["political_wing"]];
            result += '<p style="font-weight: bold; font-size: 18px; text-align: right;">';
            result += '<span style="color:'+ color + '";>' + record["party_name_eng"] + '&nbsp;&nbsp;</span>';

            var vote_rate = record["vote_rate"];
            if (parseInt(vote_rate) >= 10.0) {
                result += record["vote_rate"];
            } else {
                // Insert a space to align colons;
                result += "<span style='color:white'>&nbsp;</span>"+record["vote_rate"];
            }
            result += '</p>';
            console.log(result);
        }
    }
    return result;
}

function show_infoWindow (country) {
    'use strict';
    return function () {
        if (last_infoWindow !== null) {
            last_infoWindow.close();
        }
        for (var rank = 0; rank < country_by_order.length; rank++) {
            if (country_by_order[rank] === country) {
                break;
            }
        }
        infoWindows[rank].open(map, layers[rank]);
        last_infoWindow = infoWindows[rank];
    }
}

function initialize() {
    // Create a simple map.
    'use strict';
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 5,
        center: {lat: 50, lng: 15}
    });

    //Add legend
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
        document.getElementById('legend'));

    for (i=0;i<country_by_order.length;i++) {
        var country = country_by_order[i];
        var wing = baseColorData[country];
        var color = wingColorCoding[wing];

        layers[i] = new google.maps.Data();
        layers[i].loadGeoJson('./json/'+country+'.json');
        layers[i].setStyle({
            strokeColor: color,
            fillColor: color,
        });

        var contentString = get_infoWindow_string(country);
        var infoWindowPosition = capitalCoordinate[country];
        infoWindows[i] = new google.maps.InfoWindow({
            content: contentString,
            position: infoWindowPosition,
        });

        google.maps.event.addListener(layers[i], 'click', show_infoWindow(country));

        layers[i].setMap(map);
    }
}
google.maps.event.addDomListener(window, 'load', initialize);
