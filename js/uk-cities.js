// Get the good stuff outta a wikitable:
// $('.wikitable').find('td:first-child > a:first-child').map(function(index, element){ return $(this).text()})
// "St David's" ---> killed
// Brighton & Hove --> Brighton
// "City of Westminster" killed
// "City of London"--> London


var app = app || {};
app.uk = {
  
  getCityNames: function(){ return Object.keys( app.uk.cities )},
  
  cities: {
    "Bath": {
        "lat": 51.3794,
        "lng": -2.3656
    },
    "Birmingham": {
        "lat": 52.4667,
        "lng": -1.9167
    },
    "Bradford": {
        "lat": 53.65229,
        "lng": -1.90761
    },
    "Brighton": {
        "lat": 50.525,
        "lng": -2.5515
    },
    "Bristol": {
        "lat": 51.45,
        "lng": -2.5833
    },
    "Cambridge": {
        "lat": 51.96665,
        "lng": -1.125
    },
    "Canterbury": {
        "lat": 54.41615,
        "lng": -0.7132
    },
    "Carlisle": {
        "lat": 54.8833,
        "lng": -2.9333
    },
    "Chelmsford": {
        "lat": 51.7333,
        "lng": 0.4833
    },
    "Chester": {
        "lat": 53.2,
        "lng": -2.9167
    },
    "Chichester": {
        "lat": 50.8367,
        "lng": -0.78
    },
    "Coventry": {
        "lat": 52.4167,
        "lng": -1.55
    },
    "Derby": {
        "lat": 52.9333,
        "lng": -1.5
    },
    "Durham": {
        "lat": 54.7667,
        "lng": -1.5667
    },
    "Ely": {
        "lat": 51.9425,
        "lng": -1.4826
    },
    "Exeter": {
        "lat": 50.7236,
        "lng": -3.5275
    },
    "Gloucester": {
        "lat": 51.8333,
        "lng": -2.25
    },
    "Hereford": {
        "lat": 52.05,
        "lng": -2.7167
    },
    "Kingston upon Hull": {
        "lat": 53.7404,
        "lng": -0.3262
    },
    "Lancaster": {
        "lat": 54.0475,
        "lng": -2.8003
    },
    "Leeds": {
        "lat": 53.42835714,
        "lng": -1.243214286
    },
    "Leicester": {
        "lat": 52.6333,
        "lng": -1.1333
    },
    "Lichfield": {
        "lat": 52.6833,
        "lng": -1.8167
    },
    "Lincoln": {
        "lat": 53.2333,
        "lng": -0.5333
    },
    "Liverpool": {
        "lat": 53.4167,
        "lng": -3
    },
    "London": {
        "lat": 51.5084,
        "lng": -0.1255
    },
    "Manchester": {
        "lat": 53.4809,
        "lng": -2.2374
    },
    "Newcastle upon Tyne": {
        "lat": 54.9881,
        "lng": -1.6194
    },
    "Norwich": {
        "lat": 52.6333,
        "lng": 1.3
    },
    "Nottingham": {
        "lat": 52.9667,
        "lng": -1.1667
    },
    "Oxford": {
        "lat": 51.7522,
        "lng": -1.256
    },
    "Peterborough": {
        "lat": 52.5833,
        "lng": -0.25
    },
    "Plymouth": {
        "lat": 50.37,
        "lng": -4.14
    },
    "Portsmouth": {
        "lat": 50.8091,
        "lng": -1.0714
    },
    "Preston": {
        "lat": 52.69015294,
        "lng": -1.086294118
    },
    "Ripon": {
        "lat": 54.1167,
        "lng": -1.5167
    },
    "Salford": {
        "lat": 52.3033,
        "lng": -1.14998
    },
    "Salisbury": {
        "lat": 51.0693,
        "lng": -1.7957
    },
    "Sheffield": {
        "lat": 53.383,
        "lng": -1.4659
    },
    "Southampton": {
        "lat": 50.9,
        "lng": -1.4
    },
    "St Albans": {
        "lat": 51.75,
        "lng": -0.3333
    },
    "Stoke-on-Trent": {
        "lat": 53,
        "lng": -2.1833
    },
    "Sunderland": {
        "lat": 54.8023,
        "lng": -2.32445
    },
    "Truro": {
        "lat": 50.2617,
        "lng": -5.0433
    },
    "Wakefield": {
        "lat": 53.6833,
        "lng": -1.4977
    },
    "Wells": {
        "lat": 51.2094,
        "lng": -2.6494
    },
    "Winchester": {
        "lat": 51.0167,
        "lng": -1.3167
    },
    "Wolverhampton": {
        "lat": 52.5833,
        "lng": -2.1333
    },
    "Worcester": {
        "lat": 52.2,
        "lng": -2.2
    },
    "York": {
        "lat": 53.9667,
        "lng": -1.0833
    },
    "Aberdeen": {
        "lat": 57.1333,
        "lng": -2.1
    },
    "Dundee": {
        "lat": 56.5,
        "lng": -2.9667
    },
    "Edinburgh": {
        "lat": 55.95,
        "lng": -3.2
    },
    "Glasgow": {
        "lat": 55.8333,
        "lng": -4.25
    },
    "Inverness": {
        "lat": 57.4667,
        "lng": -4.2333
    },
    "Perth": {
        "lat": 56.4,
        "lng": -3.4333
    },
    "Stirling": {
        "lat": 56.7971,
        "lng": -2.93735
    },
    "Bangor": {
        "lat": 54.19116667,
        "lng": -5.1515
    },
    "Cardiff": {
        "lat": 52.14425714,
        "lng": -2.744957143
    },
    "Newport": {
        "lat": 52.56491875,
        "lng": -2.7963
    },
    "St Asaph": {
        "lat": 53.2667,
        "lng": -3.45
    },
    "Swansea": {
        "lat": 51.6208,
        "lng": -3.9432
    },
    "Armagh": {
        "lat": 54.35,
        "lng": -6.6667
    },
    "Belfast": {
        "lat": 54.5833,
        "lng": -5.9333
    },
    "Derry": {
        "lat": 55.66155,
        "lng": -5.86855
    },
    "Lisburn": {
        "lat": 54.5234,
        "lng": -6.0353
    },
    "Newry": {
        "lat": 54.1784,
        "lng": -6.3374
    }
  }
};
